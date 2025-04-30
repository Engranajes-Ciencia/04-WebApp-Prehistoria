// Pages/VitrinaVirtual.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Pages/VitrinaVirtual.css";


const medallas = [
    { id: 1, titulo: "Fósiles prehistóricos", imagen: "medalla1.png", curiosidad: "Los trilobites existieron antes que los dinosaurios." },
    { id: 2, titulo: "Dinosaurios gigantes", imagen: "medalla2.png", curiosidad: "El velociraptor tenía plumas." },
    { id: 3, titulo: "Tortuga de las Galápagos", imagen: "medalla3.png", curiosidad: "Su caparazón puede cambiar según la isla." },
    { id: 4, titulo: "Huellas de Laetoli", imagen: "medalla4.png", curiosidad: "Pertenecen a Australopithecus afarensis." },
    { id: 5, titulo: "Pinturas rupestres", imagen: "medalla5.png", curiosidad: "Algunas pinturas tienen más de 30.000 años." },
    { id: 6, titulo: "Poblado nómada", imagen: "medalla6.png", curiosidad: "Vivían en chozas y seguían a los animales." },
    { id: 7, titulo: "Poblado sedentario", imagen: "medalla7.png", curiosidad: "Comenzaron a construir aldeas permanentes." },
    { id: 8, titulo: "Pozo", imagen: "medalla8.png", curiosidad: "Los primeros pozos datan del Neolítico." },
    { id: 9, titulo: "Stonehenge", imagen: "medalla9.png", curiosidad: "Algunas alineaciones indican los solsticios." },
    { id: 10, titulo: "Templo de Karnak", imagen: "medalla10.png", curiosidad: "Cada faraón dejaba su huella en Karnak." }
];


function VitrinaVirtual() {
    const completadas = JSON.parse(localStorage.getItem("actividadesCompletadas")) || [];
    const [modalData, setModalData] = useState(null);
    const navigate = useNavigate();

    return (
        <div className="vitrina-virtual-container">
            <h1 className="titulo-virtual">Galería Virtual Medallas Prehistóricas</h1>
            <p className="contador-medallas">Has conseguido {completadas.length} de {medallas.length} medallas</p>

            <div className="grid-medallas">
                {medallas.map((medalla) => {
                    const completada = completadas.includes(medalla.id);
                    return (

                        <div
                            key={medalla.id}
                            className={`card-flip ${completada ? "completada" : "bloqueada"}`}
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

            <button className="btn-volver-final" onClick={() => navigate("/final")}>
                Volver 
            </button>

        </div>
    );
}

export default VitrinaVirtual;
