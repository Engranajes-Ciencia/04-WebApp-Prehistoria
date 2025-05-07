import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { resetActividadesCompletadas } from "../../config/utils/localStorage";
import { jsPDF } from "jspdf";
import confetti from "canvas-confetti";
import "../../Styles/Pages/Final.css";

function Final() {
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState("");
    const [nombre, setNombre] = useState("");
    const [mostrarPopup, setMostrarPopup] = useState(false);
    const [tipoDiploma, setTipoDiploma] = useState(null); // "infantil" o "adultos"

    useEffect(() => {
        const avatarGuardado = localStorage.getItem("avatar");
        const nombreGuardado = localStorage.getItem("nombre");

        if (avatarGuardado) setAvatar(avatarGuardado);
        if (nombreGuardado) setNombre(nombreGuardado);

        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#79a981', '#fdd835', '#66bb6a']
        });
    }, []);

    const handleDescargarDiploma = () => {
        if (!tipoDiploma) {
            alert("Selecciona un tipo de diploma.");
            return;
        }

        const doc = new jsPDF({ orientation: "landscape" });
        const nombreValue = nombre || "Explorador/a"; // Nombre del jugador o un valor predeterminado
        let imagePath = "";

        // Asignar correctamente la imagen según el tipo de diploma
        imagePath = tipoDiploma === "infantil"
            ? `${import.meta.env.BASE_URL}assets/images/diploma_explorador.jpg`
            : `${import.meta.env.BASE_URL}assets/images/diploma.jpg`;

        const img = new Image();
        img.src = imagePath;

        img.onload = () => {
            // Añadir la imagen del diploma
            doc.addImage(img, "JPEG", 10, 10, 277, 190);

            // Solo añadir el nombre en el diploma de tipo "adultos"
            if (tipoDiploma === "adultos") {
                // Calcular el centro de la página para poner el nombre
                const pageWidth = doc.internal.pageSize.width; // Ancho de la página
                const pageHeight = doc.internal.pageSize.height; // Alto de la página
                const textWidth = doc.getTextWidth(nombreValue); // Ancho del texto

                // Calcular la posición X y Y para centrar el texto firma pdf X horizontal, Y vertical
                const posX = (pageWidth - textWidth) / 2 -27;
                const posY = pageHeight / 2 + 10;

                // Establecer la fuente y el tamaño
                doc.setFont("helvetica", "italic");
                doc.setFontSize(35)

                // Añadir el nombre con la nueva tipografía
                doc.text(nombreValue, posX, posY);
            }

            // Guardar el documento
            doc.save("diploma-aventura-prehistorica.pdf");
            setMostrarPopup(true);
            setTimeout(() => setMostrarPopup(false), 5000);
        };

        img.onerror = () => {
            alert("No se pudo cargar la imagen del diploma.");
        };
    };

    const getPreviewUrl = () => {
        return tipoDiploma === "infantil"
            ? `${import.meta.env.BASE_URL}assets/images/diploma_explorador.jpg`
            : `${import.meta.env.BASE_URL}assets/images/diploma.jpg`;
    };

    const handleReiniciarJuego = () => {
        localStorage.clear();
        resetActividadesCompletadas();
        navigate("/");
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

            {/* Selector de tipo de diploma */}
            <div className="selector-diploma">
                <button
                    className={`btn-tipo-diploma ${tipoDiploma === "infantil" ? "activo" : ""}`}
                    onClick={() => setTipoDiploma("infantil")}
                >
                    Diploma Infantil
                </button>
                <button
                    className={`btn-tipo-diploma ${tipoDiploma === "adultos" ? "activo" : ""}`}
                    onClick={() => setTipoDiploma("adultos")}
                >
                    Diploma Adultos
                </button>
            </div>

            {/* Vista previa del diploma */}
            {tipoDiploma && (
                <div className="preview-diploma">
                    <img
                        src={getPreviewUrl()}
                        alt="Vista previa"
                        className="diploma-img-animada"
                        onError={(e) =>
                            (e.target.src = `${import.meta.env.BASE_URL}assets/images/diploma_explorador.jpg`)}
                    />
                </div>
            )}

            {/* Botones de acción */}
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

            {mostrarPopup && <div className="popup-descarga">Diploma descargado con éxito</div>}
        </div>
    );
}

export default Final;
