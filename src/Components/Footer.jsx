// src/Components/Footer.jsx
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <p>🌍 Proyecto educativo para el Parque de la Prehistoria</p>
            <p>🧠 Desarrollado por <strong>Engranajes Ciencia</strong> & Equipo FCT 💻</p>
            <p>© {new Date().getFullYear()} Todos los derechos reservados</p>
        </footer>
    );
}

export default Footer;
