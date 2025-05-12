// src/Components/Pages/Mapa.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Pages/Mapa.css";

const avatarMap = {
    explorador: `${import.meta.env.BASE_URL}assets/avatars/explorador.png`,
    exploradora: `${import.meta.env.BASE_URL}assets/avatars/exploradora.png`,
};

const avatarNameMap = {
    explorador: "Kushim",
    exploradora: "Enheduanna",
}


function Mapa() {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [avatar, setAvatar] = useState("");

    useEffect(() => { 
        const nombreGuardado = localStorage.getItem("nombre");
        const avatarGuardado = localStorage.getItem("avatar");

        console.log("nombreGuardado:", nombreGuardado);
        console.log("avatarGuardado", avatarGuardado);

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
                <h2>¡Saludos {nombre}!</h2>

                <div className="guia">
                    <img
                        src={avatarMap[avatar]}
                        alt={avatar}
                        className="avatar-mini"
                    />
                    <p>
                        Yo ser guía <strong>{avatarNameMap[avatar]}</strong>. Tú seguir <strong>{avatarNameMap[avatar]}</strong>. <br/><br/><strong>{nombre}</strong> tener prendas raras. <br/> <br/>¿<strong>{nombre}</strong> no ser de aquí?<br/> <br/>No importar,<br/><br/> ¡<strong>{nombre}</strong> y <strong>{avatarNameMap[avatar]}</strong> explorar tierras!
                    </p>
                </div>

                <p>Escanea un código QR o selecciona una actividad para comenzar.</p>

                <div className="botones">
                <button className="qr-button" onClick={() => navigate("/EscanerQR")}> 
                    📷 Escanear Código QR
                </button>
                <button className="volver-button" onClick={() => navigate("/Form")}> 
                    🔙Volver
                </button>
                </div>
                
            </div>
            <div className="fondo"></div>
        </div>
 
    );
}

export default Mapa;
