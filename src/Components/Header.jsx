import "./header.css";

function Header() {
  return (
    <header className="header">
      <div className="branding">
        <img src="public/assets/images/Logo-principal.png" alt="Logo de la empresa" className="logo" />
        <span>Proyecto desarrollado para la empresa</span>
      </div>
      <h1>¡Bienvenidos a esta aventura!</h1>
    </header>
  );
}

export default Header;
