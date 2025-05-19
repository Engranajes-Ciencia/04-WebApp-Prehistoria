// Pages/VitrinaVirtual.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Pages/VitrinaVirtual.css";


const medallas = [
    { id: 1, titulo: "Primeras plantas", imagen: "", curiosidad: "Los trilobites existieron antes que los dinosaurios." },
    { id: 2, titulo: "Primeras flores", imagen: "", curiosidad: "El velociraptor tenía plumas." },
    { id: 3, titulo: "Segundos dinosaurios", imagen: "medalla2.png", curiosidad: "Su caparazón puede cambiar según la isla." },
    { id: 4, titulo: "Tortugas de las Galápagos", imagen: "medalla3.png", curiosidad: "Pertenecen a Australopithecus afarensis." },
    { id: 5, titulo: "Atapuerca", imagen: "", curiosidad: "Algunas pinturas tienen más de 30.000 años." },
    { id: 6, titulo: "Pinturas rupestres", imagen: "medalla5.png", curiosidad: "Vivían en chozas y seguían a los animales." },
    { id: 7, titulo: "Poblado sedentario", imagen: "medalla7.png", curiosidad: "Comenzaron a construir aldeas permanentes." },
    { id: 8, titulo: "Poblados nómadas", imagen: "medalla6.png", curiosidad: "Los primeros pozos datan del Neolítico." },
    { id: 9, titulo: "Çatalhöyük", imagen: "", curiosidad: "Algunas alineaciones indican los solsticios." },
    { id: 10, titulo: "Stonehenge", imagen: "medalla9.png", curiosidad: "Cada faraón dejaba su huella en Karnak." }
];


function VitrinaVirtual() {
    const completadas = JSON.parse(localStorage.getItem("actividadesCompletadas")) || [];
    const [flippedId, setFlippedId] = useState(null);
    const navigate = useNavigate();

    return (
        <div className="vitrina-virtual-container">
            <h1 className="titulo-virtual">"Galería Virtual Medallas Prehistóricas"</h1>
            <p className="contador-medallas">Has conseguido {completadas.length} de {medallas.length} medallas</p>

            <div className="grid-medallas">
                {medallas.map((medalla) => {
                    const completada = completadas.includes(medalla.id);
                    const isFlipped = flippedId === medalla.id;

                    return (

                        <div
                            key={medalla.id}
                            className={`card-flip ${completada ? "completada" : "bloqueada"} ${isFlipped ? "flipped" : ""}`}
                            onClick={() => completada && setFlippedId(isFlipped ? null : medalla.id)}
                        >
                            <div className="card-inner">
                                <div className="card-front">
                                    <img
                                        src={`/assets/images/imagesMedal/${medalla.imagen}`}
                                        alt={`Medalla ${medalla.id}`}
                                    />
                                    <p>{medalla.titulo}</p>
                                </div>
                                <div className="card-back">
                                    <h3>🏅 {medalla.titulo}</h3>
                                    <p className="curiosidad-text">{medalla.curiosidad}</p>
                                </div>
                            </div>
                        </div>

                    );
                })}
            </div>

            <button
                className="btn-volver-final"
                onClick={() => {
                    const completadas = JSON.parse(localStorage.getItem("actividadesCompletadas")) || [];
                    if (completadas.length >= 10) {
                        navigate("/final");
                    } else {
                        navigate("/entre-actividad");
                    }
                }}
            >
                Volver
            </button>

        </div>
    );
}

export default VitrinaVirtual;
