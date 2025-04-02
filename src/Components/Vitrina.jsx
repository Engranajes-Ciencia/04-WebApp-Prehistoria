import React from "react";
import "../styles/Vitrina.css"; 

const Vitrina = () => {

    const medallas = [
        "medalla1.jpg",
        "medalla2.jpg",
        "medalla3.jpg",
        "medalla4.jpg",
        "medalla5.jpg",
        "medalla6.jpg",
        "medalla7.jpg",
        "medalla8.jpg",
        "medalla9.jpg",
        "medalla10.jpg"
    ];

    return (
        <div className="vitrina-container">
            <h1>Estas son tus medallas</h1>
            
            {/* Contenedor principal con imagen de fondo */}
            <div className="vitrina-marco">
                
                {/* Contenedor de la tabla con medallas */}
                <div className="vitrina-tabla">
                    <table>
                        <tbody>
                            <tr>
                                {medallas.slice(0, 5).map((medalla, index) => (
                                    <td key={index} className="medalla">
                                        <img
                                            src={`${import.meta.env.BASE_URL}assets/images/imagesMedal/${medalla}`}
                                            alt={`Medalla ${index + 1}`}
                                            className="medalla-img"
                                        />
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                {medallas.slice(5, 10).map((medalla, index) => (
                                    <td key={index + 5} className="medalla">
                                        <img
                                            src={`${import.meta.env.BASE_URL}assets/images/imagesMedal/${medalla}`}
                                            alt={`Medalla ${index + 6}`}
                                            className="medalla-img"
                                        />
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Vitrina;
