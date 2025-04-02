import { useState, useEffect } from 'react';
import "../Styles/ConnectionAlert.css";

function ConnectionAlert() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <>
      {!isOnline && (
        <div className='connection-alert'>
         ⚠️ ¡Estás desconectado de Internet!
        </div>
      )}
    </>
  );
}

export default ConnectionAlert;