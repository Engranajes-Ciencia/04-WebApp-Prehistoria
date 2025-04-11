// src/Components/Commons/Medalla.jsx
import React from "react";
import "../../Styles/Commons/Medalla.css";  

const Medalla = ({ id, completada }) => {
    // Se utiliza una clase CSS diferente según si la medalla está completada o no
    const medallaClass = completada ? "medalla-completa" : "medalla-gris";

    return (
        <td className="medalla">
            <img
               src={`${import.meta.env.BASE_URL}assets/images/imagesMedal/medalla${id}.png`}
                alt={`Medalla ${id}`}
                className={`medalla-img ${medallaClass}`}
            />
        </td>
    );
};

export default Medalla;