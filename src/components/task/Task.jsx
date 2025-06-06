import { TaskStatus } from "./TaskStatus";

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
    <div className="flex items-center gap-4 shadow-lg my-3 rounded-[5px] p-2 task-screen-mode">
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
      <div>
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
    </div>
  );
};
