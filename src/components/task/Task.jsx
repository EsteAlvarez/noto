export const Task = ({ id, body, status, onToggle }) => {
  return (
    <div className="flex items-center gap-4 bg-white shadow-lg my-3 rounded-[5px] p-2">
      <input
        type="checkbox"
        checked={status === "completed"}
        onChange={() => onToggle(id)}
      />
      <p
        className={`text-[1rem] w-full ${
          status === "completed" ? "line-through text-gray-400" : ""
        }`}
      >
        {body}
      </p>
    </div>
  );
};
