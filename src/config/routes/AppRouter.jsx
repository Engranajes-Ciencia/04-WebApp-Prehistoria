import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ROUTES from './routerConfig';
import { lazy, Suspense } from "react";

import Layout from "../../Components/Layout/Layout";
import ModoJuego from "../../Components/Pages/ModoJuego";
import Portada from "../../Components/Pages/Portada";
import Form from "../../Components/Pages/Form";
import Mapa from "../../Components/Pages/Mapa";
import EscanerQR from '../../Components/Pages/EscanerQR';
import EntreActividades from "../../Components/Pages/EntreActividades";

import LoadingSpinner from "../../Components/Commons/LoadingSpinner";

    // Carga componentes lentos, grandes, finales o de poco uso cuando se visitan para ganar velocidad en la app
  const Final = lazy(() => import("../../Components/Pages/Final"));
  const Actividad = lazy(() => import("../../Components/Pages/Actividad"));
  const Vitrina = lazy(() => import("../../Components/Pages/Vitrina"));

function AppRouter() {
    return(
        <Routes>
            <Route path={ROUTES.MODOJUEGO} element={<Layout><ModoJuego /></Layout>} /> 
            <Route path={ROUTES.PORTADA} element={<Layout><Portada /></Layout>} />
            <Route path={ROUTES.FORM} element={<Layout><Form /></Layout>} />
            <Route path={ROUTES.MAPA} element={<Layout><Mapa /></Layout>} />
            <Route path={ROUTES.ENTREACTIVIDADES} element={<Layout><EntreActividades /></Layout>} />
            <Route path={ROUTES.ESCANERQR} element={<Layout><EscanerQR /></Layout>} />
            <Route path={ROUTES.ACTIVIDAD} element={
                <Suspense fallback={<LoadingSpinner />}>
                    <Layout>
                        <Actividad />
                    </Layout>
                    </Suspense>} />
            <Route path={ROUTES.FINAL} element={
                <Suspense fallback={<LoadingSpinner />}>
                    <Layout>
                        <Final />
                    </Layout>
                    </Suspense>} />
            <Route path={ROUTES.VITRINA} element={
                <Suspense fallback={<LoadingSpinner />}>
                <Layout>
                    <Vitrina />
                </Layout>
                </Suspense>} />
        </Routes>
    );
}

export default AppRouter;