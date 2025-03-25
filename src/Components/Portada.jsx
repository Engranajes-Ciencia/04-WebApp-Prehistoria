import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import "./Portada.css";

function Portada() {
    const navigate = useNavigate();
    const audioRef = useRef(null);

    useEffect(() => {
        // Crear la referencia del audio solo si no existe
        if (!audioRef.current) {
            audioRef.current = new Audio("/sounds/vozportada.wav");
            audioRef.current.volume = 1.0; // Ajustar volumen si es necesario
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
                <h1 className="titulo">Aventura Prehistórica</h1>
                <p className="subtitulo">
                    ¡Bienvenido a la Aventura Prehistórica!
                    Acabas de embarcarte en un viaje en el tiempo donde descubrirás los secretos mejor guardados de la historia de la humanidad y de la Tierra.
                    Guiado por tu fiel compañero o compañera (¡tú eliges!), recorrerás 10 lugares sagrados, fósiles milenarios, civilizaciones ancestrales y monumentos asombrosos.
                    En cada parada encontrarás un código QR que activará una misión: una actividad interactiva que te hará pensar, aprender y superar retos.
                    ¿Estás preparado para convertirte en un auténtico explorador del tiempo?
                    🧭 ¡Tu aventura comienza ya!
                </p>
                <button className="btn-aventura" onClick={handleStart}>
                    Empezar Aventura
                </button>
            </div>
        </div>
    );
}

export default Portada;



