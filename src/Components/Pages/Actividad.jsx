import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import actividades from "../../config/data/actividades.json";
import { marcarActividadComoCompletada } from "../../config/utils/localStorage";
import { validarAvatar, validarNombre } from "../../config/utils/validations";
import { useTranslation } from "react-i18next";
import "../../Styles/Pages/Actividad.css";

// Componente principal de la Actividad
function Actividad() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation("pages");

    // Usamos useMemo para evitar re-cálculos innecesarios de la actividad
    const actividad = useMemo(
        () => actividades.find((a) => a.id === parseInt(id)),
        [id]
    );

    const avatar = localStorage.getItem("avatar");
    const nombre = localStorage.getItem("nombre");
    const accesoQR = localStorage.getItem("accesoQR");

    // Constantes del audio
    // Constantes del audio para el primer botón 🇪🇸
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Callback para pausar el otro audio si uno empieza a sonar
    const pauseOtherAudio = useCallback((currentAudioRef) => {
        if (currentAudioRef === audioRef.current && audioAltRef.current && !audioAltRef.current.paused) {
            audioAltRef.current.pause();
            setIsAudioAltPlaying(false);
        } else if (currentAudioRef === audioAltRef.current && audioRef.current && !audioRef.current.paused) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }, []);


    const toggleAudio = useCallback(() => {
        if (!audioRef.current) return;

        pauseOtherAudio(audioRef.current); // Pausar el otro audio antes de reproducir este

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch((e) => {
                console.warn("Autoplay bloqueado por el navegador (audio principal):", e);
            });
        }
        setIsPlaying((prev) => !prev);
    }, [isPlaying, pauseOtherAudio]);


    // Constantes del audio para el segundo botón 🇬🇧
    const audioAltRef = useRef(null);
    const [isAudioAltPlaying, setIsAudioAltPlaying] = useState(false);

    const toggleAudioAlt = useCallback(() => {
        if (!audioAltRef.current) return;

        pauseOtherAudio(audioAltRef.current); // Pausar el otro audio antes de reproducir este

        if (isAudioAltPlaying) {
            audioAltRef.current.pause();
        } else {
            audioAltRef.current.play().catch((e) => {
                console.warn("Autoplay bloqueado por el navegador (audio alternativo):", e);
            });
        }
        setIsAudioAltPlaying((prev) => !prev);
    }, [isAudioAltPlaying, pauseOtherAudio]);

    // Effect para manejar el acceso y marcar la actividad
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
        // Solo marcar como completada si la actividad existe
        if (actividad) {
            marcarActividadComoCompletada(Number(id));
        }
    }, [id, navigate, avatar, nombre, accesoQR, actividad, t]);

    // Efecto para pausar los audios al desmontar o cambiar de actividad
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
            if (audioAltRef.current) {
                audioAltRef.current.pause();
                setIsAudioAltPlaying(false);
            }
        };
    }, [id]); // Dependencia del ID para resetear al cambiar de actividad



    // Lógica para construir URLs de assets
    const getAssetUrl = useCallback((path) => {
        if (!path) return ''; // Retorna vacío si la ruta es nula o indefinida
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        const fullUrl = `${import.meta.env.BASE_URL}${cleanPath}`;
        console.log(`[DEBUG] URL de asset: ${fullUrl}`); 
        return fullUrl;
    }, []); 
    

    // Manejo de estados de carga y error (renderizado condicional temprano)
    if (!actividad) {
        // Si la actividad no se encuentra (ID inválido o no existe)
        return (
            <div
                className="actividad-container" // Manteniendo tu clase original
                style={{
                    // Usamos una imagen de fallback segura para el error
                    backgroundImage: `url("${getAssetUrl("assets/images/nogenially/error-default.jpeg")}")`, // Asume que tienes una imagen de error
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed", // Para un efecto paralax ligero
                }}
            >
                <p className="error-msg">{t("actividad.errorActividadNoEncontrada")}</p>
                <button className="btn-volver-mapa" onClick={() => navigate("/")}> {/* Volver al inicio si hay un error grave */}
                    {t("actividad.volverInicio")}
                </button>
            </div>
        );
    }

    if (!avatar || !nombre) {
        // Si falta el avatar o nombre (aunque useEffect ya redirigiría)
        return (
            <div
                className="actividad-container" 
                style={{
                    backgroundImage: `url("${getAssetUrl("assets/images/nogenially/acceso-denegado.jpeg")}")`, // Otra imagen de fallback
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                }}
            >
                <p className="error-msg">{t("actividad.accesoDenegado")}</p>
                <button className="btn-volver-mapa" onClick={() => navigate("/")}> 
                    {t("actividad.volverInicio")}
                </button>
            </div>
        );
    }

    // URL para el fondo de imagen de la actividad
    const fondoImageUrl = getAssetUrl(actividad.imagenFondo || actividad.imagenAlternativa);

    // URL para el avatar
    const avatarImgSrc = getAssetUrl(`assets/avatars/${avatar}.png`);

    // Comprobación de Genially
    const tieneGenially = actividad.geniallyURL && actividad.geniallyURL.trim() !== "" && actividad.geniallyURL !== "#";

    // Traducciones específicas de la parada
    // Usamos useMemo para evitar re-cálculos innecesarios de las traducciones
    const traduccionActividad = useMemo(() => t(`${id}`, { returnObjects: true }), [id, t]);


    // Renderizado del componente principal
    return (
        <div
            className="actividad-container" 
            style={{
                backgroundImage: `url("${fondoImageUrl}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed", // Para un efecto paralax ligero o simplemente que la imagen no se mueva con el scroll
            }}
        >
            <div className="saludo-titulo"> 
                <div className="titulo-mensaje"> 
                    <h3>{traduccionActividad.titulo}</h3>

                    {/* Optional chaining para evitar errores si avatarDialogo no existe o no tiene mensaje */}
                    {traduccionActividad.avatarDialogo?.mensaje && traduccionActividad.avatarDialogo.mensaje !== "#" && (
                        <p>{traduccionActividad.avatarDialogo.mensaje}</p>
                    )}
                </div>
                <div className="actividad-header"> 
                    <img src={avatarImgSrc} alt={t("altText.avatar")} className="avatar-actividad" /> 
                    <div>
                        <h2 className="saludo1">{t("actividad.saludo", { nombre })}</h2> 
                        {traduccionActividad.avatarDialogo?.dialogo && (
                            <p className="dialogo">{traduccionActividad.avatarDialogo.dialogo}</p> 
            )}
                    </div>
                </div>
            </div>

            {/* Controles de audio */}
            {actividad.audio && (
                <div className="audio-button-container"> 
                    {/* Botón para el audio principal (Español) */}
                    <button
                        onClick={toggleAudio}
                        className={`audio-button ${isPlaying ? "playing" : ""}`} 
                        aria-label={isPlaying ? t("actividad.pausarAudio") : t("actividad.reproducirAudio")}
                    >
                        <i className={`fa-solid ${isPlaying ? "fa-pause" : "fa-play"}`}></i> {isPlaying ? t("actividad.pausarAudio") : t("actividad.reproducirAudio")}
                    </button>
                    <audio
                        ref={audioRef}
                        src={getAssetUrl(actividad.audio)} // Usar getAssetUrl para audios
                        preload="auto"
                        onEnded={() => setIsPlaying(false)} // Resetear estado cuando el audio termina
                    />

                    {/* Botón para el audio alternativo (Inglés) */}
                    {actividad.audioENG && (
                        <>
                            <button
                                onClick={toggleAudioAlt}
                                className={`audio-button-alt ${isAudioAltPlaying ? "playing" : ""}`} 
                                aria-label={isAudioAltPlaying ? t("actividad.pausarAudioENG") : t("actividad.reproducirAudioENG")}
                            >
                                <i className={`fa-solid ${isAudioAltPlaying ? "fa-pause" : "fa-play"}`}></i> {isAudioAltPlaying ? t("actividad.pausarAudioENG") : t("actividad.reproducirAudioENG")}
                            </button>
                            <audio
                                ref={audioAltRef}
                                src={getAssetUrl(actividad.audioENG)} // Usar getAssetUrl para audios
                                preload="auto"
                                onEnded={() => setIsAudioAltPlaying(false)} // Resetear estado cuando el audio termina
                            />
                        </>
                    )}
                </div>
            )}

            {/* Sección "Sabías Qué" */}
            {traduccionActividad.avatarDialogo?.sabiasQue && traduccionActividad.avatarDialogo.sabiasQue !== "#" && (
                <p className="sabiasque"> 
                    <strong>{t("actividad.sabiasQue")}</strong>{" "}
                    {traduccionActividad.avatarDialogo.sabiasQue}
                </p>
            )}

            {/* Contenido principal: Genially o Botón de siguiente QR */}
            {tieneGenially ? (
                <div className="actividad-genially"> 
                    <iframe
                        src={actividad.geniallyURL}
                        width="100%"
                        height="clamp(300px, 70vh, 700px)" // Altura responsiva con clamp
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        loading="lazy" // Carga diferida del iframe
                    ></iframe>
                </div>

            ) : ( // Si NO tiene Genially, muestra el botón para el siguiente QR
                <div className="actividad-siguiente"> 
                    
                </div>
            )}

            {/* Botón para volver a la pantalla "entre-actividad" */}
            <div className="navigation-footer"> 
                <button className="btn-volver" onClick={() => navigate("/entre-actividad")}> 
                    <i className="fa-solid fa-map-location-dot"></i> {t("actividad.verMapaActividad")}
                </button>
            </div>

        </div>
    );
}

export default Actividad;