import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../../Styles/Layout/Layout.css";
import ConnectionAlert from "../Commons/ConnectionAlert";
import InactivityTimer from "../Commons/InactivityTimer";

const Layout = ({ children }) => {

    const navigate = useNavigate();
    const location = useLocation();

    const isDark = document.documentElement.classList.contains('dark');

    const handleInactivity = () => {
        alert("Inactividad detectada. Cerrando sesión...");
        navigate("/");
    };

    const isHomePage = location.pathname === "/";

    return (
        <div className={`layout ${isDark ? 'modo-oscuro' : ''}`}>

            {!isHomePage && (
                <InactivityTimer timeout={900000} onTimeout={handleInactivity} />
            )}
            <Header />
            <main>{children}</main>
            <ConnectionAlert />
            <Footer />

        </div>
    );
}

export default Layout;