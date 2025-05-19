// src/Components/Pages/EscanerQR.jsx
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";
import i18n from "../../i18n/i18n";
import "../../Styles/Pages/EscanerQR.css";

function EscanerQR() {
  const { t } = useTranslation("pages");
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    const qrReaderId = "qr-reader";

    const scanner = new Html5QrcodeScanner(qrReaderId, {
      fps: 10,
      qrbox: 250,
      rememberLastUsedCamera: true,
    });


    const handleScan = (data) => {
      if (!data) return;

      // Si el QR escaneado es el código secreto:
      if (data === "codigo-secreto") {
        marcarModoSecretoDesbloqueado();     // ✔ Marca como desbloqueado
        navigate("/modo-secreto");           // ✔ Redirige a la pantalla especial
      }

      // Si es una parada normal:
      else if (data.startsWith("parada-")) {
        const id = data.split("-")[1];
        navigate(`/actividad/${id}`);
      }
    };

    
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
          alert(t("escaner.qrInvalido"));
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


    // 🌍 Traducción automática de textos del scanner con MutationObserver
    let observer;
    if (i18n.language === "es") {
      const translations = {
        "Scan QR Code": "Escanea el código QR",
        "Request Camera Permissions": "Solicitar permisos de cámara",
        "Scan an Image File": "Escanear desde imagen",
        "Stop Scanning": "Detener escaneo",
        "Camera permissions denied. Please reset permission and refresh the page.":
          "Permiso de cámara denegado. Por favor, revisa los ajustes y recarga la página.",
        "No camera found.": "No se encontró ninguna cámara.",
        "Choose image - No image choosen": "Cargar imagen",
      };

      const translateNode = (node) => {
        if (node.nodeType === 3) {
          const text = node.textContent.trim();
          if (translations[text]) {
            node.textContent = translations[text];
          }
        }
        node.childNodes?.forEach(translateNode);
      };

      const translateAll = () => {
        const container = document.getElementById(qrReaderId);
        if (container) translateNode(container);
      };

      observer = new MutationObserver(() => {
        translateAll();
      });

      setTimeout(() => {
        const container = document.getElementById(qrReaderId);
        if (container) {
          observer.observe(container, { childList: true, subtree: true });
          translateAll();
        }
      }, 200); // delay para asegurar que el scanner esté en el DOM
    }



    return () => {
      scanner
        .clear()
        .catch((err) => console.error(" Error al limpiar scanner", err));
      if (observer) observer.disconnect();
    };
  }, [navigate, i18n.language]);

  return (
    <div className="scanner-container">


      {/* TÍTULO */}
      <h2 className="scanner-title">{t("escaner.titulo")}</h2>

      {/*  ESCÁNER */}
      <div id="qr-reader" className="qr-reader-box"></div>
      
      
      {/* SPINNER */}
      {scanning && (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p className="texto-escaneo">{t("escaner.escaneando")}</p>
        </div>
      )}
    </div>
  );
}

export default EscanerQR;
