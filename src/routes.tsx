import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import PortfolioMap from "./pages/PortfolioMap";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    //element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "portfolioMap", element: <PortfolioMap /> },
    ],
  },
]);

export default router;
