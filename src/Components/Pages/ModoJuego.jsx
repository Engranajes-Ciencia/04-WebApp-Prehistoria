import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../Styles/Pages/ModoJuego.css";

function ModoJuego() {
  const { t } = useTranslation("pages");
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
      <h1 className="titulo">{t("modojuego.titulo")}</h1>
      <p className="subtitulo"><strong>{t("modojuego.subtitulo")}</strong></p>
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
          <span>{t("modojuego.modoIndividual")}</span>
        </button>
       
        <button
          className="btn-opcion" disabled
          id="grupo" 
          onClick={() => handleChoice("grupos")}
          style={{
            backgroundImage: `url(${
              import.meta.env.BASE_URL
            }assets/images/grupo_3d.png)`,
          }} 
        >
          <span>{t("modojuego.modoEquipo")}</span>
          <div className="hover-mensaje"> {t("modojuego.proximamente")}

          </div>
          
        </button>
      </div>
    </div>
  );
}

export default ModoJuego;
