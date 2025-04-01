// src/Components/Actividad.jsx
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import actividades from "../data/actividades.json";
import { marcarActividadComoCompletada } from "../utils/localStorage";
import "../Styles/Actividad.css";




function Actividad() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const actividad = actividades.find((a) => a.id === parseInt(id));
    const avatar = localStorage.getItem("avatar");
    const nombre = localStorage.getItem("nombre");
    

    // Protección: si no hay datos o no has llegado por QR = redirige
    useEffect(() => {
        const accesoQR = localStorage.getItem("accesoQR"); // permiso de entrada
        const completadas = JSON.parse(localStorage.getItem("actividadesCompletadas")) || [];
        const actividadActual = Number(id);

        // Detectar cuál es la siguiente actividad permitida
        const siguienteEsperada = completadas.length + 1;

        if (
            accesoQR !== "true" || // Protege contra acceso directo a /actividad/:id sin QR
            actividadActual !== siguienteEsperada ||  // Asegura que se sigan las actividades en orden (no saltarse ninguna)
            !avatar || !nombre
        ) {
            alert(" Acceso no autorizado. Debes escanear el QR correcto en orden.");
            navigate("/EscanerQR");
            return;
        }

        //  Marcar como completada si todo OK
        marcarActividadComoCompletada(actividadActual);

        //  Solo eliminamos permiso QR (avatar/nombre/progreso permanecen)
        localStorage.removeItem("accesoQR");
    }, [id, navigate, avatar, nombre]);

    if (!actividad || !avatar || !nombre) {
        return <p className="error-msg"> Actividad no encontrada o acceso no permitido.</p>;
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
            <p>{avatarData.mensaje}</p>
            <p className="sabiasque">
                <strong>¿Sabías que...?</strong> {avatarData.sabiasQue}
            </p>
            <p className="pregunta">
                <strong>Pregunta:</strong> {avatarData.pregunta}
            </p>

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
        </div>
    );
}

export default Actividad;
