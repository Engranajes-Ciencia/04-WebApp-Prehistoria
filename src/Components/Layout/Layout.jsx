import Header from "./Header";
import Footer from "./Footer";
import "../../Styles/Layout/Layout.css";
import ConnectionAlert from "../Commons/ConnectionAlert";

const Layout = ({ children }) => {

    const isDark = document.documentElement.classList.contains('dark');

    return (
        <div className={`layout ${isDark ? 'modo-oscuro' : ''}`}>
            <Header />
            <main>{children}</main>
            <ConnectionAlert />
            <Footer />
        </div>
    );
}

export default Layout;