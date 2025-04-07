import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ROUTES from './routerConfig';

import ModoJuego from "../Components/ModoJuego";
import Portada from "../Components/Portada";
import Form from "../Components/Form";
import Mapa from "../Components/Mapa";
import EscanerQR from '../Components/EscanerQR';
import Actividad from "../Components/Actividad";
import EntreActividades from "../Components/EntreActividades";
import Final from "../Components/Final";
import Vitrina from "../Components/Vitrina";

function AppRouter() {
    return(
        <Routes>
            <Route path={ROUTES.MODOJUEGO} element={<ModoJuego />} /> 
            <Route path={ROUTES.PORTADA} element={<Portada />} />
            <Route path={ROUTES.FORM} element={<Form />} />
            <Route path={ROUTES.MAPA} element={<Mapa />} />
            <Route path={ROUTES.ENTREACTIVIDADES} element={<EntreActividades />} />
            <Route path={ROUTES.ESCANERQR} element={<EscanerQR />} />
            <Route path={ROUTES.ACTIVIDAD} element={<Actividad />} />
            <Route path={ROUTES.FINAL} element={<Final />} />
            <Route path={ROUTES.VITRINA} element={<Vitrina />} />
        </Routes>
    );
}

export default AppRouter;