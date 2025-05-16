// src/Components/Pages/EntreActividades.jsx

import { getActividadesCompletadas } from "../../config/utils/localStorage";
import actividades from "../../config/data/actividades.json";
import { useNavigate } from "react-router-dom";
import "../../Styles/Pages/EntreActividades.css";

function EntreActividades() {
    const completadas = getActividadesCompletadas();
    const navigate = useNavigate();

    const siguiente = completadas.length + 1;

    const avatar = localStorage.getItem("avatar") || "explorador"; // o exploradora
    const nombre = localStorage.getItem("nombre") || "explorador/a";


    return (
        <div className="mapa-check-container">
            <h2>Mapa del Recorrido</h2>

            <img
                src={`${import.meta.env.BASE_URL}assets/avatars/${avatar}.png`}
                alt="avatar"
                className="guia-avatar"
            />
            <p className="guia-texto">
                ¡Buen trabajo {nombre}! Has completado {completadas.length} de 20 paradas.
            </p>

            <div className="barra-progreso">
                <div className="relleno" style={{ width: `${(completadas.length / 20) * 100}%` }}></div>
            </div>

            {/* Imagen del mapa */}
            <div className="mapa-contenedor">
                <img
                    src={`${import.meta.env.BASE_URL}assets/images/fondo-mapa.png`}
                    alt="Mapa"
                    className="mapa-real"
                />


                {/* Marcadores dinámicos sobre el mapa */}
                {actividades.map((act, index) => {
                    const completada = completadas.includes(act.id);
                    const esSiguiente = siguiente === act.id;

                    if (typeof act.posX !== "number" || typeof act.posY !== "number") return null;


                    return (
                        <div
                            key={act.id}
                            className={`marcador ${completada ? "completada" : ""} ${esSiguiente ? "actual" : ""}`}
                            style={{ top: `${act.posY}px`, left: `${act.posX}px` }}
                            title={`Parada ${act.id}: ${act.titulo}`}
                        />
                    );                      
                })}
            </div>

            

            {/* Botones */}
            <div className="botones-container">
                {completadas.length >= 10 ? (
                    <button className="btn-final" onClick={() => navigate("/final")}>
                        Ver pantalla final
                    </button>
                ) : (
                    <button className="btn-scan" onClick={() => navigate("/EscanerQR")}>
                        Escanear siguiente parada ({siguiente})
                    </button>
                )}

                <button className="btn-medallas" onClick={() => navigate("/vitrina-virtual")}>
                    Ver Medallas
                </button>
            </div>
        </div>
    );
}

export default EntreActividades;