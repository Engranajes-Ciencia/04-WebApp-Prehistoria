import { useNavigate } from "react-router-dom";
import "../Styles/ModoJuego.css";

function Mododejuego() {
    const navigate = useNavigate();

    const handleChoice = (choice) => {
        if (choice === "solo") {
            navigate("/portada");
        } else if (choice === "grupos") {
            navigate("/portada");
        }
    };

    return (
        <div className="modojuego-container">
            <h1 className="titulo">Elige tu estilo de juego</h1>
            <p className="subtitulo">¿Exploras solo o acompañado?</p>
            <div className="opciones">
                <button
                    className="btn-opcion"
                    onClick={() => handleChoice("solo")}
                    style={{
                        backgroundImage: `url(${import.meta.env.BASE_URL}assets/images/solo.jpg)`
                    }}
                >
                    <span>Modo Solo</span>
                </button>
                <button
                    className="btn-opcion"
                    onClick={() => handleChoice("grupos")}
                    style={{
                        backgroundImage: `url(${import.meta.env.BASE_URL}assets/images/grupo.jpg)`
                    }}

                >
                    <span>Grupo</span>
                </button>
            </div>
        </div>
    );
}

export default Mododejuego;
