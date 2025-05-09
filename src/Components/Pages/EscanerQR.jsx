// src/Components/Pages/EscanerQR.jsx
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import "../../Styles/Pages/EscanerQR.css";

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
          alert(
            " QR no válido. Asegúrate de que el QR contiene una URL con /actividad/número"
          );
          return;
        }

        //  confeti al validar QR
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.6 },
          colors: ["#79a981", "#fdd835", "#66bb6a", "#9b9b9b"],
        });

        //  Marcamos acceso como válido
        localStorage.setItem("accesoQR", "true");

        setTimeout(() => {
          scanner.clear().then(() => {
            navigate(ruta);
          });
        }, 100); // Pequeño delay para asegurar que localStorage se guarde
      },
      (error) => {
        console.warn("Escaneo fallido:", error);
      }
    );

    return () => {
      scanner
        .clear()
        .catch((err) => console.error(" Error al limpiar scanner", err));
    };
  }, [navigate]);

  return (
    <div
      className="scanner-container"
      style={{ padding: 20, textAlign: "center" }}
    >
      <h2>Escanea el código QR</h2>
      <div
        id="qr-reader"
        style={{
          width: "40%",
          height: "40%",
          background: "white",

          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          borderRadius: "10px",
        }}
      ></div>
      
      
      
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
