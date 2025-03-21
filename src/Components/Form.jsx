import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

function Form() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate(); // React Router redirection

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
          {["explorador", "exploradora"].map((tipo) => (
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
                src={`/avatars/${tipo}.png`}
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
  );
}

export default Form;

