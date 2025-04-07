

export function getActividadesCompletadas() {
    const data = localStorage.getItem("actividadesCompletadas");
    return data ? JSON.parse(data) : [];
}

export function marcarActividadComoCompletada(id) {
    const completadas = getActividadesCompletadas();
    if (!completadas.includes(id)) {
        completadas.push(id);
        localStorage.setItem("actividadesCompletadas", JSON.stringify(completadas));
    }
}

export function resetActividadesCompletadas() {
    localStorage.removeItem("actividadesCompletadas");
}
