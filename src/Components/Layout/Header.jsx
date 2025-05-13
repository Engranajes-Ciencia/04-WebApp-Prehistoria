import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Layout/Header.css";
import MusicPlayer from "../Commons/MusicPlayer";

function Header() {
  const navigate = useNavigate();
  const [modoOscuro, setModoOscuro] = useState(false);

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

      <h1 className="titulo-header">Parque <br/>Prehistórico</h1>

      <div className="botones-header">

        <button className="btn-home" onClick={() => navigate("/")}>
          Inicio
        </button>

        <button className="btn-tema" onClick={toggleModoOscuro}>
          {modoOscuro ? "Modo Claro" : "Modo Oscuro"}
        </button>
        
        <MusicPlayer/>

        <button
          className="btn-kiosco"
          onClick={() => {
            const el = document.documentElement;
            if (el.requestFullscreen) el.requestFullscreen();
            else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
            else if (el.msRequestFullscreen) el.msRequestFullscreen();
          }}
        >
          Modo Kiosco
        </button>
      </div>
    </header>
  );
}

export default Header;