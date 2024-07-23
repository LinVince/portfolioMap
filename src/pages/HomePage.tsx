import ThreeJSPage from "../components/ThreeJSPage";
import AnimatedTextsComponent from "../components/AnimatedTexts";
import AnimatedTextsComponentMobile from "../components/AnimatedTextsMobile";
import { useMediaQuery } from "@mui/system";

function HomePage() {
  const isDevice = useMediaQuery("(max-width:1200px)");
  return (
    <>
      {isDevice ? <AnimatedTextsComponentMobile /> : <AnimatedTextsComponent />}
      <ThreeJSPage />
    </>
  );
}

export default HomePage;
