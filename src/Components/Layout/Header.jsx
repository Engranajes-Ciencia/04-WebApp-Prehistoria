import { useEffect, useState } from "react";
import "../../Styles/Layout/Header.css";

function Header() {

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
      <div className="branding">
        <img
          src={`${import.meta.env.BASE_URL}assets/images/Logo-principal.png`}
          alt="Logo de la empresa"
          className="logo"
        />
        <span>Proyecto desarrollado para la empresa</span>
      </div>

      <h1>¡Bienvenidos a esta aventura!</h1>

      <div className="botones-header">
        <button className="btn-tema" onClick={toggleModoOscuro}>
          {modoOscuro ? "🌞 Modo Claro" : "🌙 Modo Oscuro"}
        </button>

        <button
          className="btn-kiosco"
          onClick={() => {
            const el = document.documentElement;
            if (el.requestFullscreen) el.requestFullscreen();
            else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
            else if (el.msRequestFullscreen) el.msRequestFullscreen();
          }}
        >
          🖥 Modo Kiosco
        </button>
      </div>


      
    </header>
  );
}

export default Header;

