// src/Components/Commons/OrientationWarning.jsx
import React from 'react';
import useOrientation from '../../UseOrientation'; // Importa el hook desde la nueva ruta
import { useTranslation, Trans } from "react-i18next";

function OrientationWarning() {
  const { t } = useTranslation();
  const { orientation } = useOrientation(); // Obtiene la orientación del hook

  if (orientation === "portrait") {
    return (
      <div className="orientacion-alerta">
        {t("orientation.warning")}
      </div>
    );
  }
  return null; // No muestra nada si no está en modo retrato
}

export default OrientationWarning;