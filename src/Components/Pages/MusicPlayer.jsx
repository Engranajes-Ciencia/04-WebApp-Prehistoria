import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer = () => {
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(null);


    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
        }
    };

    useEffect(() => {
        if (audioRef.current) {
          audioRef.current.volume = 0.1; // Establece el volumen
        }
      }, []);

  return (
    <div>
      <audio
      ref={audioRef}
      src="public/sounds/musicafondo.mp3" // Ruta de la musica
      loop
      autoPlay
      muted={isMuted}
      />
    

    <button onClick={toggleMute}>
        {isMuted ? "Activar música" : "Silenciar música"}
    </button>
    </div>
  );
};


export default MusicPlayer
