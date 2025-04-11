import { useEffect } from "react";
import "../../Styles/Layout/Header.css";

function Header() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("modoOscuro");
    if (savedTheme === "true") {
      document.documentElement.classList.add("dark");
    }
  }, []);

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
        <button
          className="btn-tema"
          onClick={() => {
            document.documentElement.classList.toggle("dark");
            localStorage.setItem(
              "modoOscuro",
              document.documentElement.classList.contains("dark")
            );
          }}
        >
          🌓 Modo Oscuro
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

