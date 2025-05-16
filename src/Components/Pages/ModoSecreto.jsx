import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Pages/ModoSecreto.css";
import { marcarActividadComoCompletada } from "../../config/utils/localStorage";
import confetti from "canvas-confetti";

function ModoSecreto() {
    const [mostrarModal, setMostrarModal] = useState(true);
    const [tiempo, setTiempo] = useState(60);
    const navigate = useNavigate();


    // Guardar como completada en localStorage si no estaba ya
    useEffect(() => {
        marcarActividadComoCompletada("secreto");
    }, []);


    useEffect(() => {
        if (mostrarModal) {
            confetti.create(document.getElementById("confetti-canvas"), {
                resize: true,
                useWorker: true,
            })({
                particleCount: 200,
                spread: 70,
                origin: { y: 0.6 },
            });
        }
    }, [mostrarModal]);



    // Contador
    useEffect(() => {
        let interval;
        if (!mostrarModal && tiempo > 0) {
            interval = setInterval(() => {
                setTiempo((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [mostrarModal, tiempo]);

    // Ocultar modal después de 4 segundos
    useEffect(() => {
        const timer = setTimeout(() => setMostrarModal(false), 4000);
        return () => clearTimeout(timer);
    }, []);



    return (
        <div className="modo-secreto-container">
            {/* Fuegos artificiales con canvas */}
            <canvas id="confetti-canvas" className="canvas-confetti"></canvas>

            {mostrarModal ? (
                <div className="modal-secreto">
                    <img
                        src="/assets/images/cofreCerrado.png"
                        alt="Cofre cerrado"
                        className="cofre-img"
                    />
                    <h2>🎉 ¡Enhorabuena!</h2>
                    <p>Has encontrado el código secreto del parque.</p>
                    <p>Una actividad especial te espera...</p>
                </div>
            ) : (
                <div className="contenido-secreto">
                    <img
                        src="/assets/images/cofreAbierto.png"
                        alt="Cofre abierto"
                        className="cofre-img"
                    />
                    <h1>🔓 ¡Modo Secreto Desbloqueado!</h1>
                    <p>Tienes <strong>{tiempo}</strong> segundos para completar la actividad especial:</p>

                    <div className="genially-container">
                        <iframe
                            title="actividad-secreta"
                            src="https://view.genially.com/xxxx" // CAMBIAR
                            width="100%"
                            height="600"
                            allowFullScreen
                            frameBorder="0"
                        ></iframe>
                    </div>

                    {tiempo <= 0 && (
                        <button onClick={() => navigate("/")} className="btn-volver">
                            ⏳ Tiempo agotado — Volver al inicio
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default ModoSecreto;
