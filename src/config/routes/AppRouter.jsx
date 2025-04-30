import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ROUTES from './routerConfig';
import { lazy, Suspense } from "react";


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
            <Route path={ROUTES.MODOJUEGO} element={<ModoJuego />} /> 
            <Route path={ROUTES.PORTADA} element={<Portada />} />
            <Route path={ROUTES.FORM} element={<Form />} />
            <Route path={ROUTES.MAPA} element={<Mapa />} />
            <Route path={ROUTES.ENTREACTIVIDADES} element={<EntreActividades />} />
            <Route path={ROUTES.ESCANERQR} element={<EscanerQR />} />
            <Route path={ROUTES.ACTIVIDAD} element={
                <Suspense fallback={<LoadingSpinner />}>
                    
                        <Actividad />
                    
                    </Suspense>} />
            <Route path={ROUTES.FINAL} element={
                <Suspense fallback={<LoadingSpinner />}>
                    
                        <Final />
                    
                    </Suspense>} />
            <Route path={ROUTES.VITRINA} element={
                <Suspense fallback={<LoadingSpinner />}>
                
                    <Vitrina />
                
                </Suspense>} />
        </Routes>
    );
}

export default AppRouter;