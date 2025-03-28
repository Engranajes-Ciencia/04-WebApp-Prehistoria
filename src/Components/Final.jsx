

import { useEffect, useState } from "react";
import { resetActividadesCompletadas } from "../utils/localStorage";
import { jsPDF } from "jspdf";
import "../Styles/Final.css";

function Final() {
    const [avatar, setAvatar] = useState("");
    const [nombre, setNombre] = useState("");

    useEffect(() => {
        const avatarGuardado = localStorage.getItem("avatar");
        const nombreGuardado = localStorage.getItem("nombre");

        if (avatarGuardado) setAvatar(avatarGuardado);
        if (nombreGuardado) setNombre(nombreGuardado);

        resetActividadesCompletadas(); // Limpieza para siguiente usuario
    }, []);

    const handleDescargarDiploma = async () => {
        const { jsPDF } = await import("jspdf");

        const doc = new jsPDF({ orientation: "landscape" });

        const img = new Image();
        const avatar = localStorage.getItem("avatar");
        const nombre = localStorage.getItem("nombre") || "Explorador/a";
        const imagePath =
            avatar === "exploradora"
                ? `${import.meta.env.BASE_URL}assets/images/diploma_exploradora.jpg`
                : `${import.meta.env.BASE_URL}assets/images/diploma_explorador.jpg`;

        img.src = imagePath;

        img.onload = () => {
            doc.addImage(img, "JPEG", 10, 10, 277, 190);
            doc.text(`Nombre: ${nombre}`, 20, 205);
            doc.save("diploma-aventura-prehistorica.pdf");
        };
    };



    const handleReiniciarJuego = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    return (
        <div className="final-container">
            <h1 className="titulo-final">🎉 ¡Enhorabuena!</h1>

            <div className="nombre-avatar">
                <img
                    src={`${import.meta.env.BASE_URL}assets/avatars/${avatar}.png`}
                    alt={avatar}
                    className="avatar-mini-final"
                />
                <span className="nombre-final">
                    {nombre} – {avatar === "exploradora" ? "Exploradora" : "Explorador"} del Tiempo
                </span>
            </div>

            <p className="subtitulo-final">
                Has completado todas las paradas de la Aventura Prehistórica.
            </p>


            <img
                src={`${import.meta.env.BASE_URL}assets/images/diploma_${avatar}.jpg`}
                alt="Diploma"
                className="diploma-img"
            />

            <div className="acciones-finales">
                <button className="btn-descargar" onClick={handleDescargarDiploma}>
                    Descargar Diploma
                </button>
                <button className="btn-reiniciar" onClick={handleReiniciarJuego}>
                    Reiniciar Juego
                </button>
            </div>
        </div>
    );
}

export default Final;
