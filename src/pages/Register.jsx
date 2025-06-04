import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, InputLabel } from "../components";
import { useAuthContext } from "../context/AuthContext";

export const Register = () => {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const { user, registerUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await registerUser(registerEmail, registerPassword, registerName);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <Link to={"/"}>
        <p>
          <i className="bi bi-arrow-left-short"></i> Volver al inicio
        </p>
      </Link>
      <div className="form-container-noto min-w-[30%] rounded-[5px] shadow-lg p-5">
        <h1 className="text-[1.5625rem]">
          Regístrate en <span className="text-[#F87171]">Noto</span>
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-8">
          <InputLabel
            label="Nombre:"
            type="text"
            id="name"
            name="name"
            placeholder="Ingrese su nombre"
            onChange={(e) => setRegisterName(e.target.value)}
          />
          <InputLabel
            label="Email:"
            type="email"
            id="email"
            name="email"
            placeholder="Ingrese su email"
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
          <InputLabel
            label="Contraseña:"
            type="password"
            id="password"
            name="password"
            placeholder="Cree una contraseña"
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#F87171] text-[#fff] p-2 rounded-[5px] cursor-pointer"
          >
            Crear Cuenta
          </button>
        </form>
        <p className="mt-8">
          ¿Ya tienes una cuenta de Noto?{" "}
          <Link to={"/"}>
            <span className="text-[#F87171]">Inicia sesión</span>
          </Link>
        </p>
      </div>
    </Layout>
  );
};
