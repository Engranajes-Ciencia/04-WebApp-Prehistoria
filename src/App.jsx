import { Routes, Route } from "react-router-dom";
import Mododejuego from "./Components/ModoJuego";
import Portada from "./Components/Portada";
import Header from "./Components/Header";
import Form from "./Components/Form";
import Mapa from "./Components/Mapa";
import EscanerQR from './Components/EscanerQR';
import Actividad from "./Components/Actividad";
import Footer from "./Components/Footer";

import "./index.css";



function App() {
  return (
    <div className="contenido-principal">
      <Header />

      <Routes>
        <Route path="/" element={<Mododejuego />} />
        <Route path="/portada" element={<Portada />} />
        <Route path="/form" element={<Form />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/EscanerQR" element={<EscanerQR />} />
        <Route path="/actividad/:id" element={<Actividad />} />
      </Routes>

      <Footer />
    </div>
  );
}


export default App;

