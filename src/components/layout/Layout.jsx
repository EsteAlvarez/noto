// Layout.jsx
import { useThemeContext } from "../../context/ThemeContext";
import { ScreenMode } from "../screenmode/ScreenMode";
import { motion } from "motion/react";
import { useLocation } from "react-router-dom";

export const Layout = ({ children }) => {
  const { theme } = useThemeContext();
  const location = useLocation();

  return (
    <section className={`${theme}-mode-noto relative`}>
      <div className="absolute top-4 right-8 z-10">
        <ScreenMode />
      </div>

      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col justify-center items-center gap-5 text-center min-h-[100dvh] sm:p-0 md:p-0 p-7"
      >
        {children}
      </motion.div>
    </section>
  );
};
