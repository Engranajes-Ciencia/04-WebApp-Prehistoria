import { useEffect, useState } from "react";
import useOrientation from "./UseOrientation";

import "./App.css";
import "./index.css";
import "./Styles/Commons/OrientationWarning.css";

import { HashRouter as Router } from "react-router-dom";

import AppRouter from "./config/routes/AppRouter";

// Importa los componentes globales que se renderizan en todas las páginas
import ConnectionAlert from './Components/Commons/ConnectionAlert';
import InactivityTimer from './Components/Commons/InactivityTimer';
import OrientationWarning from './Components/Commons/OrientationWarning';


function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Solo la primera vez que se carga la app
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 segundo de preloader

    return () => clearTimeout(timer);
  }, []); 

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
    <Router>
      {/* Componentes globales */}
      <ConnectionAlert />
      <InactivityTimer />
      <OrientationWarning /> 
      <AppRouter />
    </Router>
  );
}

export default App;