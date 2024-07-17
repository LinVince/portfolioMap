import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import PortfolioMap from "./pages/PortfolioMap";
import HomePage from "./pages/HomePage";
import PhotoGallery from "./pages/PhotoGallery";
import ExperiencePage from "./pages/ExperiencePage";
import DataBreachesByType from "./pages/DataBreaches";
import Services from "./pages/Services";
import ScrollToTop from "./components/ScrollToTop";
import Dot from "./pages/Dots";

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
        <Route path="/dot" element={<Dot />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
