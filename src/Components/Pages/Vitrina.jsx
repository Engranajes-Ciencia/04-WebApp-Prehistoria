// src/Components/Pages/Vitrina.jsx
import React from "react";
import "../../Styles/Pages/Vitrina.css";
import Medalla from "../Commons/Medalla";
import { useNavigate } from "react-router-dom";

const Vitrina = () => {
    const medallas = [
        "medalla1.png",
        "medalla2.png",
        "medalla3.png",
        "medalla4.png",
        "medalla5.png",
        "medalla6.png",
        "medalla7.png",
        "medalla8.png",
        "medalla9.png",
        "medalla10.png"
    ];

const navigate = useNavigate();

    // Obtener actividades completadas del localStorage
    const completadas = JSON.parse(localStorage.getItem("actividadesCompletadas")) || [];

    return (
        <div className="vitrina-container">
            <h1>Estas son tus medallas</h1>

            <div className="vitrina-marco">
                <div className="vitrina-tabla">
                    <table>
                        <tbody>
                            {[0, 5].map((rowStart) => (
                                <tr key={rowStart}>
                                    {medallas.slice(rowStart, rowStart + 5).map((medalla, index) => {
                                        const medallaId = rowStart + index + 1;
                                        const estaCompletada = completadas.includes(medallaId);

                                        return (
                                            <Medalla
                                                key={medallaId}
                                                id={medallaId}
                                                completada={estaCompletada}
                                            />
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <button className="btn-back" onClick={() => navigate('/entre-actividad')}>Volver</button>
        </div>
    );
};

export default Vitrina;
