import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef, useCallback } from "react";
import confetti from "canvas-confetti";
import { marcarModoSecretoDesbloqueado } from "../../config/utils/localStorage";
import "../../Styles/Pages/EscanerQR.css";

const MessageBox = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div className="message-box-overlay">
      <div className="message-box-content">
        <p>{message}</p>
        <button onClick={onClose} className="message-box-button">OK</button>
      </div>
    </div>
  );
};

function EscanerQR() {
  const { t } = useTranslation("pages");
  const navigate = useNavigate();

  const [scanning, setScanning] = useState(true);
  const [message, setMessage] = useState(null);
  const [mostrarOpciones, setMostrarOpciones] = useState(false);

  const qrScannerRef = useRef(null);

  const paradasDisponibles = Array.from({ length: 20 }, (_, i) => i + 1);

  const handleParadaClick = (id) => {
    setMostrarOpciones(false);
    triggerConfetti();
    localStorage.setItem("accesoQR", "true");
    navigate(`/actividad/${id}`);
  };

  const showMessage = useCallback((text) => {
    setMessage(text);
  }, []);

  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#79a981", "#fdd835", "#66bb6a", "#9b9b9b"],
    });
  }, []);

  const onScanSuccess = useCallback((decodedText) => {
    setScanning(false);
    const cleanText = decodedText.trim();
    let targetRoute = null;

    if (cleanText === "codigo-secreto") {
      marcarModoSecretoDesbloqueado();
      targetRoute = "/secreto";
      showMessage(t("escaner.codigoSecretoEncontrado"));
    } else if (cleanText.includes("/actividad/")) {
      const idPart = cleanText.split("/actividad/").pop();
      const activityId = parseInt(idPart);

      if (!isNaN(activityId) && activityId > 0) {
        targetRoute = `/actividad/${activityId}`;
        showMessage(t("escaner.qrActividadDetectado", { id: activityId }));
      } else {
        showMessage(t("escaner.qrInvalido"));
      }
    } else if (cleanText.startsWith("parada-")) {
      const idPart = cleanText.split("-")[1];
      const activityId = parseInt(idPart);

      if (!isNaN(activityId) && activityId > 0) {
        targetRoute = `/actividad/${activityId}`;
        showMessage(t("escaner.qrActividadDetectado", { id: activityId }));
      } else {
        showMessage(t("escaner.qrInvalido"));
      }
    } else {
      showMessage(t("escaner.qrInvalido"));
    }

    if (targetRoute) {
      triggerConfetti();
      localStorage.setItem("accesoQR", "true");

      if (qrScannerRef.current) {
        qrScannerRef.current.clear().catch(console.error);
      }

      setTimeout(() => navigate(targetRoute), 500);
    } else {
      if (qrScannerRef.current) {
        qrScannerRef.current.clear().catch(console.error);
      }
    }
  }, [navigate, showMessage, t, triggerConfetti]);

  const onScanError = useCallback((error) => {
    if (error.message?.includes("Permission denied")) {
      showMessage(t("escaner.permisoDenegado"));
    } else if (error.message?.includes("No camera found")) {
      showMessage(t("escaner.noCamaraEncontrada"));
    }
  }, [showMessage, t]);

  const closeMessage = useCallback(() => {
    setMessage(null);
    if (qrScannerRef.current && !scanning) {
      qrScannerRef.current.render(onScanSuccess, onScanError);
      setScanning(true);
    }
  }, [scanning, onScanSuccess, onScanError]);

  // Inicializa escáner y traduce textos una vez, y cada vez que cambia el idioma (t)
  useEffect(() => {
  const qrReaderId = "qr-reader";
  const container = document.getElementById(qrReaderId);

  if (!qrScannerRef.current) {
    qrScannerRef.current = new Html5QrcodeScanner(
      qrReaderId,
      { fps: 10, qrbox: { width: 250, height: 250 }, rememberLastUsedCamera: true },
      false
    );
    qrScannerRef.current.render(onScanSuccess, onScanError);
    setScanning(true);
  }

  // Traduce el botón de seleccionar archivo
  const fileSelectBtn = document.getElementById("html5-qrcode-button-file-selection");
  if (fileSelectBtn) {
    if (fileSelectBtn.innerText.trim() === "Choose image - No image choosen") {
      fileSelectBtn.innerText = t("scannerUI.chooseImage");
    }
    if (fileSelectBtn.innerText.trim() === "Choose Image") {
      fileSelectBtn.innerText = t("scannerUI.chooseImageButton");
    }
  }

  // Traduce el span "Scan an Image File"
  const scanTypeChangeSpan = document.getElementById("html5-qrcode-anchor-scan-type-change");
  if (scanTypeChangeSpan && scanTypeChangeSpan.innerText.trim() === "Scan an Image File") {
    scanTypeChangeSpan.innerText = t("scannerUI.scanImage");
  }

  // Traduce el botón "Request Camera Permissions"
  const cameraPermissionBtn = document.getElementById("html5-qrcode-button-camera-permission");
  if (cameraPermissionBtn && cameraPermissionBtn.innerText.trim() === "Request Camera Permissions") {
    cameraPermissionBtn.innerText = t("scannerUI.requestPermissions");
  }

  // Cleanup cuando desmonta
  return () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.clear().catch(err => console.error("Error clearing QR scanner:", err));
      qrScannerRef.current = null;
    }
  };
}, [onScanSuccess, onScanError, t]);


  return (
    <div className="scanner-container">
      <h2 className="scanner-title">{t("escaner.titulo")}</h2>

      <div className="no-qr-section">
        <button className="no-qr-button" onClick={() => setMostrarOpciones(!mostrarOpciones)}>
          {t("escaner.botonSinQr")}
        </button>

        {mostrarOpciones && (
          <div className="contenedor-paradas-scroll">
            <div className="grid-paradas">
              {paradasDisponibles.map((id) => (
                <button key={id} className="parada-button" onClick={() => handleParadaClick(id)}>
                  {t("escaner.paradaNumero", { id })}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div id="qr-reader" className="qr-reader-box" />

      {scanning && (
        <div className="spinner-container">
          <div className="spinner" />
          <p className="texto-escaneo">{t("escaner.escaneando")}</p>
        </div>
      )}

      <MessageBox message={message} onClose={closeMessage} />
    </div>
  );
}

export default EscanerQR;


