import { useThemeContext } from "../../context/ThemeContext";
import { useAuthContext } from "../../context/AuthContext";

export const ScreenMode = () => {
  const { theme, toggleTheme } = useThemeContext();
  const { user, logoutUser } = useAuthContext();

  return (
    <div className="flex items-center gap-4">
      {user && (
        <button
          onClick={logoutUser}
          className="flex items-center gap-2 logout-text cursor-pointer"
          title="Cerrar sesión"
        >
          Cerrar Sesión
          <i className="bi bi-box-arrow-left"></i>
        </button>
      )}
      {theme === "light" ? (
        <button
          className="cursor-pointer"
          onClick={toggleTheme}
          aria-label="Activar modo oscuro"
          title="Activar modo oscuro"
        >
          <i className="bi bi-moon-fill"></i>
        </button>
      ) : (
        <button
          className="cursor-pointer text-[#FFFFFF]"
          onClick={toggleTheme}
          aria-label="Activar modo claro"
          title="Activar modo claro"
        >
          <i className="bi bi-brightness-high-fill"></i>
        </button>
      )}
    </div>
  );
};
