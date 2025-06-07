import { Routes, Route, useLocation } from "react-router-dom";
import { Landing, Register, Tasks, NotFoundPage } from "./pages";
import { ThemeContextProvider } from "./context/ThemeContext";
import { AuthContextProvider } from "./context/AuthContext";
import { NotesContextProvider } from "./context/NotesContext";
import { AnimatePresence } from "motion/react";
import "@fontsource-variable/geist-mono";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/App.css";

function App() {
  const location = useLocation(); // Necesario para animaciones

  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <NotesContextProvider>
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Landing />} />
              <Route path="/registro" element={<Register />} />
              <Route path="/tareas" element={<Tasks />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AnimatePresence>
        </NotesContextProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
