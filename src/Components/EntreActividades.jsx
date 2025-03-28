
// src/Components/EntreActividades.jsx

import { getActividadesCompletadas } from "../utils/localStorage";
import actividades from "../data/actividades.json";
import { useNavigate } from "react-router-dom";
import "../Styles/EntreActividades.css";

function EntreActividades() {
    const completadas = getActividadesCompletadas();
    const navigate = useNavigate();

    const siguiente = completadas.length + 1;

    const avatar = localStorage.getItem("avatar") || "explorador"; // o exploradora


    return (
        <div className="mapa-check-container">
            <h2>Mapa del Recorrido</h2>

            <img
                src={`${import.meta.env.BASE_URL}assets/avatars/${avatar}.png`}
                alt="avatar"
                className="guia-avatar"
            />
            <p className="guia-texto">
                ¡Buen trabajo {completadas.length >= 10 ? "explorador/a" : ""}! Has completado {completadas.length} de 10 paradas.
            </p>

            <div className="barra-progreso">
                <div className="relleno" style={{ width: `${(completadas.length / 10) * 100}%` }}></div>
            </div>


            <img
                src={`${import.meta.env.BASE_URL}assets/images/fondo-mapa.jpg`}
                alt="Mapa"
                className="mapa-real"
            />


            <ul className="checkpoints">
                {actividades.map((act) => (
                    <li key={act.id} className={completadas.includes(act.id) ? "hecha" : ""}>
                        {act.id}. {act.titulo}
                    </li>
                ))}
            </ul>

            {completadas.length >= 10 ? (
                <button className="btn-final" onClick={() => navigate("/final")}>
                    Ver pantalla final 
                </button>
            ) : (
                <button className="btn-scan" onClick={() => navigate("/EscanerQR")}>
                    Escanear siguiente parada ({siguiente})
                </button>
            )}
        </div>
    );
}

export default EntreActividades;
