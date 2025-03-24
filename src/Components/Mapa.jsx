// src/Components/Mapa.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Mapa.css";

const avatarMap = {
    explorador: "/assets/avatars/explorador.png",
    exploradora: "/assets/avatars/exploradora.png",
};

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

                <div className="guia">
                    <img
                        src={avatarMap[avatar]}
                        alt={avatar}
                        className="avatar-mini"
                    />
                    <p>
                        Soy tu guía <strong>{avatar}</strong>. ¡Vamos a explorar juntos!
                    </p>
                </div>

                <p>Escanea un código QR o selecciona una actividad para comenzar.</p>

                <button className="qr-button" onClick={() => navigate("/EscanerQR")}> 
                    📷 Escanear Código QR
                </button>
            </div>
        </div>
    );
}

export default Mapa;
