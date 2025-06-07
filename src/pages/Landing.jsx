import { Link } from "react-router-dom";
import { Layout, LoginModal, Preloader } from "../components";
import { useAuthContext } from "../context/AuthContext";

export const Landing = () => {
  const { user, loadingUser } = useAuthContext();

  if (loadingUser) {
    return (
      <Layout>
        <Preloader />
      </Layout>
    );
  }

  const isLoggedIn = !!user;

  return (
    <Layout>
      <h1 className="text-[3.8125rem] font-bold">Ordena</h1>
      <p>Ordena tu día, transforma tu rutina.</p>

      {isLoggedIn ? (
        <Link to="/tareas">
          <button className="bg-[#F87171] text-white p-2 rounded-[5px] cursor-pointer">
            Ingresar a la lista de tareas
          </button>
        </Link>
      ) : (
        <>
          <LoginModal />
          <p className="mt-4">
            ¿Aún no tienes una cuenta en Noto?{" "}
            <Link to="/registro">
              <span className="text-[#F87171]">Regístrate aquí</span>
            </Link>
          </p>
        </>
      )}
    </Layout>
  );
};
