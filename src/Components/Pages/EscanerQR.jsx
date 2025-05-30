import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef, useCallback } from "react";
import confetti from "canvas-confetti";
import i18n from "../../i18n/i18n";
import "../../Styles/Pages/EscanerQR.css";
import { marcarModoSecretoDesbloqueado } from "../../config/utils/localStorage";

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
  const observerRef = useRef(null);

  const paradasDisponibles = Array.from({ length: 20 }, (_, i) => i + 1);

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

  const handleParadaClick = (id) => {
    setMostrarOpciones(false);
    triggerConfetti();
    localStorage.setItem("accesoQR", "true");
    navigate(`/actividad/${id}`);
  };

  const onScanSuccess = useCallback(
    (decodedText) => {
      setScanning(false);
      const cleanText = decodedText.trim();
      let targetRoute = null;

      if (cleanText === "codigo-secreto") {
        marcarModoSecretoDesbloqueado();
        targetRoute = "/secreto";
        showMessage(t("Codigo secreto encontrado"));
      } else if (cleanText.includes("/actividad/")) {
        const urlParts = cleanText.split("/actividad/");
        const idPart = urlParts[urlParts.length - 1];
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
          qrScannerRef.current.clear().catch(() => { });
        }
        setTimeout(() => {
          navigate(targetRoute);
        }, 500);
      } else {
        if (qrScannerRef.current) {
          qrScannerRef.current.clear().catch(() => { });
        }
      }
    },
    [navigate, t, triggerConfetti, showMessage]
  );

  const onScanError = useCallback(
    (error) => {
      if (error.message && error.message.includes("Permission denied")) {
        showMessage(t("escaner.permisoDenegado"));
      } else if (error.message && error.message.includes("No camera found")) {
        showMessage(t("escaner.noCamaraEncontrada"));
      }
    },
    [showMessage, t]
  );

  const closeMessage = useCallback(() => {
    setMessage(null);
    if (qrScannerRef.current && !scanning) {
      qrScannerRef.current.render(onScanSuccess, onScanError);
      setScanning(true);
    }
  }, [scanning, onScanSuccess, onScanError]);

  useEffect(() => {
    const qrReaderId = "qr-reader";

    if (!qrScannerRef.current) {
      qrScannerRef.current = new Html5QrcodeScanner(
        qrReaderId,
        { fps: 10, qrbox: { width: 250, height: 250 }, rememberLastUsedCamera: true },
        false
      );
      qrScannerRef.current.render(onScanSuccess, onScanError);
      setScanning(true);
    } else {
      if (qrScannerRef.current.getState() !== 2) {
        qrScannerRef.current.render(onScanSuccess, onScanError);
        setScanning(true);
      }
    }

    const translateScannerUI = () => {
      const translations = {
        "Scan QR Code": t("Escaner QR"),
        "Request Camera Permissions": t("Permisos camara"),
        "Scan an Image File": t("Escanear imagen"),
        "Stop Scanning": t("escaner.stopScanning"),
        "Camera permissions denied. Please reset permission and refresh the page.": t("escaner.cameraPermissionDenied"),
        "No camera found.": t("escaner.noCameraFound"),
        "Choose image - No image choosen": t("Cargar imagen"),
      };

      const container = document.getElementById(qrReaderId);
      if (!container) return;

      const walkAndTranslate = (node) => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() in translations) {
          node.textContent = translations[node.textContent.trim()];
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.placeholder && translations[node.placeholder]) {
            node.placeholder = translations[node.placeholder];
          }
          if (node.title && translations[node.title]) {
            node.title = translations[node.title];
          }
          Array.from(node.childNodes).forEach(walkAndTranslate);
        }
      };

      walkAndTranslate(container);
    };

    observerRef.current = new MutationObserver(() => {
      if (!message) {
        translateScannerUI();
      }
    });

    const initObserverTimeout = setTimeout(() => {
      const container = document.getElementById(qrReaderId);
      if (container) {
        observerRef.current.observe(container, { childList: true, subtree: true, characterData: true });
        translateScannerUI();
      }
    }, 500);

    return () => {
      clearTimeout(initObserverTimeout);
      if (qrScannerRef.current) {
        qrScannerRef.current.clear().catch(() => { });
        qrScannerRef.current = null;
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [onScanSuccess, onScanError, t, i18n.language, message]);

  return (
    <div className="scanner-container">
      <h2 className="scanner-title">{t("escaner.titulo")}</h2>

      <div className="no-qr-section">
        <button className="no-qr-button" onClick={() => setMostrarOpciones(!mostrarOpciones)}>
          🚫 {t("escaner.botonSinQr")}
        </button>

        {mostrarOpciones && (
          <div className="contenedor-paradas-scroll">
            <p>{t("escaner.seleccionarParada") || "Selecciona una parada:"}</p>
            <div className="grid-paradas">
              {paradasDisponibles.map((id) => (
                <button key={id} className="parada-button" onClick={() => handleParadaClick(id)}>
                  Parada {id}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div id="qr-reader" className="qr-reader-box"></div>

      {scanning && (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p className="texto-escaneo">{t("escaneando")}</p>
        </div>
      )}

      <MessageBox message={message} onClose={closeMessage} />
    </div>
  );
}

export default EscanerQR;
