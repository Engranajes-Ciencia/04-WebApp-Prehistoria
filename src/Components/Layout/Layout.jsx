import Header from "./Header";
import Footer from "./Footer";
import "../../Styles/Layout/Layout.css";
import ConnectionAlert from "../Commons/ConnectionAlert";
import InactivityTimer from "../Commons/InactivityTimer";

const Layout = ({ children }) => {

    const isDark = document.documentElement.classList.contains('dark');

    const handleInactivity = () => {
        alert("Inactividad detectada. Cerrando sesión...");
    };

    return (
        <div className={`layout ${isDark ? 'modo-oscuro' : ''}`}>
            <InactivityTimer timeout={300000} onTimeout={handleInactivity} />
            <Header />
            <main>{children}</main>
            <ConnectionAlert />
            <Footer />
        </div>
    );
}

export default Layout;