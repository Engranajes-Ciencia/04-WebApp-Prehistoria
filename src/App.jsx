import { Routes, Route } from "react-router-dom";
import Mododejuego from "./Components/ModoJuego";
import Portada from "./Components/Portada";
import Header from "./Components/Header";
import Form from "./Components/Form";
import Mapa from "./Components/Mapa";

import "./index.css";



function App() {
  return (
    <div className="container">
      <Header />

      <Routes>
        <Route path="/" element={<Mododejuego />} />
        <Route path="/portada" element={<Portada />} />
        <Route path="/form" element={<Form />} />
        <Route path="/mapa" element={<Mapa />} />
      </Routes>
    </div>
  );
}


export default App;

