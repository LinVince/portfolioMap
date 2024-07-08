import { ExperienceTimeline, ExperiencePaper } from "../components/Experience";
import { useMediaQuery } from "@mui/system";

function ExperiencePage() {
  const isDevice = useMediaQuery("(max-width: 800px)");
  return (
    <>
      {!isDevice && <ExperienceTimeline />}
      {isDevice && <ExperiencePaper />}
    </>
  );
}

export default ExperiencePage;
