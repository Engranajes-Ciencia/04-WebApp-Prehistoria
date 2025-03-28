

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

    const handleDescargarDiploma = () => {
        const doc = new jsPDF({ orientation: "landscape" });

        const img = new Image(); // crea imagen con avatar y nombre elegido y guardado en local store
        const avatar = localStorage.getItem("avatar");
        const nombre = localStorage.getItem("nombre") || "Explorador/a";
        const imagePath =
            avatar === "exploradora"
                ? "/assets/images/diploma_exploradora.jpg"
                : "/assets/images/diploma_explorador.jpg";

        img.src = imagePath;

        img.onload = () => {
            doc.addImage(img, "JPEG", 10, 10, 277, 190); // ajustado para A4 landscape
            doc.text(`Nombre: ${nombre}`, 20, 205); // añade el nombre elegido debajo
            doc.save("diploma-aventura-prehistorica.pdf"); // guarda pdf
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
                    src={`/assets/avatars/${avatar}.png`}
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
                src={`/assets/images/diploma_${avatar}.jpg`}
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
