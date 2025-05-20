import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../Styles/Layout/Header.css";
import { Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [modoOscuro, setModoOscuro] = useState(false);
  const { i18n, t } = useTranslation();
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);




  // Efecto para inicializar el tema oscuro y el volumen del audio
  useEffect(() => {
    // Restaurar el modo oscuro desde localStorage
    const savedTheme = localStorage.getItem("modoOscuro");
    const isDark = savedTheme === "true";
    setModoOscuro(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }

    // Establecer el volumen inicial del audio
    if (audioRef.current) {
      audioRef.current.volume = 0.1; // Establece un volumen bajo
    }
  }, []); // Se ejecuta solo una vez al montar el componente


  // Toggle para cambiar entre modo oscuro y claro
  const toggleModoOscuro = () => {
    const nuevoEstadoModoOscuro = !modoOscuro; 
    setModoOscuro(nuevoEstadoModoOscuro);
    document.documentElement.classList.toggle("dark", nuevoEstadoModoOscuro);
    localStorage.setItem("modoOscuro", nuevoEstadoModoOscuro);
  };


  // Toggle para silenciar/activar música
  const toggleMute = () => {
    const nuevoEstadoMute = !isMuted; 
    setIsMuted(nuevoEstadoMute);
    if (audioRef.current) {
      audioRef.current.muted = nuevoEstadoMute; 
    }
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

        <button className="icon-btn" onClick={toggleModoOscuro}>
          {modoOscuro ? "☀️" : "🌙"}
        </button>

        <button className="icon-btn" onClick={toggleMute}>
          {isMuted ? "🔇" : "🎵"}
        </button>

        <button className="icon-btn" onClick={activarKiosco}>
          🖥️
        </button>

        <button className="icon-btn" onClick={toggleLanguage}>
          {i18n.language === "es" ? "🇪🇸" : "🇬🇧"}
        </button>

        {/* Componente de audio para la música de fondo */}
        <audio
          ref={audioRef}
          src={`${import.meta.env.BASE_URL}sounds/musica.mp3`} // ¡Ruta corregida para musica.mp3!
          loop
          autoPlay
          muted={isMuted}
        >
          {/* Fallback para navegadores que no soportan el tag <audio> */}
          {t("audioNotSupported")}
        </audio>
      </div>
    </header>
  );
}

export default Header;
