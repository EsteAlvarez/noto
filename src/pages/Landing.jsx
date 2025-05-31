import { Link } from "react-router-dom";
import { ScreenMode } from "../components";

export const Landing = () => {
  return (
    <section className="flex flex-col justify-center items-center gap-5 text-center min-h-[100dvh]">
      <ScreenMode />
      <h1 className="text-[3.8125rem]">Noto</h1>
      <p>Organiza tus ideas en un lienzo digital simple y personal.</p>
      <button className="bg-[#F87171] text-[#fff] p-2 rounded-[5px] cursor-pointer">
        Iniciar Sesión
      </button>
      <p>
        ¿Aún no tienes una cuenta en Noto?{" "}
        <Link to={"/registro"}>
          <button className="text-[#F87171] cursor-pointer">
            Regístrate aquí
          </button>
        </Link>
      </p>
    </section>
  );
};
