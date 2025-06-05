export const Task = ({ $id, body, status, onToggle, deleteTask }) => {
  return (
    <div className="flex items-center gap-4 bg-white shadow-lg my-3 rounded-[5px] p-2">
      <input
        className="cursor-pointer"
        type="checkbox"
        checked={status === "completed"}
        onChange={() => onToggle($id)}
      />
      <p
        className={`text-[1rem] w-full ${
          status === "completed" ? "line-through text-gray-400" : ""
        }`}
      >
        {body}
      </p>
      <button
        onClick={() => deleteTask($id)}
        className="text-[1rem] cursor-pointer"
        aria-label="Eliminar tarea"
      >
        <i className="bi bi-trash"></i>
      </button>
    </div>
  );
};
