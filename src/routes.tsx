import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PortfolioMap from "./pages/PortfolioMap";
import HomePage from "./pages/HomePage";
import PhotoGallery from "./pages/PhotoGallery";
import DataBreachesByType from "./pages/DataBreaches";
import Economy from "./pages/Economy";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/portfolioMap" element={<PortfolioMap />} />
        <Route path="/portfolioGallery" element={<PhotoGallery />} />
        <Route path="/dataBreaches" element={<DataBreachesByType />} />
        <Route path="/economy" element={<Economy />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
