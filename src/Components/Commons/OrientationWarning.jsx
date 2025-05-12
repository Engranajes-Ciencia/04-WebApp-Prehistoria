import { useEffect, useState } from "react";

export const UseOrientation = () => {
  const [orientation, setOrientation] = useState(
    window.innerWidth > window.innerHeight ? "landscape" : "portrait"
  );

  useEffect(() => {
    const handleResize = () => {
      setOrientation(
        window.innerWidth > window.innerHeight ? "landscape" : "portrait"
      );
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return orientation;
};
