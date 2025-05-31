import { Link } from "react-router-dom";
import { Layout, InputLabel } from "../components";

export const Register = () => {
  return (
    <Layout>
      <Link to={"/"}>
        <p>
          <i class="bi bi-arrow-left-short"></i> Volver al inicio
        </p>
      </Link>
      <div className="form-container-noto min-w-[30%] rounded-[5px] shadow-lg p-5">
        <h1 className="text-[1.5625rem]">
          Regístrate en <span className="text-[#F87171]">Noto</span>
        </h1>
        <form className="flex flex-col gap-5 mt-8">
          <InputLabel
            label="Nombre:"
            type="text"
            id="name"
            name="name"
            placeholder="Ingrese su nombre"
          />
          <InputLabel
            label="Email:"
            type="email"
            id="email"
            name="name"
            placeholder="Ingrese su email"
          />
          <InputLabel
            label="Contraseña:"
            type="password"
            id="password"
            name="password"
            placeholder="Cree una contraseña"
          />
          <button className="bg-[#F87171] text-[#fff] p-2 rounded-[5px] cursor-pointer">
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
