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
    { id: 11, imagen: `${import.meta.env.BASE_URL}assets/images/imagesMedal/medallaParada11.png` },
    { id: 13, imagen: `${import.meta.env.BASE_URL}assets/images/imagesMedal/medallaParada13.png` },
    { id: 15, imagen: `${import.meta.env.BASE_URL}assets/images/imagesMedal/medallaParada15.png` },
    { id: 16, imagen: `${import.meta.env.BASE_URL}assets/images/imagesMedal/medallaParada16.png` },
    { id: 19, imagen: `${import.meta.env.BASE_URL}assets/images/imagesMedal/medallaParada19.png` },
    { id: 20, imagen: `${import.meta.env.BASE_URL}assets/images/imagesMedal/medallaParada20.png` }
];

function VitrinaVirtual() {
    const { t } = useTranslation("pages");
    const navigate = useNavigate();

    const actividadesCompletadas = (JSON.parse(localStorage.getItem("actividadesCompletadas")) || []).map(Number);
    const medallaIds = medallas.map(m => m.id);
    const actividadesConMedalla = actividadesCompletadas.filter(id => medallaIds.includes(id));

    //  Usar  array para los IDs de las tarjetas giradas
    const [flippedIds, setFlippedIds] = useState([]);

    // Función para manejar el clic en una tarjeta
    const handleCardClick = (medallaId) => {
        setFlippedIds(prevFlippedIds => {
            if (prevFlippedIds.includes(medallaId)) {
                // Si ya está girada, la quitamos del array (para volverla a su estado frontal)
                return prevFlippedIds.filter(id => id !== medallaId);
            } else {
                // Si no está girada, la añadimos al array
                return [...prevFlippedIds, medallaId];
            }
        });
    };

    return (
        <div className="vitrina-virtual-container">
            <h1 className="titulo-virtual">{t("vitrinaVirtual.galeriaVirtual")}</h1>
            <p className="contador-medallas">
                {t("vitrinaVirtual.conseguido", { completadas: actividadesConMedalla.length, total: medallas.length })}
            </p>

            <div className="grid-medallas">
                {medallas.map((medalla) => {
                    const completada = actividadesConMedalla.includes(medalla.id);
                    //  Verifica si el ID de la medalla actual está en el array `flippedIds`
                    const isFlipped = flippedIds.includes(medalla.id);

                    return (

                        <div
                            key={medalla.id}
                            className={`card-flip ${completada ? "completada" : "bloqueada"} ${isFlipped ? "flipped" : ""}`}
                            onClick={() => completada && handleCardClick(medalla.id)}
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
                    if (actividadesConMedalla.length >= medallas.length) {
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

