import React from "react";



const Vitrina = () => {
    // Lista de medallas (puedes agregar más si lo deseas)
    const medallas = [
        "medalla1.jpg",
        "medalla2.jpg",
        "medalla3.jpg",
        "medalla4.jpg",
        "medalla5.jpg",
        "medalla6.jpg",
        "medalla7.jpg",
        "medalla8.jpg",
        "medalla9.jpg",
        "medalla10.jpg"
    ];

    return (
        <div style={{ textAlign: "center", margin: "20px" }}>
            <h1>Estas son tus medallas</h1>
            <table style={{ margin: "0 auto", width: "80%" }}>
                <tbody>
                    {/* Fila 1 */}
                    <tr>
                        {medallas.slice(0, 5).map((medalla, index) => (
                            <td key={index} style={{ padding: "10px" }}>
                                <img
                                    src={`${import.meta.env.BASE_URL}assets/images/imagesMedal/${medalla}`}
                                    alt={`Medalla ${index + 1}`}
                                    style={{ width: "100px", height: "auto", borderRadius: "8px" }}
                                />

                            </td>
                        ))}
                    </tr>
                    {/* Fila 2 */}
                    <tr>
                        {medallas.slice(5, 10).map((medalla, index) => (
                            <td key={index + 5} style={{ padding: "10px" }}>
                                <img
                                    src={`${import.meta.env.BASE_URL}assets/images/imagesMedal/${medalla}`}                                    alt={`Medalla ${index + 6}`}
                                    style={{ width: "100px", height: "auto", borderRadius: "8px" }}
                                />
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Vitrina;
