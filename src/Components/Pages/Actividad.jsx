// src/Components/Pages/Actividad.jsx
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import actividades from "../../config/data/actividades.json";
import { marcarActividadComoCompletada } from "../../config/utils/localStorage";
import { validarAvatar, validarNombre } from "../../config/utils/validations";
import "../../Styles/Pages/Actividad.css";




function Actividad() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const actividad = actividades.find((a) => a.id === parseInt(id));
    const avatar = localStorage.getItem("avatar");
    const nombre = localStorage.getItem("nombre");
    const accesoQR = localStorage.getItem("accesoQR");

    // Constantes del audio
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);


    const toggleAudio = () => {
        if (!audioRef.current) return;
    
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch((e) => {
                console.warn("Autoplay bloqueado por el navegador", e);
            });
        }
    
        setIsPlaying(!isPlaying);
    };
    

    useEffect(() => {
        if (
            accesoQR !== "true" ||
            !validarNombre(nombre) ||
            !validarAvatar(avatar)
        ) {
            alert("Acceso no autorizado. Por favor, escanea un QR válido.");
            navigate("/EscanerQR");
            return;
        }

        marcarActividadComoCompletada(Number(id));


        // Eliminar solo tras navegación
        // localStorage.removeItem("accesoQR");
        
    }, [id, navigate, avatar, nombre, accesoQR]);

    if (!actividad || !avatar || !nombre) {
        return (
            <p className="error-msg">
                Actividad no encontrada o acceso no permitido.
            </p>
        );
    }

    const avatarData = actividad.avatarDialogo[avatar];
    const avatarImg = `${import.meta.env.BASE_URL}assets/avatars/${avatar}.png`;


    return (
        <div className="actividad-container">
            <div className="actividad-header">
                <img src={avatarImg} alt="avatar" className="avatar-actividad" />
                <h2>¡Hola {nombre}! Soy tu guía en esta parada</h2>
            </div>

            <h3>{actividad.titulo}</h3>

            {avatarData?.mensaje && <p>{avatarData.mensaje}</p>}


            {actividad.audio && (
                <div className="audio-button-container">
                    <button onClick={toggleAudio} className="audio-button">
                        {isPlaying ? "⏸️ Pausar audio" : "▶️ Reproducir audio"}
                    </button>
                    <audio
                        ref={audioRef}
                        src={actividad.audio}
                        preload="auto"
                    />

                </div>
            )}


            {avatarData?.sabiasQue && (
                <p className="sabiasque">
                    <strong>¿Sabías que...?</strong> {avatarData.sabiasQue}
                </p>
            )}
            

            {actividad.geniallyURL && (
                <div className="actividad-genially">
                    <iframe
                        src={actividad.geniallyURL}
                        width="100%"
                        height="500px"
                        frameBorder="0"
                        allowFullScreen
                        title="Genially actividad"
                    ></iframe>
                </div>
            )}
        </div>
    );
}

export default Actividad;
