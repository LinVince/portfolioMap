import ThreeJSPage from "../components/ThreeJSPage";
import { TypeWritterEffect } from "../components/AnimatedTexts";

import { intro } from "../data/FrontPageIntro";

function HomePage() {
  return (
    <>
      <TypeWritterEffect Text={intro} />
      <ThreeJSPage />
    </>
  );
}

export default HomePage;
