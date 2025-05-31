import { useThemeContext } from "../../context/ThemeContext";

export const ScreenMode = () => {
  const [theme, toggleTheme] = useThemeContext();

  return (
    <div>
      {theme === "light" ? (
        <button className="cursor-pointer" onClick={toggleTheme}>
          <i className="bi bi-brightness-high-fill"></i>
        </button>
      ) : (
        <button className="cursor-pointer" onClick={toggleTheme}>
          <i className="bi bi-moon-fill"></i>
        </button>
      )}
    </div>
  );
};
