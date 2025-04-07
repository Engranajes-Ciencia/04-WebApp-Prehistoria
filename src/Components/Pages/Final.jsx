
import { useNavigate } from "react-router-dom" // Navegacion entre paginas 
import { useEffect, useState } from "react";
import { resetActividadesCompletadas } from "../../config/utils/localStorage";
import { jsPDF } from "jspdf";
import "../../Styles/Pages/Final.css";



function Final() {
    const  navigate  = useNavigate();
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

        const avatarValue = avatar || "explorador"; // Por si no se ha cargado aún
        const nombreValue = nombre || "Explorador/a";

        const imagePath =
            avatarValue === "exploradora"
                ? `${import.meta.env.BASE_URL}assets/images/diploma_exploradora.jpg`
                : `${import.meta.env.BASE_URL}assets/images/diploma_explorador.jpg`;

        const img = new Image();
        img.src = imagePath;

        img.onload = () => {
            doc.addImage(img, "JPEG", 10, 10, 277, 190);
            doc.setFontSize(16);
            doc.text(`Nombre: ${nombreValue}`, 20, 205);
            doc.save("diploma-aventura-prehistorica.pdf");
        };

        img.onerror = () => {
            alert("No se pudo cargar la imagen del diploma.");
        };
    };



    const handleReiniciarJuego = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="final-container">
            <h1 className="titulo-final">🎉 ¡Enhorabuena!</h1>

            <div className="nombre-avatar">
                <img
                    src={`${import.meta.env.BASE_URL}assets/avatars/${avatar || "explorador"}.png`}
                    alt={avatar}
                    className="avatar-mini-final"
                />
                <span className="nombre-final">
                    {nombre || "Explorador/a"} – {avatar === "exploradora" ? "Exploradora" : "Explorador"} del Tiempo
                </span>
            </div>

            <p className="subtitulo-final">
                Has completado todas las paradas de la Aventura Prehistórica.
            </p>


            <img
                src={`${import.meta.env.BASE_URL}assets/images/diploma_${avatar}.jpg`}
                alt="Diploma"
                className="diploma-img"
                onError={(e) => {
                    e.target.src = `${import.meta.env.BASE_URL}assets/images/diploma_explorador.jpg`;
                }}
            />

            <div className="acciones-finales">
                <button className="btn-descargar" onClick={handleDescargarDiploma}>
                    Descargar Diploma
                </button>
                <button className="btn-reiniciar" onClick={handleReiniciarJuego}>
                    Reiniciar Juego
                </button>

                <button className="btn-vitrina" onClick={() => navigate("/vitrina")}>
                    Medallas disponibles
                </button>

            </div>
        </div>
    );
}

export default Final;
