import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { validarNombre, transformarAvatar } from "../utils/validations";
import "../Styles/Form.css";

function Form() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [fondoActual, setFondoActual] = useState(0);
  const navigate = useNavigate();

  const welcomeRef = useRef(null);
  const dinoRef = useRef(null);
  const exploradoraSoundRef = useRef(null);
  const exploradorSoundRef = useRef(null);

  const avatars = {
    Kushim: `${import.meta.env.BASE_URL}assets/avatars/explorador.png`,
    Enheduanna: `${import.meta.env.BASE_URL}assets/avatars/exploradora.png`,
  };

  const fondos = [
    `${import.meta.env.BASE_URL}assets/form-fondo/foto1.png`,
    `${import.meta.env.BASE_URL}assets/form-fondo/foto2.jpg`,
    `${import.meta.env.BASE_URL}assets/form-fondo/foto3.jpg`,
    `${import.meta.env.BASE_URL}assets/form-fondo/foto4.jpg`,
    `${import.meta.env.BASE_URL}assets/form-fondo/foto5.png`,
    `${import.meta.env.BASE_URL}assets/form-fondo/foto6.png`,
  ];

  //  Cambio automático del fondo cada 5 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      setFondoActual((prev) => (prev + 1) % fondos.length);
    }, 5000);
    return () => clearInterval(intervalo);
  }, []);

  //  Reproducir sonido de dinosaurio al cargar
  useEffect(() => {
    dinoRef.current = new Audio(`${import.meta.env.BASE_URL}sounds/dino.mp3`);
    dinoRef.current.volume = 1.0;

    const play = async () => {
      try {
        await dinoRef.current.play();
      } catch (error) {
        console.warn(" Autoplay bloqueado para dino.mp3");
      }
    };

    play();

    return () => {
      dinoRef.current.pause();
      dinoRef.current.currentTime = 0;
    };
  }, []);

  //  Inicializar sonidos de bienvenida y avatar
  useEffect(() => {
    welcomeRef.current = new Audio(`${import.meta.env.BASE_URL}sounds/welcome.mp3`);
    exploradoraSoundRef.current = new Audio(`${import.meta.env.BASE_URL}sounds/exploradora.wav`);
    exploradorSoundRef.current = new Audio(`${import.meta.env.BASE_URL}sounds/explorador.wav`);
  }, []);

  //  Actualiza nombre
  const handleName = (e) => setName(e.target.value);

  //  Actualiza avatar + reproduce sonido
  const handleAvatar = (e) => {
    const selected = e.target.value;
    setAvatar(selected);

    // Reproduce el sonido específico según el avatar seleccionado
    if (selected === "Kushim") { // Nombres invertidos
      exploradoraSoundRef.current.currentTime = 0; // Reinicia el audio
      exploradorSoundRef.current.currentTime = 100; // Silencia el otro audio
      exploradoraSoundRef.current.play().catch(() =>
        console.warn("El navegador bloqueó el autoplay del sonido exploradora.")
      );
    } else if (selected === "Enheduanna") { // Nombres invertidos
      exploradorSoundRef.current.currentTime = 0; // Reinicia el audio
      exploradoraSoundRef.current.currentTime = 100; // Silencia el otro audio
      exploradorSoundRef.current.play().catch(() =>
        console.warn("El navegador bloqueó el autoplay del sonido explorador.")
      );
    }
  };

  //  Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarNombre(name)) {
      alert("El nombre solo puede contener letras, números y espacios.");
      return;
    }

    if (!name || !avatar) {
      alert("Por favor, escribe tu nombre y elige un avatar.");
      return;
    }

    //  Reproduce sonido de bienvenida
    welcomeRef.current.currentTime = 0;
    welcomeRef.current.play();

    //  Guarda nombre localstore
    localStorage.setItem("nombre", name);

    //  Transformamos y guardamos avatar con el valor que espera el JSON
    localStorage.setItem("avatar", transformarAvatar(avatar));


    //  Redirige al mapa
    navigate("/mapa");
  };

  return (
    <>
      {/* Fondo dinámico */}
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

      {/* Formulario */}
      <form className="form" onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="name">Nombre de explorador/a:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleName}
            maxLength="20"
            required
            placeholder="Escribe tu nombre..."
            autoFocus
          />
        </fieldset>

        <fieldset>
          <label>Elige a tu guía:</label>
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
                <p style={{ textAlign: "left" }} className="text-img">
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

