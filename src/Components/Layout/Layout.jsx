import Header from "./Header";
import Footer from "./Footer";
import "../../Styles/Layout/Layout.css";
import ConnectionAlert from "../Commons/ConnectionAlert";

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            <main>{children}</main>
            <ConnectionAlert />
            <Footer />
        </div>
    );
}

export default Layout;