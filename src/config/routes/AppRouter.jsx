import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ROUTES from './routerConfig';

import Layout from "../../Components/Layout/Layout";
import ModoJuego from "../../Components/Pages/ModoJuego";
import Portada from "../../Components/Pages/Portada";
import Form from "../../Components/Pages/Form";
import Mapa from "../../Components/Pages/Mapa";
import EscanerQR from '../../Components/Pages/EscanerQR';
import Actividad from "../../Components/Pages/Actividad";
import EntreActividades from "../../Components/Pages/EntreActividades";
import Final from "../../Components/Pages/Final";
import Vitrina from "../../Components/Pages/Vitrina";

function AppRouter() {
    return(
        <Routes>
            <Route path={ROUTES.MODOJUEGO} element={<Layout><ModoJuego /></Layout>} /> 
            <Route path={ROUTES.PORTADA} element={<Layout><Portada /></Layout>} />
            <Route path={ROUTES.FORM} element={<Layout><Form /></Layout>} />
            <Route path={ROUTES.MAPA} element={<Layout><Mapa /></Layout>} />
            <Route path={ROUTES.ENTREACTIVIDADES} element={<Layout><EntreActividades /></Layout>} />
            <Route path={ROUTES.ESCANERQR} element={<Layout><EscanerQR /></Layout>} />
            <Route path={ROUTES.ACTIVIDAD} element={<Layout><Actividad /></Layout>} />
            <Route path={ROUTES.FINAL} element={<Layout><Final /></Layout>} />
            <Route path={ROUTES.VITRINA} element={<Layout><Vitrina /></Layout>} />
        </Routes>
    );
}

export default AppRouter;