import React from "react";
import { UseOrientation } from "./UseOrientation";
import AppRouter from "./config/routes/AppRouter";
import "./index.css";
import Layout from "./Components/Layout/Layout";

function App() {
  const orientation = UseOrientation(); //Detectamos la orientación
  return (
    <div>
      {/*Mostrar mensaje solo en modo Landscape*/}
      {orientation === "portrait" && (
        <div className="orientacion-alerta">
          Por favor, gira tu dispositivo a modo vertical para ver el contenido
        </div>
      )}
      {orientation === "landscape" && <Layout><AppRouter /></Layout>}
    </div>
  );
}

export default App;
