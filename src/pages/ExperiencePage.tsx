import { ExperienceTimeline, ExperiencePaper } from "../components/Experience";
import { useMediaQuery } from "@mui/system";
import BackToHomeIcon from "../components/HomeIcon";

function ExperiencePage() {
  const isDevice = useMediaQuery("(max-width: 800px)");
  const HomeStyle = {
    position: "fixed !important",
    bottom: "10px",
    left: "10px",
  };

  return (
    <>
      <BackToHomeIcon style={HomeStyle} />
      {!isDevice && <ExperienceTimeline />}
      {isDevice && <ExperiencePaper />}
    </>
  );
}

export default ExperiencePage;
