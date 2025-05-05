import React from "react";
import { UseOrientation } from "./UseOrientation";
import AppRouter from "./config/routes/AppRouter";
import "./index.css";
import Layout from "./Components/Layout/Layout";
import "./Styles/Commons/OrientationWarning.css";

function App() {
  const orientation = UseOrientation(); //Detecta la orientación
  return (
    <div>
      {/*Mostrar alerta solo en modo vertical*/}
      {orientation === "portrait" && (
        <div className="orientacion-alerta">
         ⚠️ Para una mejor experiencia recomendamos utilizar el dispositivo en
          modo horizontal{" "}
        </div>
      )}
      <Layout>
        <AppRouter />
      </Layout>
    </div>
  );
}

export default App;
