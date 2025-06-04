import { Link } from "react-router-dom";
import { Layout } from "../components";

export const NotFoundPage = () => {
  return (
    <Layout>
      <h1 className="text-5xl">404</h1>
      <p>La página que buscas no existe o ha sido cambiada de lugar.</p>
      <Link to={"/"}>
        <button className="bg-[#F87171] text-[#fff] p-2 rounded-[5px] cursor-pointer">
          Volver al Inicio
        </button>
      </Link>
    </Layout>
  );
};
