import { useState, useEffect, createContext, useContext } from "react";
import { Databases, ID, Query } from "appwrite";
import { databases, account } from "../client/appwrite";
import { useAuthContext } from "./AuthContext";

export const NotesContext = createContext();

export const useNotesContext = () => {
  return useContext(NotesContext);
};

export const NotesContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      getUserTasks();
    } else {
      setTasks([]);
    }
  }, [user]);

  const getUserTasks = async () => {
    try {
      const user = await account.get();

      const response = await databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID,
        [Query.equal("userId", user.$id)]
      );

      setTasks(response.documents);
    } catch (err) {
      console.error("Error al obtener tareas:", err);
      throw err;
    }
  };

  const createTask = async (body, status = "pending") => {
    try {
      const user = await account.get();
      const response = await databases.createDocument(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID,
        ID.unique(),
        {
          body,
          status,
          userId: user.$id,
        }
        // [`user:${user.$id}`]
      );

      await getUserTasks();
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      const response = await databases.updateDocument(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID,
        taskId,
        {
          status,
        }
      );

      await getUserTasks();
      return response;
    } catch (err) {
      console.error("Error al actualizar tarea:", err);
      throw err;
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await databases.deleteDocument(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID,
        taskId
      );

      await getUserTasks();
    } catch (err) {
      console.error("Error al eliminar tarea:", err);
      throw err;
    }
  };

  useEffect(() => {
    account
      .get()
      .then(() => getUserTasks())
      .catch(() => {});
  }, []);

  return (
    <NotesContext.Provider
      value={{ tasks, setTasks, createTask, updateTaskStatus, deleteTask }}
    >
      {children}
    </NotesContext.Provider>
  );
};
