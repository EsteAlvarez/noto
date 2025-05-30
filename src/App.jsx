import { Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Register } from "./pages/Register";
import { Notes } from "./pages/Notes";
import { NotFoundPage } from "./pages/NotFoundPage";
import '@fontsource-variable/geist-mono';
import "./styles/App.css";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Landing />}></Route>
      <Route path={"/registro"} element={<Register />}></Route>
      <Route path={"/notas"} element={<Notes />}></Route>
      <Route path={"*"} element={<NotFoundPage />}></Route>
    </Routes>
  );
}

export default App;
