import { useState } from "react";
import { useNotesContext } from "../../context/NotesContext";
import { TaskStatus } from "./TaskStatus";

export const CreateTask = () => {
  const [newTask, setNewTask] = useState("");
  const { addLoading, createTask } = useNotesContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      await createTask(newTask);
      setNewTask("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mb-10">
      <form onSubmit={handleSubmit} className="flex flex-col text-start">
        <label htmlFor="task">Añadir Tarea</label>
        <textarea
          className="border rounded-[5px] p-3 bg-[#FFF]"
          name="task"
          id="task"
          placeholder="Escribe una tarea"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        ></textarea>
        <div className="flex items-center gap-4">
          <button
            disabled={addLoading}
            className="w-fit bg-[#F87171] text-[#fff] p-2 mt-4 rounded-[5px] cursor-pointer disabled:opacity-50"
          >
            Agregar Tarea <i className="bi bi-plus"></i>
          </button>
          {addLoading && <TaskStatus>Creando tarea</TaskStatus>}
        </div>
      </form>
    </div>
  );
};
