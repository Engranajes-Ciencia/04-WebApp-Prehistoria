import { useEffect } from 'react';
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
  useEffect(() => {
  // Incrementar el contador de inicios
  let inicios = localStorage.getItem('contadorIniciosJuego');
  inicios = inicios ? parseInt(inicios, 10) + 1 : 1;
  localStorage.setItem('contadorIniciosJuego', inicios.toString());

  console.log(`El juego se ha iniciado ${inicios} veces.`);

  // Opcional: Registrar el inicio de una sesión de tiempo (ver punto 2)
  const inicioSesionTimestamp = Date.now();
  localStorage.setItem('inicioSesionTimestamp', inicioSesionTimestamp.toString());
  console.log('Sesión de juego iniciada en:', new Date(inicioSesionTimestamp).toLocaleString());


  // Limpieza para el tiempo de sesión (ver punto 2b)
  const handleAntesDeDescargar = () => {
    const inicioGuardado = localStorage.getItem('inicioSesionTimestamp');
    if (inicioGuardado) {
      const duracionSesion = Date.now() - parseInt(inicioGuardado, 10);

      let tiempoTotal = localStorage.getItem('tiempoTotalJuego');
      tiempoTotal = tiempoTotal ? parseInt(tiempoTotal, 10) + duracionSesion : duracionSesion;
      localStorage.setItem('tiempoTotalJuego', tiempoTotal.toString());
      localStorage.removeItem('inicioSesionTimestamp'); // Limpiar para la próxima sesión

      console.log(`Sesión finalizada por cierre/navegación. Duración: ${duracionSesion / 1000}s. Tiempo total acumulado: ${tiempoTotal / (1000 * 60)}min.`);
    }
  };

  window.addEventListener('beforeunload', handleAntesDeDescargar);

  return () => {
    window.removeEventListener('beforeunload', handleAntesDeDescargar);
    // Este return también podría ser un lugar para llamar a handleAntesDeDescargar
    // si el componente se desmonta de forma controlada (ej. navegación interna)
       handleAntesDeDescargar(); // Descomentar si es apropiado para tu flujo
  };

}, []); // El array vacío asegura que esto solo se ejecute una vez cuando el componente se monta

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
