import { Routes, Route } from "react-router-dom";
import { Landing, Register, Tasks, NotFoundPage } from "./pages";
import "@fontsource-variable/geist-mono";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ThemeContextProvider } from "./context/ThemeContext";
import "./styles/App.css";

function App() {
  return (
    <ThemeContextProvider>
        <Routes>
          <Route path={"/"} element={<Landing />}></Route>
          <Route path={"/registro"} element={<Register />}></Route>
          <Route path={"/tareas"} element={<Tasks />}></Route>
          <Route path={"*"} element={<NotFoundPage />}></Route>
        </Routes>
    </ThemeContextProvider>
  );
}

export default App;
