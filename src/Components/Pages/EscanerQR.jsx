// src/Components/Pages/EscanerQR.jsx
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef, useCallback } from "react";
import confetti from "canvas-confetti";
import i18n from "../../i18n/i18n";
import "../../Styles/Pages/EscanerQR.css";
import { marcarModoSecretoDesbloqueado } from "../../config/utils/localStorage"; // Asumiendo que esta función existe


// Componente de Mensaje Personalizado 
const MessageBox = ({ message, onClose }) => {
  if (!message) return null; // No renderizar si no hay mensaje
  return (
    <div className="message-box-overlay">
      <div className="message-box-content">
        <p>{message}</p>
        <button onClick={onClose} className="message-box-button">
          OK
        </button>
      </div>
    </div>
  );
};

function EscanerQR() {
  const { t } = useTranslation("pages");
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(true); // Estado para controlar el spinner de escaneo
  const [message, setMessage] = useState(null); // Estado para el mensaje personalizado
  const qrScannerRef = useRef(null); // Ref para almacenar la instancia del scanner
  const observerRef = useRef(null); // Ref para el MutationObserver

  // Función para mostrar el mensaje personalizado
  const showMessage = useCallback((text) => {
    setMessage(text);
  }, []);

  // Función para disparar confeti
  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#79a981", "#fdd835", "#66bb6a", "#9b9b9b"],
    });
  }, []);

  // Lógica principal de escaneo de QR
  // DEBE DECLARARSE ANTES DE onScanError Y closeMessage
  const onScanSuccess = useCallback(
    (decodedText) => {
      // Detener el escaneo y ocultar el spinner inmediatamente
      setScanning(false);

      console.log("QR detectado:", decodedText);
      const cleanText = decodedText.trim();
      let targetRoute = null; // Ruta a la que navegaremos

      //  Manejo del código secreto
      if (cleanText === "codigo-secreto") {
        marcarModoSecretoDesbloqueado(); // Marca como desbloqueado
        targetRoute = "/secreto"; // Redirige a la pantalla especial
        showMessage(t("Codigo secreto encontrado")); // Mensaje para el usuario
      }
      //  Manejo de actividades 
      else if (cleanText.includes("/actividad/")) {
        const urlParts = cleanText.split("/actividad/");
        const idPart = urlParts[urlParts.length - 1]; // Obtener la última parte después de /actividad/
        const activityId = parseInt(idPart);

        if (!isNaN(activityId) && activityId > 0) {
          targetRoute = `/actividad/${activityId}`;
          showMessage(t("escaner.qrActividadDetectado", { id: activityId }));
        } else {
          showMessage(t("escaner.qrInvalido")); // QR de actividad mal formado
        }
      }
      // 3. Manejo de "parada-X"
      else if (cleanText.startsWith("parada-")) {
        const idPart = cleanText.split("-")[1];
        const activityId = parseInt(idPart);

        if (!isNaN(activityId) && activityId > 0) {
          targetRoute = `/actividad/${activityId}`;
          showMessage(t("escaner.qrActividadDetectado", { id: activityId }));
        } else {
          showMessage(t("escaner.qrInvalido")); // QR de parada mal formado
        }
      }
      // 4. Si no coincide con ningún patrón válido
      else {
        showMessage(t("escaner.qrInvalido"));
      }

      // Si se encontró una ruta válida, disparar confeti y navegar
      if (targetRoute) {
        triggerConfetti();
        localStorage.setItem("accesoQR", "true"); // Marcar acceso como válido SOLO si el QR es válido

        // Limpiar el scanner justo antes de navegar para asegurar la liberación de la cámara
        if (qrScannerRef.current) {
          qrScannerRef.current.clear().catch((err) => {
            console.error("Error al limpiar el scanner antes de navegar:", err);
          });
        }
        setTimeout(() => {
          navigate(targetRoute); // Navegar después de un breve delay para el confeti
        }, 500);
      } else {
        // Si el QR es inválido, el mensaje se mostrará y al cerrarlo se reanudará el escaneo
        // No reiniciamos el scanner aquí, se hará en `closeMessage`
        // También limpiamos el scanner si el QR no es válido para que la cámara no quede activa mientras el mensaje está abierto
        if (qrScannerRef.current) {
          qrScannerRef.current.clear().catch((err) => {
            console.error("Error al limpiar el scanner para QR inválido:", err);
          });
        }
      }
    },
    [navigate, t, triggerConfetti, showMessage]
  );

  // Manejo de errores de escaneo 
  const onScanError = useCallback(
    (error) => {
      // console.warn("Escaneo fallido:", error); // Para depuración
      if (error.message && error.message.includes("Permission denied")) {
        showMessage(t("escaner.permisoDenegado"));
      } else if (error.message && error.message.includes("No camera found")) {
        showMessage(t("escaner.noCamaraEncontrada"));
      }
    },
    [showMessage, t]
  );

  // Función para cerrar el mensaje personalizado
  const closeMessage = useCallback(() => {
    setMessage(null);
    // Después de cerrar el mensaje, si no hay una ruta de navegación, reiniciar escaneo
    
    if (qrScannerRef.current && !scanning) {
      qrScannerRef.current.render(onScanSuccess, onScanError);
      setScanning(true);
    }
  }, [scanning, onScanSuccess, onScanError]); 

  // Efecto para inicializar y limpiar el scanner
  useEffect(() => {
  const qrReaderId = "qr-reader";

  const container = document.getElementById(qrReaderId);

  const translations = {
    "Scan QR Code": t("scannerUI.scanQR"),
    "Request Camera Permissions": t("scannerUI.requestPermissions"),
    "Scan an Image File": t("scannerUI.scanImage"),
    "Stop Scanning": t("scannerUI.stopScanning"),
    "Camera permissions denied. Please reset permission and refresh the page.": t("scannerUI.permissionDenied"),
    "No camera found.": t("scannerUI.noCameraFound"),
    "Choose image - No image choosen": t("scannerUI.chooseImage")
  };

  // Traducción segura del DOM
  const walkAndTranslate = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const original = node.textContent.trim();
      const translated = translations[original];
      if (translated && node.textContent !== translated) {
        node.textContent = translated;
      }
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

  const translateScannerUI = () => {
    const container = document.getElementById(qrReaderId);
    if (container) {
      observerRef.current?.disconnect(); // Desactivar observer temporalmente
      walkAndTranslate(container);
      observerRef.current?.observe(container, { childList: true, subtree: true, characterData: true }); // Reactivar observer
    }
  };

  // Crear scanner si no existe
  if (!qrScannerRef.current) {
    qrScannerRef.current = new Html5QrcodeScanner(
      qrReaderId,
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        rememberLastUsedCamera: true
      },
      false
    );
    qrScannerRef.current.render(onScanSuccess, onScanError);
    setScanning(true);
  }

  // Configurar observer para traducir dinámicamente
  if (!observerRef.current && container) {
    observerRef.current = new MutationObserver(() => {
      if (!message) {
        translateScannerUI();
      }
    });

    observerRef.current.observe(container, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  // Traducción inicial tras pequeño delay
  const initialTranslateTimeout = setTimeout(() => {
    translateScannerUI();
  }, 500);

  // Limpieza
  return () => {
    clearTimeout(initialTranslateTimeout);
    if (qrScannerRef.current) {
      qrScannerRef.current.clear().catch((err) => {
        console.error("Error clearing QR scanner:", err);
      });
      qrScannerRef.current = null;
    }
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  };
}, [onScanSuccess, onScanError, t, i18n.language, message]);


  return (
    <div className="scanner-container"> 

      {/* TÍTULO */}
      <h2 className="scanner-title">{t("escaner.titulo")}</h2> 

      {/* ÁREA DEL ESCÁNER */}
      <div id="qr-reader" className="qr-reader-box"></div> 

      {/* SPINNER DE ESCANEO */}
      {scanning && (
        <div className="spinner-container"> 
          <div className="spinner"></div> 
          <p className="texto-escaneo">{t("escaner.escaneando")}</p> 
        </div>
      )}

      {/* MENSAJE PERSONALIZADO */}
      <MessageBox message={message} onClose={closeMessage} />
    </div>
  );
}

export default EscanerQR;