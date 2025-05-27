import { useState, useEffect } from 'react';
import "../../Styles/Commons/ConnectionAlert.css";
import { useTranslation, Trans } from "react-i18next";

function ConnectionAlert() {
  const { t } = useTranslation();
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
          {t("connection.alert")}
        </div>
      )}
    </>
  );
}

export default ConnectionAlert;