// src/Components/Pages/EntreActividades.jsx

import { getActividadesCompletadas } from "../../config/utils/localStorage";
import actividades from "../../config/data/actividades.json";
import { useNavigate } from "react-router-dom";
import "../../Styles/Pages/EntreActividades.css";
import { useTranslation } from "react-i18next";

function EntreActividades() {
    const { t } = useTranslation("pages");
    const completadas = getActividadesCompletadas();
    const navigate = useNavigate();

    const ultimaCompletada = completadas.length > 0 ? completadas[completadas.length - 1] : null;


    const avatar = localStorage.getItem("avatar") || "explorador"; // o exploradora
    const nombre = localStorage.getItem("nombre") || "explorador/a";

    //  filtrar antes para asegurar que solo mapeas elementos válidos
    const actividadesRenderizables = actividades.filter(
        (act) => typeof act.posX === "number" && typeof act.posY === "number"
    );


    return (
        <div className="mapa-check-container">
            <h2>{t("entreActividades.mapa")}</h2>

            <img
                src={`${import.meta.env.BASE_URL}assets/avatars/${avatar}.png`}
                alt="avatar"
                className="guia-avatar"
            />
            <p className="guia-texto">
                {t("entreActividades.guiaTexto", { nombre, completadas: completadas.length, totalActividades: actividades.length })}
            </p>


            <div className="barra-progreso">
                <div className="relleno" style={{ width: `${(completadas.length / actividades.length) * 100}%` }}></div>
            </div>

            {/* Imagen del mapa */}
            <div className="mapa-contenedor">
                <img
                    src={`${import.meta.env.BASE_URL}assets/images/fondo-mapa.png`}
                    alt="Mapa"
                    className="mapa-real"
                />


                {/* Marcadores dinámicos sobre el mapa */}
                {actividadesRenderizables.map((act) => {
                    

                    const isCompletada = completadas.includes(act.id);
                    const isActual = act.id === ultimaCompletada;

                    return (
                        <div
                            key={act.id}
                            className={`marcador 
                                ${isCompletada ? "completada" : ""}
                            `}
                            style={{
                                top: `${act.posY}%`,
                                left: `${act.posX}%`,
                                transform: 'translate(-50%, -50%)' // Para centrar el punto
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

                <button className="btn-final" onClick={() => navigate("/final", { state: { paradas: completadas } })}>
                    {t("entreActividades.final")}
                    <span className="icono-final">🎉</span>
                </button>


                <button className="btn-scan" onClick={() => navigate("/EscanerQR")}>
                    {t("entreActividades.escanear")}
                    <span className="icono-scan">📷</span>

                </button>
                <button className="btn-medallas" onClick={() => navigate("/vitrina-virtual")}>
                    {t("entreActividades.medallas")}
                    <span className="icono-medallas">🏅</span>
                </button>
            </div>

        </div>
    );
}

export default EntreActividades;