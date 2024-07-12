import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import PortfolioMap from "./pages/PortfolioMap";
import HomePage from "./pages/HomePage";
import PhotoGallery from "./pages/PhotoGallery";
import ExperiencePage from "./pages/ExperiencePage";
import DataBreaches from "./pages/DataBreaches";
import Services from "./pages/Services";

const router = createBrowserRouter([
  {
    path: "/",
    //element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "portfolioMap", element: <PortfolioMap /> },
      { path: "portfolioGallery", element: <PhotoGallery /> },
      { path: "experience", element: <ExperiencePage /> },
      { path: "dataBreaches", element: <DataBreaches /> },
      { path: "services", element: <Services /> },
    ],
  },
]);

export default router;
