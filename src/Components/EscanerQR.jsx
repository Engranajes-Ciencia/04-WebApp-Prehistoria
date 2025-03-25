
// src/Components/EscanerQR.jsx
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

function EscanerQR() {
    const navigate = useNavigate();

    useEffect(() => {
        
        const qrReaderElement = document.getElementById("qr-reader");
        if (!qrReaderElement) return;

        const scanner = new Html5QrcodeScanner("qr-reader", {
            fps: 10,
            qrbox: 250
        });

        scanner.render(
            (decodedText) => {
                console.log("QR detectado:", decodedText);
                scanner.clear().then(() => {
                    
                    const ruta = decodedText.startsWith("actividad/")
                        ? `/${decodedText}`
                        : `/actividad/${decodedText}`;

                    navigate(ruta);
                });
            },
            (error) => {
                console.warn("Escaneo fallido:", error);
            }
        );


        return () => {
            scanner.clear().catch((err) => console.error("Error al limpiar scanner", err));
        };
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h2>Escanea el código QR</h2>
            <div id="qr-reader" style={{ width: "100%" }}></div>
            <p>Apunta con la cámara al código QR de la actividad</p>
        </div>
    );
}

export default EscanerQR;

