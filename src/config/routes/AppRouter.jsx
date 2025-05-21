import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { ROUTES } from './routerConfig';

import Layout from '../../Components/Layout/Layout';

import ModoJuego from "../../Components/Pages/ModoJuego";
import Portada from "../../Components/Pages/Portada";
import Form from "../../Components/Pages/Form";
import Mapa from "../../Components/Pages/Mapa";
import EscanerQR from '../../Components/Pages/EscanerQR';
import EntreActividades from "../../Components/Pages/EntreActividades";
import ModoSecreto from "../../Components/Pages/ModoSecreto";

import LoadingSpinner from "../../Components/Commons/LoadingSpinner";

    // Carga componentes lentos, grandes, finales o de poco uso cuando se visitan para ganar velocidad en la app
const Final = lazy(() => import("../../Components/Pages/Final"));
const Actividad = lazy(() => import("../../Components/Pages/Actividad"));
const Vitrina = lazy(() => import("../../Components/Pages/Vitrina"));
const VitrinaVirtual = lazy(() => import("../../Components/Pages/VitrinaVirtual"));

function AppRouter() {
    return(
        <Routes>
            {/* Rutas que SÍ usan el Layout */}
            <Route path={ROUTES.MODOJUEGO} element={<Layout><ModoJuego /></Layout>} />
            <Route path={ROUTES.PORTADA} element={<Layout><Portada /></Layout>} />
            <Route path={ROUTES.FORM} element={<Layout><Form /></Layout>} />
            <Route path={ROUTES.MAPA} element={<Layout><Mapa /></Layout>} />
            <Route path={ROUTES.ENTREACTIVIDADES} element={<Layout><EntreActividades /></Layout>} />
            <Route path={ROUTES.ESCANERQR} element={<Layout><EscanerQR /></Layout>} />
            <Route path={ROUTES.MODO_SECRETO} element={<Layout><ModoSecreto /></Layout>} />

            {/* Rutas con Lazy Loading (envueltas en Layout y Suspense) */}
            <Route path={ROUTES.ACTIVIDAD} element={
                <Suspense fallback={<LoadingSpinner />}>
                    <Layout><Actividad /></Layout>
                </Suspense>
            } />
            <Route path={ROUTES.FINAL} element={
                <Suspense fallback={<LoadingSpinner />}>
                    <Layout><Final /></Layout>
                </Suspense>
            } />
            <Route path={ROUTES.VITRINA} element={
                <Suspense fallback={<LoadingSpinner />}>
                    <Layout><Vitrina /></Layout>
                </Suspense>
            } />
            <Route path={ROUTES.VITRINA_VIRTUAL} element={
                <Suspense fallback={<LoadingSpinner />}>
                    <Layout><VitrinaVirtual /></Layout>
                </Suspense>
            } />

            {/* Ejemplo de ruta que NO usaría el Layout (si la tuvieras) */}
            {/* <Route path="/alguna-otra-ruta" element={<SomeComponentWithoutLayout />} /> */}
        </Routes>
    );
}

export default AppRouter;