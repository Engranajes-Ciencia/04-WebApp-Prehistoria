import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import "../../Styles/Pages/Portada.css";

function Portada() {
    const { t } = useTranslation("pages");
    const navigate = useNavigate();
    const audioRef = useRef(null);

     useEffect(() => {
        // Obtiene la ruta del audio desde el archivo de traducción
        const audioPath = import.meta.env.BASE_URL + t("portada.audio");
        const audio = new Audio(audioPath);
        audio.volume = 0.5;
        audioRef.current = audio;

        const playAudio = async () => {
            try {
                await audio.play();
            } catch (error) {
                console.warn("Autoplay bloqueado. Se necesita interacción del usuario.");
            }
        };

        playAudio();

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, [t]); // Se vuelve a ejecutar si cambia el idioma

    const handleStart = () => {
        navigate("/form");
    };

    return (
        <div className="portada-container">
            <div className="contenido">
                <h1 className="titulo1">{t("portada.titulo")}</h1>
                <p className="subtitulo1">
                    {t("portada.descripcion")}
                </p>
                <button className="btn-aventura" onClick={handleStart}>
                    {t("portada.empezar")}
                </button>
            </div>
        </div>
    );
}

export default Portada;




