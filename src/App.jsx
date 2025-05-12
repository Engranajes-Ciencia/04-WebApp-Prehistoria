import { useEffect, useState } from "react";
import { UseOrientation } from "./UseOrientation";
import "./App.css";
import AppRouter from "./config/routes/AppRouter";
import Layout from "./components/Layout/Layout";
import "./index.css";
import "./Styles/Commons/OrientationWarning.css";


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

  return (
    <div>
      {orientation === "portrait" && (
        <div className="orientacion-alerta">
          ⚠️ Para una mejor experiencia recomendamos utilizar el dispositivo en modo horizontal
        </div>
      )}
      <Layout>
        <AppRouter />
      </Layout>
    </div>
  );
}

export default App;


