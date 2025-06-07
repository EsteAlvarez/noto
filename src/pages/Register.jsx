import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, InputLabel } from "../components";
import { useAuthContext } from "../context/AuthContext";

export const Register = () => {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [errorStatus, setErrorStatus] = useState("");
  const [successStatus, setSuccessStatus] = useState("");
  const { user, registerUser, loginUser, loadingRegisterUser } =
    useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    setErrorStatus("");
  }, [registerName, registerEmail, registerPassword]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!registerName || !registerEmail || !registerPassword) {
      setErrorStatus("Todos los campos son obligatorios.");
      return;
    }

    if (registerPassword.length < 8) {
      setErrorStatus("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    const result = await registerUser(
      registerEmail,
      registerPassword,
      registerName
    );

    if (!result.success) {
      setErrorStatus("El email registrado ya dispone de una cuenta en ordena");
      return;
    } else {
      setSuccessStatus("Usuario registrado con éxito");
      await loginUser(registerEmail, registerPassword);
      setTimeout(() => {
        navigate("/");
      }, 3000);
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
            placeholder="Cree una contraseña (mínimo 8 caracteres)"
            onChange={(e) => setRegisterPassword(e.target.value)}
            min={8}
          />
          {errorStatus && (
            <span className="text-[0.875rem] m-0 text-start text-wrap text-[#F87171]">
              {errorStatus}
            </span>
          )}
          {successStatus && (
            <span className="text-[0.875rem] m-0 text-start text-wrap text-emerald-500">
              {successStatus}
            </span>
          )}
          <button
            type="submit"
            className="bg-[#F87171] text-[#fff] p-2 rounded-[5px] cursor-pointer"
          >
            Crear Cuenta
            {loadingRegisterUser && (
              <i className="bi bi-arrow-repeat text-[0.875rem] animate-spin inline-block ml-2"></i>
            )}
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
