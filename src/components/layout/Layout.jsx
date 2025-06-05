import { useThemeContext } from "../../context/ThemeContext";
import { ScreenMode } from "../screenmode/ScreenMode";

export const Layout = ({ children }) => {
  const { theme } = useThemeContext();
  return (
    <section className={`${theme}-mode-noto relative flex flex-col justify-center items-center gap-5 text-center min-h-[100dvh] sm:p-0 md:p-0 p-7`}>
      <div className="absolute top-4 right-8 z-10">
        <ScreenMode />
      </div>
      {children}
    </section>
  );
};
