import ThreeJSPage from "../components/ThreeJSPage";
import { TypeWritterEffect, TextFade } from "../components/AnimatedTexts";
import {
  intro,
  technical_skill,
  product_skill,
  advantage,
} from "../data/FrontPageIntro";
import { Box } from "@mui/material";

function HomePage() {
  return (
    <>
      <TypeWritterEffect Text={intro} />
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <TextFade
          DOM_array={["#technical_skill_1", "#technical_skill_2"]}
          Icon_path="../image/technical skill.png"
          title="Technical"
          content={technical_skill}
        />
        <TextFade
          DOM_array={["#product_skill_1", "#product_skill_2"]}
          Icon_path="../image/product.png"
          title="Product"
          content={product_skill}
        />
        <TextFade
          DOM_array={["#advantage_1", "#advantage_2"]}
          Icon_path="../image/advantage.png"
          title="Advantage"
          content={advantage}
        />
      </Box>
      <ThreeJSPage />
    </>
  );
}

export default HomePage;
