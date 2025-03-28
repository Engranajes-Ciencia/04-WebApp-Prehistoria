import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Form.css";

function Form() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [fondoActual, setFondoActual] = useState(0);
  const navigate = useNavigate(); // React Router redirection
  const welcomeRef = useRef(new Audio("/sounds/welcome.mp3")); // sonido welcome al hacer click form
  const dinoRef = useRef(null); // Referencia para el sonido dino
  const exploradoraSoundRef = useRef(new Audio("/sounds/exploradora.wav")); // Sonido exploradora
  const exploradorSoundRef = useRef(new Audio("/sounds/explorador.wav")); // Sonido explorador

  const avatars = {
    explorador: "/assets/avatars/explorador.png",
    exploradora: "/assets/avatars/exploradora.png",
  };

  const fondos = [
    "/assets/form-fondo/fondo1.png",
    "/assets/form-fondo/fondo2.png",
    "/assets/form-fondo/fondo3.png",
    "/assets/form-fondo/fondo4.png",
    "/assets/form-fondo/fondo5.png",
    "/assets/form-fondo/fondo6.png",
  ];

  // Cambio automático del fondo
  useEffect(() => {
    const intervalo = setInterval(() => {
      setFondoActual((prev) => (prev + 1) % fondos.length);
    }, 5000); // cada 5 segundos

    return () => clearInterval(intervalo);
  }, []);

  // Reproducir sonido dino.mp3 al abrir el formulario
  useEffect(() => {
    if (!dinoRef.current) {
      dinoRef.current = new Audio("/sounds/dino.mp3");
      dinoRef.current.volume = 1.0;
    }

    const playDinoSound = async () => {
      try {
        await dinoRef.current.play();
      } catch (error) {
        console.warn("El navegador bloqueó el autoplay del sonido dino.");
      }
    };

    playDinoSound(); // Reproducir el sonido al montar el componente

    return () => {
      // Detener y reiniciar el audio al desmontar el componente
      if (dinoRef.current) {
        dinoRef.current.pause();
        dinoRef.current.currentTime = 0;
      }
    };
  }, []); // Se ejecuta solo al cargar el formulario

  // Actualiza el estado del nombre
  const handleName = (e) => setName(e.target.value);

  // Actualiza el estado del avatar
  const handleAvatar = (e) => {
    const selectedAvatar = e.target.value;
    setAvatar(selectedAvatar);

    // Reproduce el sonido específico según el avatar seleccionado
    if (selectedAvatar === "exploradora") {
      exploradorSoundRef.current.currentTime = 100; // Silencia el otro audio
      exploradoraSoundRef.current.currentTime = 0; // Reinicia el audio
      exploradoraSoundRef.current.play().catch((error) =>
        console.warn("El navegador bloqueó el autoplay del sonido exploradora.")
      );
    } else if (selectedAvatar === "explorador") {
      exploradoraSoundRef.current.currentTime = 100; // Silencia el otro audio
      exploradorSoundRef.current.currentTime = 0; // Reinicia el audio
      exploradorSoundRef.current.play().catch((error) =>
        console.warn("El navegador bloqueó el autoplay del sonido explorador.")
      );
    }
  };

  // Manejo del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !avatar) {
      alert("Por favor, escribe tu nombre y elige un avatar.");
      return;
    }

    // Sonido al hacer clic en "Empezar Aventura"
    welcomeRef.current.currentTime = 0;
    welcomeRef.current.play();

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

      {/* Formulario */}
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
