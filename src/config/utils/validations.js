// src/utils/validations.js

//  Valida nombre (solo letras, números, tildes, espacios)
export function validarNombre(nombre) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]{2,20}$/;
    return regex.test(nombre);
}

//  Valida avatar válido ("explorador" o "exploradora")
export function validarAvatar(avatar) {
    return ["explorador", "exploradora"].includes(avatar);
}

/* 
Asegura orden correcto de actividades
    export function validarAccesoActividad(id, completadas) {
        const num = Number(id);
        const siguienteEsperado = completadas.length + 1;
        return (num === 1 && completadas.length === 0) || num === siguienteEsperado;
    }
*/

//  transforma nombres "Kushim"/"Enheduanna" a los que entiende el JSON
export function transformarAvatar(nombreAvatar) {
    return nombreAvatar === "Kushim" ? "explorador" : "exploradora";
}
