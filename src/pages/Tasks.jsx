import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Task, CreateTask } from "../components";
import { useAuthContext } from "../context/AuthContext";
import { useNotesContext } from "../context/NotesContext";

export const Tasks = () => {
  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const [updatingTaskId, setupdatingTaskId] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { tasks, deleteTask, updateTaskStatus } = useNotesContext();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

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

  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  return (
    <Layout>
      <div className="w-[100%] md:w-[80%]">
        <h2 className="text-start text-[1.5625rem] text-[#F87171] my-5">
          Hola {user?.name}
        </h2>

        <CreateTask />

        {/* Pendientes */}
        <div className="text-start text-[1.5625rem] mb-10">
          <div className="flex items-center gap-3 mb-2 font-semibold">
            <i className="bi bi-clock screen-mode-icon"></i>
            <h2>Tareas Pendientes</h2>
          </div>
          {pendingTasks.length > 0 ? (
            pendingTasks.map((task) => (
              <Task
                key={task.$id}
                {...task}
                onToggle={() => toggleTaskStatus(task.$id, task.status)}
                deleteTask={deleteTaskButton}
                updateLoading={updatingTaskId === task.$id}
                deleteLoading={deletingTaskId === task.$id}
              />
            ))
          ) : (
            <p className="text-[1rem] text-gray-500">
              No tienes tareas pendientes.
            </p>
          )}
        </div>

        {/* Completadas */}
        <div className="text-start text-[1.5625rem]">
          <div className="flex items-center gap-3 mb-2 font-semibold">
            <i className="bi bi-check-circle screen-mode-icon"></i>
            <h2>Tareas Finalizadas</h2>
          </div>
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => (
              <Task
                key={task.$id}
                {...task}
                onToggle={() => toggleTaskStatus(task.$id, task.status)}
                deleteTask={deleteTaskButton}
                updateLoading={updatingTaskId === task.$id}
                deleteLoading={deletingTaskId === task.$id}
              />
            ))
          ) : (
            <p className="text-[1rem] text-gray-500">
              No has completado tareas aún.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};
