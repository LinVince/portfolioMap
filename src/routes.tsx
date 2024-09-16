import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuroraHero from "./pages/ErrorPage";
import PortfolioMap from "./pages/PortfolioMap";
import HomePage from "./pages/HomePage";
import PhotoGallery from "./pages/PhotoGallery";
import ExperiencePage from "./pages/ExperiencePage";
import DataBreachesByType from "./pages/DataBreaches";
import Services from "./pages/Services";
import ScrollToTop from "./components/ScrollToTop";
import Economy from "./pages/Economy";

const AppRouter = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolioMap" element={<PortfolioMap />} />
        <Route path="/portfolioGallery" element={<PhotoGallery />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/dataBreaches" element={<DataBreachesByType />} />
        <Route path="/services" element={<Services />} />
        <Route path="/economy" element={<Economy />} />
        <Route path="*" element={<AuroraHero />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
