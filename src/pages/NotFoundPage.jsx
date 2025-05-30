import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <section>
      <h1>404</h1>
      <Link to={"/"}>
        <button>Volver al Inicio</button>
      </Link>
    </section>
  );
};
