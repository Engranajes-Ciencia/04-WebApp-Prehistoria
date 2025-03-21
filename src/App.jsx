import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Form from "./Components/Form";
import Mapa from "./Components/Mapa"; // Asegúrate de tener este componente
import "./index.css";


function App() {
  return (
    <div className="container">
      <Header />

      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/mapa" element={<Mapa />} />
        {/* Aquí puedes añadir más rutas como /actividad/:id más adelante */}
      </Routes>
    </div>
  );
}


export default App;

