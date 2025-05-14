import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import "../../Styles/Pages/Portada.css";

function Portada() {
    const { t } = useTranslation("pages");
    const navigate = useNavigate();
    const audioRef = useRef(null);

    useEffect(() => {
        // Crear la referencia del audio solo si no existe
        if (!audioRef.current) {
            audioRef.current = new Audio(`${import.meta.env.BASE_URL}sounds/vozportada.wav`);
            audioRef.current.volume = 0.5; // Ajustar volumen si es necesario
        }

        // Intentar reproducir el audio cuando la página se cargue
        const playAudio = async () => {
            try {
                await audioRef.current.play();
            } catch (error) {
                console.warn("El navegador bloqueó el autoplay. Se necesita interacción del usuario.");
            }
        };

        playAudio(); // Llamar a la función de reproducción al cargar la página

        return () => {
            // Detener el audio cuando el usuario salga de la página
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, []); // Se ejecuta solo una vez al montar el componente

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



