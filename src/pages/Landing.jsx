import { Link } from "react-router-dom";
import { Layout } from "../components";
import { LoginModal } from "../components";
import { useAuthContext } from "../context/AuthContext";

export const Landing = () => {
  const { user } = useAuthContext();
  console.log(user);
  return (
    <Layout>
      <h1 className="text-[3.8125rem]">Ordena</h1>
      <p>Ordena tu día, transforma tu rutina.</p>
      {!user ? (
        <LoginModal />
      ) : (
        <Link to={"/tareas"}>
          <button className="bg-[#F87171] text-[#fff] p-2 rounded-[5px] cursor-pointer">
            Ingresar a la lista de tareas
          </button>
        </Link>
      )}
      {!user ? (
        <p>
          ¿Aún no tienes una cuenta en Noto?{" "}
          <Link to={"/registro"}>
            <span className="text-[#F87171]">Regístrate aquí</span>
          </Link>
        </p>
      ) : null}
    </Layout>
  );
};
