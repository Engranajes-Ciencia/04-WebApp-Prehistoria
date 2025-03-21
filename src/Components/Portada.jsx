// src/Components/Portada.jsx
import { useNavigate } from "react-router-dom";
import "./Portada.css";

function Portada() {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate("/form");
    };

    return (
        <div className="portada-container">
            <div className="contenido">
                <h1 className="titulo"> Aventura Prehistórica</h1>
                <p className="subtitulo">Explora, aprende y descubre en el Parque Jurásico Educativo</p>
                <button className="btn-aventura" onClick={handleStart}>
                    Empezar Aventura
                </button>
            </div>
        </div>
    );
}

export default Portada;
