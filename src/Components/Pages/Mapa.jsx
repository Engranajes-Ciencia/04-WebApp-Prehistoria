// src/Components/Pages/Mapa.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../Styles/Pages/Mapa.css";

const avatarMap = {
    explorador: `${import.meta.env.BASE_URL}assets/avatars/explorador.png`,
    exploradora: `${import.meta.env.BASE_URL}assets/avatars/exploradora.png`,
};

const avatarNameMap = {
    explorador: "Kushim",
    exploradora: "Enheduanna",
}


function Mapa() {
    const { t } = useTranslation("pages");
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [avatar, setAvatar] = useState("");

    useEffect(() => { 
        const nombreGuardado = localStorage.getItem("nombre");
        const avatarGuardado = localStorage.getItem("avatar");

        console.log("nombreGuardado:", nombreGuardado);
        console.log("avatarGuardado", avatarGuardado);

        if (!nombreGuardado || !avatarGuardado) {
            navigate("/");
            return;
        }

        setNombre(nombreGuardado);
        setAvatar(avatarGuardado);
        
    }, []);

    return (
        <div className="mapa-container">
            <div className="saludo">
                <h2>{t("mapa.saludo", { nombre })}</h2>

                <div className="guia">
                    <img
                        src={avatarMap[avatar]}
                        alt={avatar}
                        className="avatar-mini"
                    />
                    <p>
                       {t("mapa.dialogo", {
                            nombre,
                            guia: avatarNameMap[avatar],
                        })}
                    </p>
                </div>

                <p>{t("mapa.instruccion")}</p>

                <div className="botones">
                <button className="qr-button" onClick={() => navigate("/EscanerQR")}> 
                    📷 {t("mapa.botonQR")}
                </button>
                <button className="volver-button" onClick={() => navigate("/Form")}> 
                    🔙 {t("mapa.botonVolver")}
                </button>
                </div>
                
            </div>
            <div className="fondo"></div>
        </div>
 
    );
}

export default Mapa;
