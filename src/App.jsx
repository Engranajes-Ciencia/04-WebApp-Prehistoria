import Header from "./Components/Header";
import AppRouter from "./config/AppRouter";
import Footer from "./Components/Footer";
import ConnectionAlert from "./Components/ConnectionAlert";
import "./index.css";

function App() {
  return (
    <div className="contenido-principal">
      <Header />
      <AppRouter />
      <ConnectionAlert />
      <Footer />
    </div>
  );
}


export default App;

