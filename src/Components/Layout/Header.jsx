import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../Styles/Layout/Header.css";

function Header() {
  const navigate = useNavigate();
  const [modoOscuro, setModoOscuro] = useState(false);
  const { i18n, t } = useTranslation();



  // Efecto para inicializar el tema oscuro y el volumen del audio
  useEffect(() => {
    // Restaurar el modo oscuro desde localStorage
    const savedTheme = localStorage.getItem("modoOscuro");
    const isDark = savedTheme === "true";
    setModoOscuro(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);


  // Toggle para cambiar entre modo oscuro y claro
  const toggleModoOscuro = () => {
    const nuevoEstadoModoOscuro = !modoOscuro; 
    setModoOscuro(nuevoEstadoModoOscuro);
    document.documentElement.classList.toggle("dark", nuevoEstadoModoOscuro);
    localStorage.setItem("modoOscuro", nuevoEstadoModoOscuro);
  };


  // Toggle para cambiar el idioma
  const toggleLanguage = () => {
    const nuevoIdioma = i18n.language === "es" ? "en" : "es"; 
    i18n.changeLanguage(nuevoIdioma);
  };


  // Activar modo kiosco (pantalla completa)
  const activarKiosco = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen(); // Safari
    else if (el.msRequestFullscreen) el.msRequestFullscreen(); // IE/Edge
  };



  return (
    <header className="header">

      <div className="header-left-section">
        <div className="branding">
          {/* Usar import.meta.env.BASE_URL para rutas de assets estáticos */}
          <img
            src={`${import.meta.env.BASE_URL}assets/images/Logo-principal.png`}
            alt="Logo empresa"
            className="logo"
          />
        </div>

      <h1 className="titulo-header">
        Parque <br />
        Prehistórico
      </h1>
    </div>

      <div className="botones-header">
        {/* Botones con tooltips y navegación */}
        <button className="icon-btn" onClick={() => navigate("/")}>
          🏠
        </button>

        {/* BOTÓN: Entre Actividades */}
        <button
          className="icon-btn"
          onClick={() => navigate("/entre-actividad")}
        >
          🗺️ {/* Ejemplo de icono, puedes cambiarlo */}
        </button>

        {/* BOTÓN: Escáner QR */}
        <button
          className="icon-btn"
          onClick={() => navigate("/escanerQR")}
        >
          📷 {/* Ejemplo de icono, puedes cambiarlo */}
        </button>


        <button className="icon-btn" onClick={activarKiosco}>
          🖥️
        </button>

        <button className="icon-btn" onClick={toggleModoOscuro}>
          {modoOscuro ? "☀️" : "🌙"}
        </button>

        <button className="icon-btn" onClick={toggleLanguage}>
          {i18n.language === "es" ? "🇪🇸" : "🇬🇧"}
        </button>

        
        
      </div>
    </header>
  );
}

export default Header;
