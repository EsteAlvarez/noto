import { TaskStatus } from "./TaskStatus";
import { motion } from "motion/react";

export const Task = ({
  $id,
  body,
  status,
  onToggle,
  updateLoading,
  deleteTask,
  deleteLoading,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }} // Solo desvanecer
      transition={{ duration: 0.4 }}
      className="flex items-center gap-4 shadow-lg my-3 rounded-[5px] px-2 py-4 task-screen-mode"
    >
      {updateLoading ? (
        <TaskStatus>
          {status === "pending" ? "Completando" : "Restaurando"}
        </TaskStatus>
      ) : (
        <input
          className="cursor-pointer checkbox-task"
          type="checkbox"
          checked={status === "completed"}
          onChange={() => onToggle($id)}
        />
      )}
      <p
        className={`text-[1rem] w-full whitespace-pre-wrap break-words overflow-hidden ${
          status === "completed" ? "line-through text-gray-400" : ""
        }`}
      >
        {body}
      </p>
      <div className="min-w-[90px] flex justify-end">
        {deleteLoading ? (
          <TaskStatus>Eliminando</TaskStatus>
        ) : (
          <button
            onClick={() => deleteTask($id)}
            className="text-[1rem] cursor-pointer"
            aria-label="Eliminar tarea"
          >
            <i className="bi bi-trash screen-mode-icon"></i>
          </button>
        )}
      </div>
    </motion.div>
  );
};
