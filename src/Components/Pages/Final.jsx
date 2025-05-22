import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { resetActividadesCompletadas } from "../../config/utils/localStorage";
import { jsPDF } from "jspdf";
import confetti from "canvas-confetti";
import "../../Styles/Pages/Final.css";
import { useTranslation } from "react-i18next";

function Final() {
  const { t } = useTranslation("pages");
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");
  const [nombre, setNombre] = useState("");
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [tipoDiploma, setTipoDiploma] = useState(null); // "infantil" o "adultos"

  // 👉 POSICIONES AJUSTABLES PARA EL TEXTO
  const POSICION_NOMBRE_INFANTIL = { x: 100, y: 117 }; // 👈 Aquí cambias la posición del nombre en diploma infantil
  const POSICION_NOMBRE_ADULTOS = { xOffset: 0, y: 117 }; // 👈 Aquí ajustas el desplazamiento y la altura en diploma adultos

  useEffect(() => {
    const avatarGuardado = localStorage.getItem("avatar");
    const nombreGuardado = localStorage.getItem("nombre");

    if (avatarGuardado) setAvatar(avatarGuardado);
    if (nombreGuardado) setNombre(nombreGuardado);

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#79a981", "#fdd835", "#66bb6a"],
    });
  }, []);

  const handleDescargarDiploma = () => {
    if (!tipoDiploma) {
      alert(t("final.alertaSelecciona"));
      return;
    }

    const doc = new jsPDF({ orientation: "landscape" });
    const nombreValue = nombre || "Explorador/a";
    let imagePath =
      tipoDiploma === "infantil"
        ? `${import.meta.env.BASE_URL}assets/images/diplomainfantil.png`
        : `${import.meta.env.BASE_URL}assets/images/diploma.jpg`;

    const img = new Image();
    img.src = imagePath;

    img.onload = () => {
      doc.addImage(img, "JPEG", 10, 10, 277, 190);

      // Fuente y tamaño
      doc.setFont("helvetica", "italic");
      doc.setFontSize(35);

      if (tipoDiploma === "infantil") {
        doc.text(
          nombreValue,
          POSICION_NOMBRE_INFANTIL.x,
          POSICION_NOMBRE_INFANTIL.y
        );
      } else if (tipoDiploma === "adultos") {
        const pageWidth = doc.internal.pageSize.width;
        const textWidth = doc.getTextWidth(nombreValue);
        const posX =
          (pageWidth - textWidth) / 2 + POSICION_NOMBRE_ADULTOS.xOffset;
        doc.text(nombreValue, posX, POSICION_NOMBRE_ADULTOS.y);
      }

      doc.save("diploma-aventura-prehistorica.pdf");
      setMostrarPopup(true);
      setTimeout(() => setMostrarPopup(false), 5000);
    };

    img.onerror = () => {
      alert(t("final.alertaNoCargaImagen"));
    };
  };

  const getPreviewUrl = () => {
    return tipoDiploma === "infantil"
      ? `${import.meta.env.BASE_URL}assets/images/diplomainfantil.png`
      : `${import.meta.env.BASE_URL}assets/images/diploma.jpg`;
  };

  const handleReiniciarJuego = () => {
    localStorage.clear();
    resetActividadesCompletadas();
    navigate("/");
  };

  return (
    <div className="final-container">
      <h1 className="titulo-final">🎉 {t("final.enhorabuena")}</h1>

      <div className="barra-progreso-final">
        <div className="relleno-final">{t("final.completado")}</div>
      </div>

      <div className="nombre-avatar">
        <img
          src={`${import.meta.env.BASE_URL}assets/avatars/${
            avatar || "explorador"
          }.png`}
          alt={avatar}
          className="avatar-mini-final"
        />
        <span className="nombre-final">
          {nombre || t("final.nombreDefault")} – {t(`final.${avatar}`)}
        </span>
      </div>

      <p className="subtitulo-final">{t("final.paradasCompletadas")}</p>

      <div className="selector-diploma">
        <button
          className={`btn-tipo-diploma ${
            tipoDiploma === "infantil" ? "activo" : ""
          }`}
          onClick={() => setTipoDiploma("infantil")}
        >
          {t("final.diplomaInfantil")}
        </button>
        <button
          className={`btn-tipo-diploma ${
            tipoDiploma === "adultos" ? "activo" : ""
          }`}
          onClick={() => setTipoDiploma("adultos")}
        >
          {t("final.diplomaAdulto")}
        </button>
      </div>

      {tipoDiploma && (
        <div className="preview-diploma">
          <img
            src={getPreviewUrl()}
            alt="Vista previa"
            className="diploma-img-animada"
            onError={(e) =>
              (e.target.src = `${
                import.meta.env.BASE_URL
              }assets/images/diplomainfantil.png`)
            }
          />
        </div>
      )}

      <div className="acciones-finales">
        <button className="btn-descargar" onClick={handleDescargarDiploma}>
          {t("final.descarga")}
        </button>
        <button className="btn-reiniciar" onClick={handleReiniciarJuego}>
          {t("final.reiniciar")}
        </button>

        {/* muestra  vitrina */}
        <button
          className="btn-vitrina"
          onClick={() => navigate("/vitrina-virtual")}
        >
          {t("final.galeria")}
        </button>
      </div>

      {mostrarPopup && (
        <div className="popup-descarga">Diploma descargado con éxito</div>
      )}
    </div>
  );
}

export default Final;
