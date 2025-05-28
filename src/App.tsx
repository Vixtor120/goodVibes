import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"
import './App.css';
import './styles/summerTheme.css'; // Importamos los estilos de verano
import './styles/summerAnimations.css'; // Importamos las animaciones veraniegas
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import EpisodesPage from './pages/EpisodesPage';
import ContactPage from './pages/ContactPage';
import EpisodeDetailPage from './pages/EpisodeDetailPage';
import ProductionPage from './pages/ProductionPage';
import LicensePage from './pages/LicensePage';

function App() {
  
  return (
    <Router>
      <ScrollToTop /> {/* Este componente resuelve el problema de scroll */}      <div className="min-h-screen bg-gradient-summer flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/episodios" element={<EpisodesPage />} />
            <Route path="/episodios/:id" element={<EpisodeDetailPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/produccion" element={<ProductionPage />} />
            <Route path="/licencias" element={<LicensePage />} />
          </Routes>
        </main>
        <Footer />
        <Analytics />
      </div>
    </Router>
  );
}

export default App;
