import React from "react";
import { useNavigate } from "react-router-dom"

const Vitrina = () => {
    return (
        <div style={{ textAlign: "center", margin: "20px" }}>
            <h1>Estas son tus medallas</h1>
            <img
                src={`${import.meta.env.PUBLIC_URL}/assets/images/imagesMedal/medalla1.png`}
                alt="Medalla 1 "
                style={{ width: "300px", height: "auto", borderRadius: "8px" }}
            />
        </div>
    );
};

export default Vitrina;