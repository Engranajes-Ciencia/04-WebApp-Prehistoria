import { useState } from "react";
import "./Form.css";

function Form() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  // Función para manejar el cambio en el input de nombre
  const handleName = (e) => {
    setName(e.target.value);
  };

  // Función para manejar el cambio en el select de avatar
  const handleAvatar = (e) => {
    setAvatar(e.target.value);
  };

  // Función para manejar el envío del formulario. Evita que se recargue la página.
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`¡Bienvenido, ${name}! ¡Bonita foto de ${avatar} has elegido!`);
    setName("");   // Reinicia el input de nombre
    setAvatar(""); // Reinicia el select de avatar
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="name">Nombre: </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleName} // Usamos la función separada aquí
          maxLength="30"
          required
        />
      </fieldset>

      <fieldset>
        <label htmlFor="avatar">Elige tu avatar: </label>
        <select
          id="avatar"
          value={avatar}
          onChange={handleAvatar} // Usamos la función separada aquí
          required
        >
          <option value="">Selecciona...</option>
          <option value="T-Rex">T-Rex</option>
          <option value="Diplodocus">Diplodocus</option>
          <option value="Aquilops">Aquilops</option>
        </select>
      </fieldset>

      <button type="submit">Empezar Aventura</button>
    </form>
  );
}

export default Form;
