// Pages/VitrinaVirtual.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Pages/VitrinaVirtual.css";
import { useTranslation } from "react-i18next";


const medallas = [
    { id: 3, imagen: `${import.meta.env.BASE_URL}assets/images/imagesMedal/medallaParada3.png` },
    { id: 6, imagen: `${import.meta.env.BASE_URL}assets/images/imagesMedal/medallaParada6.png` },
    { id: 9, imagen: `${import.meta.env.BASE_URL}assets/images/imagesMedal/medallaParada9.png` },
    { id: 10, imagen: `${import.meta.env.BASE_URL}assets/images/imagesMedal/medallaParada10.png` },
    { id: 12, imagen: `${import.meta.env.BASE_URL}assets/images/imagesMedal/medallaParada12.png` },
    { id: 13, imagen: `${import.meta.env.BASE_URL}assets/images/imagesMedal/medallaParada13.png` },
    { id: 15, imagen: `${import.meta.env.BASE_URL}assets/images/imagesMedal/medallaParada15.png` },
    { id: 16, imagen: `${import.meta.env.BASE_URL}assets/images/imagesMedal/medallaParada16.png` },
    { id: 19, imagen: `${import.meta.env.BASE_URL}assets/images/imagesMedal/medallaParada19.png` },
    { id: 20, imagen: `${import.meta.env.BASE_URL}assets/images/imagesMedal/medallaParada20.png` }
];   




function VitrinaVirtual() {

    const { t } = useTranslation ("pages");
    const completadas = (JSON.parse(localStorage.getItem("actividadesCompletadas")) || []).map(Number);
    const [flippedId, setFlippedId] = useState(null);
    const navigate = useNavigate();

    return (
        <div className="vitrina-virtual-container">
            <h1 className="titulo-virtual">{t("vitrinaVirtual.galeriaVirtual")}</h1>
            <p className="contador-medallas">
                {t("vitrinaVirtual.conseguido", { completadas: completadas.length, total: medallas.length })}
            </p>

            <div className="grid-medallas">
                {medallas.map((medalla) => {
                    const completada = completadas.includes(medalla.id);
                    const isFlipped = flippedId === medalla.id;

                    return (

                        <div
                            key={medalla.id}
                            className={`card-flip ${completada ? "completada" : "bloqueada"} ${isFlipped ? "flipped" : ""}`}
                            onClick={() => completada && setFlippedId(isFlipped ? null : medalla.id)}
                        >
                            <div className="card-inner">
                                <div className="card-front">
                                    
                                    <img
                                        src={medalla.imagen}
                                        alt={`Medalla ${medalla.id}`}
                                    />
                                    <p>{t(`vitrinaVirtual.medallas.${medalla.id}.titulo`)}</p>
                                       
                                </div>
                                <div className="card-back">
                                    <h3>🏅 {t(`vitrinaVirtual.medallas.${medalla.id}.titulo`)}</h3>
                                    <p className="curiosidad-text">{t(`vitrinaVirtual.medallas.${medalla.id}.curiosidad`)}</p>
                                </div>
                            </div>
                        </div>

                    );
                })}
            </div>

         

            <button
                className="btn-volver-final"
                onClick={() => {
                    const completadas = JSON.parse(localStorage.getItem("actividadesCompletadas")) || [];
                    if (completadas.length >= 20) {
                        navigate("/final");
                    } else {
                        navigate("/entre-actividad");
                    }
                }}
            >
                {t("vitrinaVirtual.volver")}
            </button>

        </div>
    );
}

export default VitrinaVirtual;
