import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import actividades from "../../config/data/actividades.json";
import { marcarActividadComoCompletada } from "../../config/utils/localStorage";
import { validarAvatar, validarNombre } from "../../config/utils/validations";
import { useTranslation } from "react-i18next";
import "../../Styles/Pages/Actividad.css";

function Actividad() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation("pages");

    const actividad = actividades.find((a) => a.id === parseInt(id));
    const avatar = localStorage.getItem("avatar");
    const nombre = localStorage.getItem("nombre");
    const accesoQR = localStorage.getItem("accesoQR");

    // Constantes del audio
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleAudio = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch((e) => {
                console.warn("Autoplay bloqueado por el navegador", e);
            });
        }

        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        if (
            accesoQR !== "true" ||
            !validarNombre(nombre) ||
            !validarAvatar(avatar)
        ) {
            alert(t("actividad.accesoDenegado"));
            navigate("/EscanerQR");
            return;
        }

        marcarActividadComoCompletada(Number(id));
    }, [id, navigate, avatar, nombre, accesoQR]);

    if (!actividad || !avatar || !nombre) {
        return (
            <div
                className="actividad-container"
                style={{
                    backgroundImage: `url(${import.meta.env.BASE_URL}assets/images/nogenially/bienvenida.jpeg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                <p className="error-msg">{t("actividad.error")}</p>
            </div>
        );
    }

    const avatarImg = `${import.meta.env.BASE_URL}assets/avatars/${avatar}.png`;
    const fondo = actividad.imagenFondo || actividad.imagenAlternativa;
    const tieneGenially = actividad.geniallyURL && actividad.geniallyURL.trim() !== "" && actividad.geniallyURL !== "#";

    // Traducciones específicas de la parada
    const traduccionActividad = t(`${id}`, { returnObjects: true });

    return (
        <div
            className="actividad-container"
            style={{
                backgroundImage: `url(${fondo})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
        >
            <div className="saludo-titulo">
            <div className="titulo-mensaje">

            <h3>{traduccionActividad.titulo}</h3>

            {traduccionActividad.avatarDialogo.mensaje !== "#" && (
                <p>{traduccionActividad.avatarDialogo.mensaje}</p>
            )}
            </div>
            <div className="actividad-header">
                <img src={avatarImg} alt="avatar" className="avatar-actividad" />
                <div>
                    <h2 className="saludo1">{t("actividad.saludo", { nombre })}</h2>
                    <p className="dialogo">{traduccionActividad.avatarDialogo.dialogo}</p>
                </div>
            </div>
            
            
            </div>
            {actividad.audio && (
                <div className="audio-button-container">
                    <button onClick={toggleAudio} className="audio-button">
                        {isPlaying ? t("actividad.pausarAudio") : t("actividad.reproducirAudio")}
                    </button>
                    <audio
                        ref={audioRef}
                        src={`${import.meta.env.BASE_URL}${actividad.audio.replace(/^\/+/, "")}`}
                        preload="auto"
                    />
                </div>
            )}

            {traduccionActividad.avatarDialogo.sabiasQue !== "#" && (
                <p className="sabiasque">
                    <strong>{t("actividad.sabiasQue")}</strong> {traduccionActividad.avatarDialogo.sabiasQue}
                </p>
            )}

            {tieneGenially && (
                <div className="actividad-genially">
                    <iframe
                        src={actividad.geniallyURL}
                        width="100%"
                        height="500px"
                        frameBorder="0"
                        allowFullScreen
                        title="Genially actividad"
                    ></iframe>
                </div>
            )}
        </div>
    );
}

export default Actividad;

