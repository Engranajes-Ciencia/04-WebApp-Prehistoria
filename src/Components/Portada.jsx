// src/Components/Portada.jsx
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import "./Portada.css";


function Portada() {
    const navigate = useNavigate();
    const dinoRef = useRef(new Audio("/sounds/dino.mp3")); // sonido dino

    const handleStart = () => {
        dinoRef.current.currentTime = 0; // reinicia el audio
        dinoRef.current.play();          // reproduce el rugido
        navigate("/form");               // redirige al formulario
    };

    return (
        <div className="portada-container">
            <div className="contenido">
                <h1 className="titulo"> Aventura Prehistórica</h1>
                <p className="subtitulo">¡Bienvenido a la Aventura Prehistórica!
                    Acabas de embarcarte en un viaje en el tiempo donde descubrirás los secretos mejor guardados de la historia de la humanidad y de la Tierra.
                    Guiado por tu fiel compañero o compañera (¡tú eliges!), recorrerás 10 lugares sagrados, fósiles milenarios, civilizaciones ancestrales y monumentos asombrosos.
                    En cada parada encontrarás un código QR que activará una misión: una actividad interactiva que te hará pensar, aprender y superar retos.
                    ¿Estás preparado para convertirte en un auténtico explorador del tiempo?
                    🧭 ¡Tu aventura comienza ya!</p>
                <button className="btn-aventura" onClick={handleStart}>
                    Empezar Aventura
                </button>
            </div>
        </div>
    );
}

export default Portada;
