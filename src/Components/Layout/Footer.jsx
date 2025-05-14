import "../../Styles/Layout/Footer.css";
import { useTranslation, Trans } from "react-i18next";

function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <p>{t("footer.proyecto")}</p>
            <p><Trans i18nKey="footer.desarrolladoPor" components={{ 1: <strong /> }} /></p>
            <p>{t("footer.derechos", { year: new Date().getFullYear() })}</p>
        </footer>
    );
}

export default Footer;
