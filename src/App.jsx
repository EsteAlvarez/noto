import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import { Landing } from "./pages/Landing";
import { Register } from "./pages/Register";
import { Notes } from "./pages/Notes";
import { NotFoundPage } from "./pages/NotFoundPage";

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
