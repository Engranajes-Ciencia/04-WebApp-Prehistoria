// src/Hooks/useOrientation.js
import { useEffect, useState } from "react";

// El nombre del hook debe ser camelCase por convención
const useOrientation = () => {
    // Definimos isPortrait directamente para que sea la propiedad que queremos retornar
    const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);
    const [orientation, setOrientation] = useState(
        window.innerWidth > window.innerHeight ? "landscape" : "portrait"
    );

    useEffect(() => {
        const handleResize = () => {
            setIsPortrait(window.innerHeight > window.innerWidth);
            setOrientation(window.innerWidth > window.innerHeight ? "landscape" : "portrait");
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Este hook ahora devuelve un objeto con AMBAS propiedades
    return { isPortrait, orientation };
};

// Exportamos por defecto el hook
export default useOrientation;