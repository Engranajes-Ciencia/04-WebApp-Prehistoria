// src/components/pages/AdminStats.jsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/Pages/AdminStats.css'; // Importa el archivo CSS
import { useTranslation } from 'react-i18next';
import actividadesData from '../../config/data/actividades.json'; // Para mostrar nombres de actividades

const CLAVE_SECRETA_ADMIN = "admin1234"; // ¡puedes cámbiarla!

// Helper para formatear tiempo
const formatMilliseconds = (ms) => {
    if (ms === 0 || isNaN(ms)) {
        return { segundos: '0', minutos: '0.0', horas: '0.00' };
    }
    const segundos = (ms / 1000).toFixed(0);
    const minutos = (ms / 60000).toFixed(1);
    const horas = (ms / 3600000).toFixed(2);
    return { segundos, minutos, horas };
};


function AdminStats() {
    const { t } = useTranslation("pages");
    const navigate = useNavigate();
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [inputKey, setInputKey] = useState("");
    const [stats, setStats] = useState({
        inicios: 0,
        tiempoTotalMs: 0,
        avatar: 'No definido',
        nombre: 'No definido',
        actividadesCompletadas: [],
        modoSecretoDesbloqueado: false,
    });
    

    useEffect(() => {
        if (isAuthenticated) {
            const inicios = parseInt(localStorage.getItem('contadorIniciosJuego') || '0', 10);
            const tiempoTotalMs = parseInt(localStorage.getItem('tiempoTotalJuego') || '0', 10);
            const avatar = localStorage.getItem('avatar') || t('admin.noDefinido');
            const nombre = localStorage.getItem('nombre') || t('stats.noDefinido');
            const actividadesCompletadasData = localStorage.getItem('actividadesCompletadas');
            const actividadesCompletadas = actividadesCompletadasData ? JSON.parse(actividadesCompletadasData) : [];
            const modoSecretoDesbloqueado = localStorage.getItem('modoSecretoDesbloqueado') === 'true';
            const ultimoReset = localStorage.getItem('adminStatsUltimoReset');

            setStats({
                inicios,
                tiempoTotalMs,
                avatar,
                nombre,
                actividadesCompletadas,
                modoSecretoDesbloqueado,
                ultimoReset: ultimoReset ? new Date(parseInt(ultimoReset, 10)).toLocaleString() : t('stats.nunca'),
            });
        }
    }, [isAuthenticated]);


    const formattedTime = formatMilliseconds(stats.tiempoTotalMs);


    const handleResetStats = () => {
        if (window.confirm(t('confirmaciones.resetTotal'))) {
            const clavesApp = [
                'contadorIniciosJuego', 'tiempoTotalJuego', 'inicioSesionTimestamp',
                'avatar', 'nombre', 'actividadesCompletadas',
                'modoSecretoDesbloqueado', 'modoOscuro', 'adminStatsUltimoReset',
            ];
            clavesApp.forEach(clave => localStorage.removeItem(clave));

            const resetTimestamp = Date.now();
            localStorage.setItem('adminStatsUltimoReset', resetTimestamp.toString());

            setStats({
                inicios: 0, tiempoTotalMs: 0, avatar: t('stats.noDefinido'),
                nombre: t('stats.noDefinido'), actividadesCompletadas: [],
                modoSecretoDesbloqueado: false,
                ultimoReset: new Date(resetTimestamp).toLocaleString(),
            });
            sessionStorage.removeItem('adminAuthenticated'); // Desautenticar al resetear
            setIsAuthenticated(false); // Forzar re-autenticación
            alert(t('admin.alertas.statsReseteadas'));
        }
    };

    const handleKeySubmit = (e) => {
        e.preventDefault();
        if (inputKey === CLAVE_SECRETA_ADMIN) {
            setIsAuthenticated(true);
            sessionStorage.setItem('adminAuthenticated', 'true'); // Persistir autenticación en la sesión
        } else {
            alert(t('admin.alertas.claveIncorrecta'));
            setInputKey("");
        }
    };

    const getNombreActividad = (id) => {
        const actividad = actividadesData.find(act => act.id === id);
        return actividad ? actividad.titulo : t('admin.stats.actividadDesconocida');
    };

    const copyStatsToClipboard = () => {
        const statsText = `
Panel de Estadísticas (Local)
---------------------------------
Datos del Jugador:
    Nombre: ${stats.nombre}
    Avatar: ${stats.avatar}
---------------------------------
Métricas de Uso:
    Inicios del juego: ${stats.inicios} veces
    Tiempo total (seg): ${formattedTime.segundos}
    Tiempo total (min): ${formattedTime.minutos}
    Tiempo total (hr): ${formattedTime.horas}
---------------------------------
Progreso:
    Actividades Completadas: ${stats.actividadesCompletadas.length > 0 ? stats.actividadesCompletadas.map(id => `${id}: ${getNombreActividad(id)}`).join(', ') : 'Ninguna'}
    Modo Secreto Desbloqueado: ${stats.modoSecretoDesbloqueado ? 'Sí' : 'No'}
---------------------------------
Último Reset: ${stats.ultimoReset}
        `;
        navigator.clipboard.writeText(statsText.trim())
            .then(() => alert(t('admin.alertas.statsCopiadas')))
            .catch(err => console.error(t('admin.errores.copiarStats'), err));
    };


    if (!isAuthenticated) {
        return (
            <div className="admin-auth-wrapper"> 
                <div className="admin-auth-container">
                    <div className="admin-auth-logo">

                        {/* Puedes poner un logo SVG o una imagen aquí si quieres */}
                        
                        <span role="img" aria-label="Admin Panel Icon" style={{ fontSize: '3rem' }}>⚙️</span>
                    </div>
                    <h1>{t('admin.auth.titulo')}</h1> 
                    <p className="admin-auth-subtitle">{t('admin.auth.subtitulo', 'Acceso restringido. Introduce la clave para continuar.')}</p> 
                    <form onSubmit={handleKeySubmit} className="admin-auth-form">
                        <div className="input-group">
                            <span className="input-icon">🔑</span> 
                            <input
                                type="password"
                                id="adminKey"
                                value={inputKey}
                                onChange={(e) => setInputKey(e.target.value)}
                                placeholder={t('admin.auth.placeholderClave')}
                                required
                                autoFocus /* Para que el cursor esté aquí al cargar */
                            />
                        </div>
                        <button type="submit" className="admin-auth-button">
                            {t('admin.auth.botonEntrar')} <span className="button-icon">➔</span>
                        </button>
                    </form>
                    <p className="admin-auth-note">{t('admin.auth.notaSeguridad', 'Este panel es para uso administrativo.')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-stats-container">
            <h1 className="admin-stats-header">📊 {t('admin.tituloPanel')}</h1>

            <div className="admin-stats-section">
                <h2 className="admin-stats-section-title">👤 {t('admin.secciones.datosJugador')}</h2>
                <p className="admin-stats-item"><strong>{t('admin.labels.nombre')}:</strong> {stats.nombre}</p>
                <p className="admin-stats-item"><strong>{t('admin.labels.avatar')}:</strong> {stats.avatar}</p>
            </div>

            <div className="admin-stats-section">
                <h2 className="admin-stats-section-title">⏱️ {t('admin.secciones.metricasUso')}</h2>
                <p className="admin-stats-item">
                    <strong>{t('admin.labels.iniciosJuego')}:</strong> {stats.inicios} {t('admin.unidades.veces')}
                </p>
                <p className="admin-stats-item">
                    <strong>{t('admin.labels.tiempoTotal')}:</strong><br />
                    {formattedTime.segundos} {t('admin.unidades.segundos')}<br />
                    {formattedTime.minutos} {t('admin.unidades.minutos')}<br />
                    {formattedTime.horas} {t('admin.unidades.horas')}
                </p>
            </div>

            <div className="admin-stats-section">
                <h2 className="admin-stats-section-title">🏆 {t('admin.secciones.progreso')}</h2>
                <p className="admin-stats-item">
                    <strong>{t('admin.labels.actividadesCompletadas')}:</strong>
                    {stats.actividadesCompletadas.length > 0 ? (
                        <ul className="admin-stats-list">
                            {stats.actividadesCompletadas.map(id => (
                                <li key={id}>{id} - {getNombreActividad(id)}</li>
                            ))}
                        </ul>
                    ) : (
                        ` ${t('admin.stats.ninguna')}`
                    )}
                </p>
                <p className="admin-stats-item">
                    <strong>{t('admin.labels.modoSecreto')}:</strong> {stats.modoSecretoDesbloqueado ? `${t('admin.respuestas.si')} ✅` : `${t('admin.respuestas.no')} ❌`}
                </p>
            </div>

            <div className="admin-stats-section">
                <h2 className="admin-stats-section-title">⚙️ {t('admin.secciones.administracion')}</h2>
                <p className="admin-stats-item">
                    <strong>{t('admin.labels.ultimoReset')}:</strong> {stats.ultimoReset}
                </p>
            </div>


            <div className="admin-stats-button-container">
                <button
                    onClick={() => navigate(-1)}
                    className="admin-stats-button admin-stats-button-volver"
                >
                    ⬅️ {t('admin.botones.volver')}
                </button>
                <button
                    onClick={copyStatsToClipboard}
                    className="admin-stats-button admin-stats-button-copiar"
                >
                    📋 {t('admin.botones.copiarStats')}
                </button>
                <button
                    onClick={handleResetStats}
                    className="admin-stats-button admin-stats-button-reset"
                >
                    ⚠️ {t('admin.botones.resetStats')}
                </button>
            </div>
            <p className="admin-stats-footer-note">
                {t('admin.notas.datosLocales')}
            </p>
        </div>
    );
}

export default AdminStats;