// src/Components/Commons/OrientationWarning.jsx
import React from 'react';
import useOrientation from '../../UseOrientation'; // Importa el hook desde la nueva ruta

function OrientationWarning() {
  const { orientation } = useOrientation(); // Obtiene la orientación del hook

  if (orientation === "portrait") {
    return (
      <div className="orientacion-alerta">
        ⚠️ Para una mejor experiencia recomendamos utilizar el dispositivo
        en modo horizontal
      </div>
    );
  }
  return null; // No muestra nada si no está en modo retrato
}

export default OrientationWarning;