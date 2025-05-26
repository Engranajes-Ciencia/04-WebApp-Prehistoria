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

    // Si ya hay una instancia en la ref, no crear una nueva.
    // Solo si el scanner ya está "clear" podemos intentar un nuevo render.
    if (!qrScannerRef.current) {
      qrScannerRef.current = new Html5QrcodeScanner(
        qrReaderId,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }, // Objeto para qrbox
          rememberLastUsedCamera: true,
        },
        false // Deshabilitar el botón de "Scan an Image File" por defecto si no lo necesitas
      );
      qrScannerRef.current.render(onScanSuccess, onScanError);
      setScanning(true); // Asegurarse de que el spinner esté visible al inicio
    } else {
      // Si el scanner ya existe (ej. el componente se remonta), solo asegúrate de que esté renderizado
      // y que el estado de escaneo sea correcto.
      if (qrScannerRef.current.getState() !== 2) { // 2 significa Html5QrcodeScanner.State.SCANNING
        qrScannerRef.current.render(onScanSuccess, onScanError);
        setScanning(true);
      }
    }


    //  Traducción automática de textos del scanner con MutationObserver 
    const translateScannerUI = () => {
      const translations = {
        "Scan QR Code": t("Escaner QR"),
        "Request Camera Permissions": t("Permisos camara"),
        "Scan an Image File": t("Escanear imagen"),
        "Stop Scanning": t("escaner.stopScanning"),
        "Camera permissions denied. Please reset permission and refresh the page.": t("escaner.cameraPermissionDenied"),
        "No camera found.": t("escaner.noCameraFound"),
        "Choose image - No image choosen": t("Cargar imagen"),
        // Añadir más traducciones 
      };

      const container = document.getElementById(qrReaderId);
      if (!container) return;

      const walkAndTranslate = (node) => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() in translations) {
          node.textContent = translations[node.textContent.trim()];
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          // Traducir atributos específicos si es necesario (ej. placeholder, title)
          if (node.placeholder && translations[node.placeholder]) {
            node.placeholder = translations[node.placeholder];
          }
          if (node.title && translations[node.title]) {
            node.title = translations[node.title];
          }
          // Recorrer hijos
          Array.from(node.childNodes).forEach(walkAndTranslate);
        }
      };

      walkAndTranslate(container);
    };

    // Observar cambios en el DOM del scanner para traducir dinámicamente
    observerRef.current = new MutationObserver((mutations) => {
      // Solo traducir si hay cambios en el DOM y el mensaje no está activo (para evitar re-traducciones constantes)
      if (!message) { // Solo traducir si no hay un mensaje modal activo
        translateScannerUI();
      }
    });

    // Pequeño delay para asegurar que el scanner esté en el DOM antes de observar
    const initObserverTimeout = setTimeout(() => {
      const container = document.getElementById(qrReaderId);
      if (container) {
        observerRef.current.observe(container, { childList: true, subtree: true, characterData: true });
        translateScannerUI(); // Traducción inicial
      }
    }, 500); // Aumentado el delay para mayor seguridad

    // Limpieza al desmontar el componente o al cambiar de idioma
    return () => {
      clearTimeout(initObserverTimeout);
      if (qrScannerRef.current) {
        qrScannerRef.current.clear().catch((err) => {
          console.error("Error al limpiar scanner en unmount:", err);
        });
        qrScannerRef.current = null; // Limpiar la ref al desmontar
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [onScanSuccess, onScanError, t, i18n.language, message]); // Añadimos 'message' a las dependencias del observer

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
          <p className="texto-escaneo">{t("escaneando")}</p> 
        </div>
      )}

      {/* MENSAJE PERSONALIZADO */}
      <MessageBox message={message} onClose={closeMessage} />
    </div>
  );
}

export default EscanerQR;