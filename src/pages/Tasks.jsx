import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Task, CreateTask, TaskStatus } from "../components";
import { useAuthContext } from "../context/AuthContext";
import { useNotesContext } from "../context/NotesContext";
import { AnimatePresence } from "motion/react";

export const Tasks = () => {
  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const [updatingTaskId, setupdatingTaskId] = useState(null);
  const { user, loadingUser } = useAuthContext();
  const navigate = useNavigate();
  const { tasks, deleteTask, updateTaskStatus } = useNotesContext();

  useEffect(() => {
    if (!loadingUser && !user) navigate("/");
  }, [loadingUser, user, navigate]);

  const toggleTaskStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";
    try {
      setupdatingTaskId(id);
      await updateTaskStatus(id, newStatus);
    } catch (err) {
      console.error(err);
    } finally {
      setupdatingTaskId(null);
    }
  };

  const deleteTaskButton = async (id) => {
    try {
      setDeletingTaskId(id);
      await deleteTask(id);
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingTaskId(null);
    }
  };

  const pendingTasks = useMemo(
    () => tasks.filter((task) => task.status === "pending"),
    [tasks]
  );
  const completedTasks = useMemo(
    () => tasks.filter((task) => task.status === "completed"),
    [tasks]
  );

  const renderTasks = (title, iconClass, tasksList, emptyMessage) => (
    <div className="text-start text-[1.5625rem] mb-10">
      <div className="flex items-center gap-3 mb-2 font-semibold">
        <i className={`bi ${iconClass} screen-mode-icon`}></i>
        <h2>{title}</h2>
      </div>
      {tasksList.length > 0 ? (
        <AnimatePresence mode="popLayout">
          {tasksList.map((task) => (
            <Task
              key={task.$id}
              {...task}
              onToggle={() => toggleTaskStatus(task.$id, task.status)}
              deleteTask={deleteTaskButton}
              updateLoading={updatingTaskId === task.$id}
              deleteLoading={deletingTaskId === task.$id}
            />
          ))}
        </AnimatePresence>
      ) : (
        <p className="text-[1rem] text-gray-500">{emptyMessage}</p>
      )}
    </div>
  );

  return (
    <Layout>
      <div className="w-[100%] md:w-[80%]">
        <h2 className="flex items-center gap-3 text-start text-[1.5625rem] text-[#F87171] my-5">
          Hola{" "}
          {loadingUser ? <TaskStatus>Cargando usuario</TaskStatus> : user?.name}
        </h2>

        <CreateTask />

        {tasks.length === 0 ? (
          <p className="text-start">
            Aún no has creado ninguna tarea. Usa el campo de arriba para añadir
            tu primera.
          </p>
        ) : (
          <>
            {renderTasks(
              "Tareas Pendientes",
              "bi-clock",
              pendingTasks,
              "No tienes tareas pendientes."
            )}
            {renderTasks(
              "Tareas Finalizadas",
              "bi-check-circle",
              completedTasks,
              "No has completado tareas aún."
            )}
          </>
        )}
      </div>
    </Layout>
  );
};
