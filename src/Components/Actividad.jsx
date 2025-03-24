// src/Components/Actividad.jsx
import { useParams } from "react-router-dom";
import actividades from "../data/actividades.json";
import "./Actividad.css";

function Actividad() {
    const { id } = useParams();
    const actividad = actividades.find((a) => a.id === parseInt(id));
    const avatar = localStorage.getItem("avatar");
    const nombre = localStorage.getItem("nombre");

    if (!actividad) {
        return <p>Actividad no encontrada</p>;
    }

    const avatarImg = avatar
        ? `/avatars/${avatar}.png`
        : "/avatars/explorador.png";

    return (
        <div className="actividad-container">
            <div className="actividad-header">
                <img src={avatarImg} alt="avatar" className="avatar-actividad" />
                <h2>¡Hola {nombre}! Soy tu guía en esta parada</h2>
            </div>

            <h3>{actividad.titulo}</h3>
            <p>{actividad.descripcion}</p>
            <p className="sabiasque"><strong>¿Sabías que...?</strong> {actividad.sabiasQue}</p>
            <p className="pregunta"><strong>Pregunta:</strong> {actividad.pregunta}</p>

            <div className="actividad-genially">
                <iframe
                    src={actividad.geniallyUrl}
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
