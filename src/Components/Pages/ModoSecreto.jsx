import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Pages/ModoSecreto.css";
import { useTranslation } from 'react-i18next';
import { getActividadesCompletadas } from "../../config/utils/localStorage";
import { ROUTES } from '../../config/routes/routerConfig';
import confetti from "canvas-confetti";


const TOTAL_ACTIVIDADES = 20;

function ModoSecreto() {
    const { t } = useTranslation('pages');
    const [mostrarModal, setMostrarModal] = useState(true);
    const [tiempo, setTiempo] = useState(60);
    const navigate = useNavigate();
    const [showButton, setShowButton] = useState(false); // Para mostrar el botón después del temporizador
    const confettiCanvasRef = useRef(null); // Ref para el canvas de confeti


    // Función auxiliar para construir URLs de assets de forma segura (para GitHub Pages)
    const getAssetUrl = useCallback((path) => {
        if (!path) return '';
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        const fullUrl = `${import.meta.env.BASE_URL}${cleanPath}`;
        return fullUrl;
    }, []);

    // Función para manejar la navegación final basada en el progreso del juego
    const handleNavigation = useCallback(() => {
        // Obtenemos las actividades completadas del localStorage
        const actividadesCompletadas = getActividadesCompletadas();
        const numActividadesCompletadas = actividadesCompletadas.length;

        if (numActividadesCompletadas >= TOTAL_ACTIVIDADES) {
            // Si ya se completaron todas las actividades regulares, redirigir a la página final
            navigate(ROUTES.FINAL);
        } else {
            // Si aún quedan actividades regulares por completar, redirigir a la pantalla entre-actividad
            navigate(ROUTES.ENTREACTIVIDADES);
        }
    }, [navigate]); // t no es necesario en las dependencias de useCallback aquí

    // Efecto para el temporizador principal de la actividad secreta
    useEffect(() => {
        let interval;
        // El temporizador solo se inicia si el modal inicial ya no se muestra y el tiempo es mayor a 0
        if (!mostrarModal && tiempo > 0) {
            interval = setInterval(() => {
                setTiempo((prev) => prev - 1);
            }, 1000);
        } else if (tiempo === 0) {
            // Cuando el tiempo llega a 0, mostramos el botón para continuar
            setShowButton(true);
        }

        return () => clearInterval(interval); // Limpia el temporizador al desmontar o al cambiar las dependencias
    }, [mostrarModal, tiempo]); // Depende de 'mostrarModal' (para iniciar) y 'tiempo' (para detener)

    // Efecto para controlar la visibilidad del modal inicial de felicitación
    useEffect(() => {
        // El modal se oculta automáticamente después de 4 segundos
        const timer = setTimeout(() => setMostrarModal(false), 4000);
        return () => clearTimeout(timer); // Limpia el timeout si el componente se desmonta
    }, []);

    // Efecto para disparar el confeti cuando el modal inicial se muestra
    useEffect(() => {
        if (mostrarModal && confettiCanvasRef.current) {
            const myConfetti = confetti.create(confettiCanvasRef.current, {
                resize: true,
                useWorker: true,
            });
            myConfetti({
                particleCount: 200,
                spread: 70,
                origin: { y: 0.6 },
                colors: ["#79a981", "#fdd835", "#66bb6a", "#9b9b9b"],
            });
        }
    }, [mostrarModal]); // Se ejecuta cuando 'mostrarModal' cambia a true


    return (
        <div className="modo-secreto-container">
            {/* Canvas para los fuegos artificiales de confeti */}
            <canvas id="confetti-canvas" className="canvas-confetti" ref={confettiCanvasRef}></canvas>

            {mostrarModal ? (
                // Modal inicial de felicitación
                <div className="modal-secreto">
                    <img
                        src={getAssetUrl("assets/images/cofreCerrado.png")} 
                        alt={t("modoSecreto.CofreCerrado")} 
                        className="cofre-img"
                    />
                    <h2>🎉 {t("modoSecreto.¡Enhorabuena!")}</h2>
                    <p>{t("modoSecreto.Has encontrado el código secreto del parque.")}</p>
                    <p>{t("modoSecreto.Una actividad especial te espera..")}</p>
                </div>
            ) : (
                // Contenido principal del modo secreto con el Genially y el temporizador
                <div className="contenido-secreto">
                    <img
                        src={getAssetUrl("assets/images/cofreAbierto.png")} 
                        alt={t("modoSecreto.CofreAbierto")}
                        className="cofre-img"
                    />
                        <h1>🔓 {t("modoSecreto.¡Modo Secreto Desbloqueado!")}</h1>
                        <p>
                            {tiempo > 0
                                ? t('modoSecreto.mensajeConteoRegresivo', { 
                                    time: tiempo, // La variable 'tiempo' de React se pasa como 'time' a i18next
                                    components: {
                                        1: <strong />, // Esto envuelve el valor de 'time' con <strong>
                                    },
                                })
                                : t('modoSecreto.tiempoTerminado') 
                            }
                        </p>


                    <div className="genially-container">
                        <iframe
                            title={t("modoSecreto.actividad-secreta")}
                            src="https://view.genially.com/67f8fda123c430f481ddb5e6/interactive-content-actividad-8"
                            width="100%"
                            height="clamp(600px, 85vh, 800px)" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            frameBorder="0"
                            loading="lazy" 
                        ></iframe>
                    </div>

                    {/* Mostrar el botón de continuar solo cuando el tiempo se agota */}
                    {showButton && (
                        <button onClick={handleNavigation} className="btn-volver"> 
                                {t("modoSecreto.⏳ Tiempo agotado — Volver")}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default ModoSecreto;