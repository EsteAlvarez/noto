import { useState } from "react";
import { InputLabel } from "../form/InputLabel";
import { useAuthContext } from "../../context/AuthContext";
import { motion, AnimatePresence } from "motion/react";

export const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { loginUser, loadingLoginUser } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      setErrorMessage("Completa todos los campos");
      return;
    }

    const result = await loginUser(loginEmail, loginPassword);

    if (!result.success) {
      setErrorMessage("Email o contraseña incorrectos");
    } else {
      setErrorMessage("");
      toggleModal();
    }
  };

  const toggleModal = () => {
    setIsOpen((open) => !open);
    setLoginEmail("");
    setLoginPassword("");
    setErrorMessage("");
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="bg-[#F87171] text-[#fff] p-2 rounded-[5px] cursor-pointer"
      >
        Iniciar Sesión
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleModal}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="login-title"
              className="fixed inset-0 flex justify-center items-center z-50 p-4"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()} // Evitar cierre al clicar dentro del modal
            >
              <div className="modal rounded-lg shadow-lg w-full max-w-md p-6 relative bg-white dark:bg-gray-800">
                <button
                  onClick={toggleModal}
                  className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 text-2xl cursor-pointer"
                  aria-label="Cerrar modal"
                >
                  <i className="bi bi-x"></i>
                </button>
                <h2
                  id="login-title"
                  className="text-[1.5625rem] mb-4 text-center"
                >
                  Iniciar sesión en <span className="text-[#F87171]">Noto</span>
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5 mt-8"
                >
                  <InputLabel
                    label="Email:"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Ingrese su email"
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                  <InputLabel
                    label="Contraseña:"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Ingrese su contraseña"
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <span className="text-[0.875rem] m-0 text-start text-wrap text-[#F87171]">
                    {errorMessage}
                  </span>
                  <button
                    type="submit"
                    disabled={loadingLoginUser}
                    className="bg-[#F87171] text-[#fff] p-2 rounded-[5px] cursor-pointer"
                  >
                    Iniciar Sesión{" "}
                    {loadingLoginUser && (
                      <i className="bi bi-arrow-repeat text-[0.875rem] animate-spin inline-block ml-2"></i>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
