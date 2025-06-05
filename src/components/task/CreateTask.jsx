import { useState } from "react";
import { useNotesContext } from "../../context/NotesContext";

export const CreateTask = () => {
  const [newTask, setNewTask] = useState("");
  const { createTask } = useNotesContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(newTask);
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
          onChange={(e) => setNewTask(e.target.value)}
        ></textarea>
        <button className="w-fit bg-[#F87171] text-[#fff] p-2 mt-4 rounded-[5px] cursor-pointer">
          Agregar Tarea <i className="bi bi-plus"></i>
        </button>
      </form>
    </div>
  );
};
