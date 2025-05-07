import { useNavigate } from "react-router-dom";
import "../../Styles/Pages/ModoJuego.css";

function ModoJuego() {
  const navigate = useNavigate();

  const handleChoice = (choice) => {
    if (choice === "solo") {
      navigate("/portada");
    } else if (choice === "grupos") {
      navigate("/portada");
    }
  };

  return (
    <div className="modojuego-container">
      <h1 className="titulo">Elige tu estilo de juego</h1>
      <p className="subtitulo">¿Exploras solo o acompañado?</p>
      <div className="opciones">
        <button
          className="btn-opcion"
          id="solo"
          onClick={() => handleChoice("solo")}
          style={{
            backgroundImage: `url(${
              import.meta.env.BASE_URL
            }assets/images/solo_3d.png)`,
          }}
        >
          <span>Modo individual</span>
        </button>
       
        <button
          className="btn-opcion" 
          id="grupo" 
          onClick={() => handleChoice("grupos")}
          style={{
            backgroundImage: `url(${
              import.meta.env.BASE_URL
            }assets/images/grupo_3d.png)`,
          }} 
        >
          <span>Modo equipo</span>
          
        </button>
      </div>
    </div>
  );
}

export default ModoJuego;
