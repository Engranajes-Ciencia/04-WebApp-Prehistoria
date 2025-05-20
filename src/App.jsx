import { useEffect, useState } from "react";
import { UseOrientation } from "./UseOrientation";
import "./App.css";
import Layout from "./components/Layout/Layout";
import "./index.css";
import "./Styles/Commons/OrientationWarning.css";

import { BrowserRouter as Router } from "react-router-dom";

import AppRouter from "./config/routes/AppRouter";


function App() {
  const orientation = UseOrientation(); // Detecta orientación
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Solo la primera vez que se carga la app
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 segundo de preloader

    return () => clearTimeout(timer);
  }, []); // se ejecuta solo al montar

  if (loading) {
    return (
      <div className="preloader">
        <div className="spinner"> </div>
        <p className="cargando" >Cargando <span className="dots"
        ></span> </p>
      </div>
    );
  }

  // Define la base URL dinámicamente.
  // import.meta.env.VITE_BASE_URL se lee de tus archivos .env
  const BASE_URL = import.meta.env.VITE_BASE_URL || '/';

  return (
    <Router basename={BASE_URL}>
      <div>
        {orientation === "portrait" && (
          // Considerar añadir un botón para cerrar esta alerta si es persistente
          <div className="orientacion-alerta">
            ⚠️ Para una mejor experiencia recomendamos utilizar el dispositivo
            en modo horizontal
          </div>
        )}
        <Layout>
          <AppRouter />  {/* AppRouter contiene todas tus <Routes> y <Route> */}
        </Layout>
      </div>
    </Router>
  );
}

export default App;


