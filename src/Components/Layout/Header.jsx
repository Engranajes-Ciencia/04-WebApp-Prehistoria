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
  const [tooltip, setTooltip] = useState("");


  // Mostrar tooltip al pulsar
  const showTooltip = (text) => {
    setTooltip(text);
    setTimeout(() => setTooltip(""), 3000);
  };


  useEffect(() => {
    const savedTheme = localStorage.getItem("modoOscuro");
    const isDark = savedTheme === "true";
    setModoOscuro(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleModoOscuro = () => {
    const nuevoEstado = !modoOscuro;
    setModoOscuro(nuevoEstado);
    document.documentElement.classList.toggle("dark", nuevoEstado);
    localStorage.setItem("modoOscuro", nuevoEstado);
    showTooltip(nuevo ? "Modo Oscuro" : "Modo Claro");
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      showTooltip(isMuted ? "Música Activada" : "Música Silenciada");
    }
  };

  const toggleLanguage = () => {
    const nuevoIdioma = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(nuevoIdioma);
    showTooltip(nuevo === "es" ? "Español" : "English");
  };

  const activarKiosco = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();
    showTooltip("Modo Kiosco");
  };


  useEffect(() => {
      if (audioRef.current) {
        audioRef.current.volume = 0.1; // Establece el volumen
      }
  }, []);

  return (
    <header className="header">
      {/* Tooltip flotante */}
      {tooltip && <div className="tooltip-touch">{tooltip}</div>}
      <div className="header-top">
        
        <div className="branding">
          <img
            src={`${import.meta.env.BASE_URL}assets/images/Logo-principal.png`}
            alt="Logo empresa"
            className="logo"
          />
        </div>
      </div>

      <h1 className="titulo-header">
        Parque <br />
        Prehistórico
      </h1>

      <div className="botones-header">
        <button className="icon-btn" data-tooltip="Inicio"  onClick={() => navigate("/")}>🏠</button>

        <button
          className="icon-btn"
          data-tooltip={modoOscuro ? "Modo Claro" : "Modo Oscuro"}
          onClick={toggleModoOscuro}
        >
          {modoOscuro ? "☀️" : "🌙"}
        </button>

      <div>
        <audio
        ref={audioRef}
        src="/sounds/musica.mp3" // Ruta de la musica
        loop
        autoPlay
        muted={isMuted}
        />
    
          <button className="icon-btn" data-tooltip="Música"  onClick={toggleMute}>{isMuted ? "🔇" : "🎵"}</button>    
      </div>

        <button className="icon-btn" data-tooltip="Kiosco" onClick={activarKiosco}>🖥️</button>

        <button className="icon-btn" data-tooltip="Idioma"  onClick={toggleLanguage}>
          {i18n.language === "es" ? "🇪🇸" : "🇬🇧"}
        </button>

      </div>

    </header>
  );
}

export default Header;
