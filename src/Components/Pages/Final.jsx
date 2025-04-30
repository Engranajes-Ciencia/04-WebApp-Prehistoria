
import { useNavigate } from "react-router-dom" // Navegacion entre paginas 
import { useEffect, useState } from "react";
import { resetActividadesCompletadas } from "../../config/utils/localStorage";
import { jsPDF } from "jspdf";
import confetti from "canvas-confetti";
import "../../Styles/Pages/Final.css";



function Final() {
    const  navigate  = useNavigate();
    const [avatar, setAvatar] = useState("");
    const [nombre, setNombre] = useState("");

    // Nuevo estado para mostrar el popup
    const [mostrarPopup, setMostrarPopup] = useState(false);


    useEffect(() => {
        const avatarGuardado = localStorage.getItem("avatar");
        const nombreGuardado = localStorage.getItem("nombre");

        if (avatarGuardado) setAvatar(avatarGuardado);
        if (nombreGuardado) setNombre(nombreGuardado);


        //  confeti al cargar la página final
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#79a981', '#fdd835', '#66bb6a']
        });
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

            // Muestra popup
            setMostrarPopup(true);
            setTimeout(() => setMostrarPopup(false), 5000); // Ocultar en 3 segundos
        };

        img.onerror = () => {
            alert("No se pudo cargar la imagen del diploma.");
        };
    };



    const handleReiniciarJuego = () => {
        localStorage.clear();             //  Limpiar todo
        resetActividadesCompletadas();     //  También limpiamos las actividades
        navigate("/");                     //  Volver a la portada
    };

    return (
        <div className="final-container">
            <h1 className="titulo-final">🎉 ¡Enhorabuena!</h1>

            <div className="barra-progreso-final">
                <div className="relleno-final">100% Completado</div>
            </div>

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
                className="diploma-img-animada"
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

                <button className="btn-vitrina" onClick={() => navigate("/vitrina-virtual")}>
                    Ver Galería de Medallas
                </button>

            </div>

            {mostrarPopup && (
                <div className="popup-descarga">
                    Diploma descargado con éxito
                </div>
            )}
        </div>
    );
}

export default Final;
