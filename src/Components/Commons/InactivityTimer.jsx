import { useEffect, useRef } from "react";

const InactivityTimer = ({ timeout = 900000, onTimeout }) => {
  const timerRef = useRef(null);

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current); // Borra el temporizador anterior si existe.
    timerRef.current = setTimeout(() => {
      onTimeout(); // Ejecuta la función si pasa el tiempo de inactividad.
    }, timeout);
  };

  useEffect(() => {

    const events = ["touchstart", "touchmove", "keydown", "scroll"];

    const handleActivity = () => {
        resetTimer(); // Reinicia el temporizador si hay actividad.
    };

    events.forEach((event) => window.addEventListener(event, handleActivity));

    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, handleActivity));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeout, onTimeout]);

  return null;
};

export default InactivityTimer;
