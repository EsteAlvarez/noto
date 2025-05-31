import { Link } from "react-router-dom";
import { Layout } from "../components";

export const Landing = () => {
  return (
    <Layout>
      <h1 className="text-[3.8125rem]">Noto</h1>
      <p>Organiza tus ideas en un lienzo digital simple y personal.</p>
      <button className="bg-[#F87171] text-[#fff] p-2 rounded-[5px] cursor-pointer">
        Iniciar Sesión
      </button>
      <p>
        ¿Aún no tienes una cuenta en Noto?{" "}
        <Link to={"/registro"}>
          <span className="text-[#F87171]">
            Regístrate aquí
          </span>
        </Link>
      </p>
    </Layout>
  );
};
