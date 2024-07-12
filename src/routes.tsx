import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import PortfolioMap from "./pages/PortfolioMap";
import HomePage from "./pages/HomePage";
import PhotoGallery from "./pages/PhotoGallery";
import ExperiencePage from "./pages/ExperiencePage";
import DataBreaches from "./pages/DataBreaches";
import Services from "./pages/Services";
import ScrollToTop from "./components/ScrollToTop";

const AppRouter = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolioMap" element={<PortfolioMap />} />
        <Route path="/portfolioGallery" element={<PhotoGallery />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/dataBreaches" element={<DataBreaches />} />
        <Route path="/services" element={<Services />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
