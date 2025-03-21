// src/Components/Mapa.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./Mapa.css";

function Mapa() {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        const nombreGuardado = localStorage.getItem("nombre");
        const avatarGuardado = localStorage.getItem("avatar");

        if (!nombreGuardado || !avatarGuardado) {
            navigate("/");
            return;
        }

        setNombre(nombreGuardado);
        setAvatar(avatarGuardado);
    }, []);

    return (
        <div className="mapa-container">
            <div className="saludo">
                <h2>¡Hola {nombre}!</h2>
                <p>Soy tu guía {avatar}. ¡Vamos a explorar juntos!</p>
                <img
                    src={`/avatars/${avatar}.png`}
                    alt={avatar}
                    className="avatar-img"
                />
                <p>Escanea un código QR o selecciona una actividad para comenzar.</p>
            </div>
        </div>
    );
}

export default Mapa;
