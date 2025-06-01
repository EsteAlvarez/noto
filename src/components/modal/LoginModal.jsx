import { useState } from "react";
import { InputLabel } from "../form/InputLabel";

export const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);
  return (
    <>
      <button
        onClick={toggleModal}
        className="bg-[#F87171] text-[#fff] p-2 rounded-[5px] cursor-pointer"
      >
        Iniciar Sesión
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
          <div className="modal rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-600 text-2xl cursor-pointer"
            >
              <i className="bi bi-x"></i>
            </button>
            <h2 className="text-[1.5625rem] mb-4 text-center">
              Iniciar sesión en <span className="text-[#F87171]">Noto</span>
            </h2>
            <form className="flex flex-col gap-5 mt-8">
              <InputLabel
                label="Email:"
                type="email"
                id="email"
                name="email"
                placeholder="Ingrese su email"
              />
              <InputLabel
                label="Contraseña:"
                type="password"
                id="password"
                name="password"
                placeholder="Ingrese su contraseña"
              />
              <button
                type="submit"
                className="bg-[#F87171] text-[#fff] p-2 rounded-[5px] cursor-pointer"
              >
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
