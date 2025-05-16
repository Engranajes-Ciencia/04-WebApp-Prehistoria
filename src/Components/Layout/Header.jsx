import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../Styles/Layout/Header.css";
import MusicPlayer from "../Commons/MusicPlayer";
import { Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [modoOscuro, setModoOscuro] = useState(false);
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const nuevoIdioma = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(nuevoIdioma);
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
  };

  return (
    <header className="header">
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
        <button className="btn-home" onClick={() => navigate("/")}>
          {t("home")}
        </button>

        <button className="btn-tema" onClick={toggleModoOscuro}>
          {modoOscuro ? t("modoClaro") : t("modoOscuro")}
        </button>

        <MusicPlayer />

        <button
          className="btn-kiosco"
          onClick={() => {
            const el = document.documentElement;
            if (el.requestFullscreen) el.requestFullscreen();
            else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
            else if (el.msRequestFullscreen) el.msRequestFullscreen();
          }}
        >
          {t("modoKiosco")}
        </button>

        <button className="btn-idioma" onClick={toggleLanguage}>
          {t("cambiarIdioma")}
        </button>
      </div>
      <div
        className="branding"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <img
          src={`${import.meta.env.BASE_URL}assets/images/Logo-principal.png`}
          alt="Logo empresa"
          className="logo"
        />
      </div>

      <h1
        className="titulo-header"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        Parque <br /> Prehistórico
      </h1>
    </header>
  );
}

export default Header;
