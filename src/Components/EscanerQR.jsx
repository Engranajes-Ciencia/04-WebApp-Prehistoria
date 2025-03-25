// src/Components/EscanerQR.jsx
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import "./EscanerQR.css";

function EscanerQR() {
    const navigate = useNavigate();
    const [scanning, setScanning] = useState(true);

    useEffect(() => {
        const qrReaderId = "qr-reader";

        const scanner = new Html5QrcodeScanner(qrReaderId, {
            fps: 10,
            qrbox: 250,
            rememberLastUsedCamera: true,
        });

        scanner.render(
            (decodedText) => {
                console.log(" QR detectado:", decodedText);
                setScanning(false); // ocultar feedback

                const cleanText = decodedText.trim();
                let ruta;

                if (cleanText.includes("/actividad/")) {
                    const index = cleanText.indexOf("/actividad/");
                    ruta = cleanText.substring(index); // devuelve: /actividad/1
                } else {
                    alert(" QR no válido. Asegúrate de que el QR contiene una URL con /actividad/número");
                    return;
                }


                scanner.clear().then(() => {
                    navigate(ruta);
                });
            },
            (error) => {
                console.warn(" Escaneo fallido:", error);
            }
        );


        return () => {
            scanner.clear().catch((err) =>
                console.error(" Error al limpiar scanner", err));
        };
    }, [navigate]);

    return (
        <div style={{ padding: 20, textAlign: "center" }}>
            <h2>Escanea el código QR</h2>
            <div id="qr-reader" style={{ width: "100%" }}></div>

            {scanning && (
                <div className="spinner-container">
                    <div className="spinner"></div>
                    <p style={{ marginTop: 10, fontStyle: "italic", color: "#666" }}>
                        Escaneando... apunta con la cámara al QR
                    </p>
                </div>
            )}
        </div>
    );
}

export default EscanerQR;

