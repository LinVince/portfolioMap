import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import PortfolioMap from "./pages/PortfolioMap";
import HomePage from "./pages/HomePage";
import PhotoGallery from "./pages/PhotoGallery";

const router = createBrowserRouter([
  {
    path: "/",
    //element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "portfolioMap", element: <PortfolioMap /> },
      { path: "portfolioGallery", element: <PhotoGallery /> },
    ],
  },
]);

export default router;
