import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import exploradorImg from '../assets/avatars/explorador.png';
import exploradoraImg from '../assets/avatars/exploradora.png';
import fondo1 from "../assets/form-fondo/fondo1.png";
import fondo2 from "../assets/form-fondo/fondo2.png";
import fondo3 from "../assets/form-fondo/fondo3.png";
import fondo4 from "../assets/form-fondo/fondo4.png";
import fondo5 from "../assets/form-fondo/fondo5.png";
import fondo6 from "../assets/form-fondo/fondo6.png";


function Form() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [fondoActual, setFondoActual] = useState(0);
  const navigate = useNavigate(); // React Router redirection

  const avatars = {
    explorador: exploradorImg,
    exploradora: exploradoraImg,
  };

  const fondos = [fondo1, fondo2, fondo3, fondo4,fondo5, fondo6];

  // Cambio automático del fondo
  useEffect(() => {
    const intervalo = setInterval(() => {
      setFondoActual((prev) => (prev + 1) % fondos.length);
    }, 5000); // cada 5 segundos

    return () => clearInterval(intervalo);
  }, []);


  // Actualiza el estado del nombre
  const handleName = (e) => setName(e.target.value);

  // Actualiza el estado del avatar
  const handleAvatar = (e) => setAvatar(e.target.value);

  // Manejo del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !avatar) {
      alert("Por favor, escribe tu nombre y elige un avatar.");
      return;
    }

    // Guardamos en localStorage
    localStorage.setItem("nombre", name);
    localStorage.setItem("avatar", avatar);

    // Redirigimos al mapa
    navigate("/mapa");
  };

  return (

    <>
      {/* Fondo  */}
      <div
        className="fondo-cambiante"
        style={{
          backgroundImage: `url(${fondos[fondoActual]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          transition: "background-image 1s ease-in-out",
        }}
      ></div>
        
  {/* Formulario */ }
      <form className="form" onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleName}
            maxLength="30"
            required
            placeholder="Escribe tu nombre..."
            autoFocus
          />
        </fieldset>

        <fieldset>
          <label>Elige tu avatar:</label>
          <div className="avatar-options">
            {Object.keys(avatars).map((tipo) => (
              <label key={tipo}>
                <input
                  type="radio"
                  name="avatar"
                  value={tipo}
                  checked={avatar === tipo}
                  onChange={handleAvatar}
                  className="hidden"
                />
                <img
                  src={avatars[tipo]}
                  alt={tipo}
                  className={`avatar-img ${avatar === tipo ? "selected" : ""}`}
                />
                <p style={{ textAlign: "center" }}>
                  {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                </p>
              </label>
            ))}
          </div>
        </fieldset>

        <button type="submit">Empezar Aventura</button>
      </form>
    </>
  );
}

export default Form;

