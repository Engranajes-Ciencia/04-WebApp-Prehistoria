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
                {t("entreActividades.buenTrabajo")} {nombre}. {t("entreActividades.hasCompletado")} {completadas.length} {t("entreActividades.paradas")}.
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

                {/* muestra vitrina */}
                <button className="btn-medallas" onClick={() => navigate("/vitrina-virtual")}>
                    {t("entreActividades.medallas")}
                </button>


            </div>
        </div>
    );
}

export default EntreActividades;
