import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Task } from "../components";
import todoData from "../mocks/todolist.json";
import { useAuthContext } from "../context/AuthContext";

export const Tasks = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      setTasks(todoData);
    }
  }, [user, navigate]);

  const toggleTaskStatus = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "pending" ? "completed" : "pending",
            }
          : task
      )
    );
  };

  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  return (
    <Layout>
      <div className="w-[80%]">
        <h2 className="text-start text-[1.5625rem] text-[#F87171] mb-3">
          Hola {user?.name}
        </h2>

        {/* Pendientes */}
        <div className="text-start text-[1.5625rem] mb-6">
          <div className="flex items-center gap-3 mb-2">
            <i className="bi bi-clock"></i>
            <h2>Tareas Pendientes</h2>
          </div>
          {pendingTasks.length > 0 ? (
            pendingTasks.map((task) => (
              <Task key={task.id} {...task} onToggle={toggleTaskStatus} />
            ))
          ) : (
            <p className="text-[1rem] text-gray-500">
              No tienes tareas pendientes.
            </p>
          )}
        </div>

        {/* Completadas */}
        <div className="text-start text-[1.5625rem]">
          <div className="flex items-center gap-3 mb-2">
            <i className="bi bi-check2-circle"></i>
            <h2>Tareas Finalizadas</h2>
          </div>
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => (
              <Task key={task.id} {...task} onToggle={toggleTaskStatus} />
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
