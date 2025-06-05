import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import "../../Styles/Pages/Mapa.css";

const avatarMap = {
    explorador: `${import.meta.env.BASE_URL}assets/avatars/explorador.png`,
    exploradora: `${import.meta.env.BASE_URL}assets/avatars/exploradora.png`,
};

const avatarNameMap = {
    explorador: "Kushim",
    exploradora: "Enheduanna",
};

// Lista de paradas disponibles con URLs de QR
const paradasDisponibles = [
    
    { id: 1, nombre: "Parada1", qrUrl: "/04-WebApp-Prehistoria/images/qr/a1.png" },
    { id: 2, nombre: "Parada2", qrUrl: "/04-WebApp-Prehistoria/images/qr/a2.png" },
    { id: 3, nombre: "Parada3", qrUrl: "/04-WebApp-Prehistoria/images/qr/a3.png" },
    { id: 4, nombre: "Parada4", qrUrl: "/04-WebApp-Prehistoria/images/qr/a4.png" },
    { id: 5, nombre: "Parada5", qrUrl: "/04-WebApp-Prehistoria/images/qr/a5.png" },
    { id: 6, nombre: "Parada6", qrUrl: "/04-WebApp-Prehistoria/images/qr/a6.png" },
    { id: 7, nombre: "Parada7", qrUrl: "/04-WebApp-Prehistoria/images/qr/a7.png" },
    { id: 8, nombre: "Parada8", qrUrl: "/04-WebApp-Prehistoria/images/qr/a8.png" },
    { id: 9, nombre: "Parada9", qrUrl: "/04-WebApp-Prehistoria/images/qr/a9.png" },
    { id: 10, nombre: "Parada10", qrUrl: "/04-WebApp-Prehistoria/images/qr/a10.webp" },
    { id: 11, nombre: "Parada11", qrUrl: "/04-WebApp-Prehistoria/images/qr/a11.webp" },
    { id: 12, nombre: "Parada12", qrUrl: "/04-WebApp-Prehistoria/images/qr/a12.webp" },
    { id: 13, nombre: "Parada13", qrUrl: "/04-WebApp-Prehistoria/images/qr/a13.webp" },
    { id: 14, nombre: "Parada14", qrUrl: "/04-WebApp-Prehistoria/images/qr/a14.webp" },
    { id: 15, nombre: "Parada15", qrUrl: "/04-WebApp-Prehistoria/images/qr/a15.webp" },
    { id: 16, nombre: "Parada16", qrUrl: "/04-WebApp-Prehistoria/images/qr/a16.webp" },
    { id: 17, nombre: "Parada17", qrUrl: "/04-WebApp-Prehistoria/images/qr/a17.webp" },
    { id: 18, nombre: "Parada18", qrUrl: "/04-WebApp-Prehistoria/images/qr/a18.webp" },
    { id: 19, nombre: "Parada19", qrUrl: "/04-WebApp-Prehistoria/images/qr/a19.webp" },
    { id: 20, nombre: "Parada20", qrUrl: "/04-WebApp-Prehistoria/images/qr/a20.webp" }
];


function Mapa() {
    const { t } = useTranslation("pages");
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [avatar, setAvatar] = useState("");
    const [mostrarOpciones, setMostrarOpciones] = useState(false);

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

    // Función para descargar el QR automáticamente
    const descargarQR = (parada) => {
        const link = document.createElement("a");
        link.href = parada.qrUrl;
        link.download = `${parada.nombre}-QR.png`; // Nombre del archivo descargado
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="mapa-container">
            <div className="saludo">
                <h2>{t("mapa.saludo", { nombre })}</h2>

                <div className="guia">
                    <img src={avatarMap[avatar]} alt={avatar} className="avatar-mini" />
                    <div style={{ whiteSpace: 'pre-wrap' }}>
                        <Trans
                            i18nKey="mapa.dialogo"
                            ns="pages"
                            values={{ nombre, guia: avatarNameMap[avatar] }}
                            components={[<br />]}
                        />
                    </div>
                </div>

                <p>{t("mapa.instruccion")}</p>

                <div className="botones">
                    <button className="qr-button" onClick={() => navigate("/EscanerQR")}>
                        📷 {t("mapa.botonQR")}
                    </button>
                    <button className="volver-button" onClick={() => navigate("/Form")}>
                        🔙 {t("mapa.botonVolver")}
                    </button>
                    
                </div>

                {mostrarOpciones && (
                    <div className="seleccion-parada">
                        <h3>{t("mapa.seleccionQR")}</h3>
                        {paradasDisponibles.map((parada) => (
                            <button key={parada.id} onClick={() => descargarQR(parada)}>
                                {parada.nombre}
                            </button>
                        ))}
                        <button className="btn-cerrar" onClick={() => setMostrarOpciones(false)}>
                            {t("mapa.botonCerrar")}
                        </button>
                    </div>
                )}
            </div>
            <div className="fondo"></div>
        </div>
    );
}

export default Mapa;