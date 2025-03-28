// src/Components/Actividad.jsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import actividades from "../data/actividades.json";
import { marcarActividadComoCompletada } from "../utils/localStorage";
import "../Styles/Actividad.css";




function Actividad() {
    const { id } = useParams();
    const actividad = actividades.find((a) => a.id === parseInt(id));
    const avatar = localStorage.getItem("avatar");
    const nombre = localStorage.getItem("nombre");

    useEffect(() => {
        if (id) {
            marcarActividadComoCompletada(Number(id));
        }
    }, [id]);

    if (!actividad || !avatar || !nombre) {
        return <p>Actividad no encontrada o datos incompletos</p>;
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
            <p className="sabiasque"><strong>¿Sabías que...?</strong> {avatarData.sabiasQue}</p>
            <p className="pregunta"><strong>Pregunta:</strong> {avatarData.pregunta}</p>

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
