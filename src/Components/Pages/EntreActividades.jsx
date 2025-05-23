// src/Components/Pages/EntreActividades.jsx

import { getActividadesCompletadas } from "../../config/utils/localStorage";
import actividades from "../../config/data/actividades.json";
import { useNavigate } from "react-router-dom";
import "../../Styles/Pages/EntreActividades.css";
import { useTranslation } from "react-i18next";

function EntreActividades() {
    const { t } = useTranslation ("pages");
    const completadas = getActividadesCompletadas();
    const navigate = useNavigate();

    const ultimaCompletada = completadas[completadas.length - 1];
    const siguiente = completadas.length + 1;


    const avatar = localStorage.getItem("avatar") || "explorador"; // o exploradora
    const nombre = localStorage.getItem("nombre") || "explorador/a";


    return (
        <div className="mapa-check-container">
            <h2>{t("entreActividades.mapa")}</h2>

            <img
                src={`${import.meta.env.BASE_URL}assets/avatars/${avatar}.png`}
                alt="avatar"
                className="guia-avatar"
            />
            <p className="guia-texto">
                {t("entreActividades.guiaTexto", { nombre, ultimaCompletada })}
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
                {actividades.map((act) => {

                    if (typeof act.posX !== "number" || typeof act.posY !== "number") return null;


                    const isCompletada = completadas.includes(act.id);
                    const isActual = act.id === ultimaCompletada;
                    const isSiguiente = act.id === siguiente;

                    return (
                        <div
                            key={act.id}
                            className={`marcador 
                                ${isCompletada ? "completada" : ""}
                                ${isSiguiente ? "siguiente" : ""}
                            `}
                            style={{
                                top: `${act.posY}px`,
                                left: `${act.posX}px`,
                                animationDelay: `${act.id * 0.05}s`
                            }}
                            title={`Parada ${act.id}: ${act.titulo}`
                            }
                        
                        >
                            {act.id} {/* Añade el número de parada aquí */}
                            {isActual && (
                                <img
                                    src={`${import.meta.env.BASE_URL}assets/avatars/${avatar}.png`}
                                    alt="posición actual"
                                    className="marcador-avatar"
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            

            {/* Botones */}
            <div className="botones-container">
                {completadas.length >= 10 ? (
                    <button className="btn-final" onClick={() => navigate("/final")}>
                        {t("entreActividades.pantallaFinal")}
                    </button>
                ) : (
                    <button className="btn-scan" onClick={() => navigate("/EscanerQR")}>
                        {t("entreActividades.escanear")} ({siguiente})
                    </button>
                )}

                <button className="btn-medallas" onClick={() => navigate("/vitrina-virtual")}>
                    {t("entreActividades.medallas")}
                </button>
            </div>
        </div>
    );
}

export default EntreActividades;