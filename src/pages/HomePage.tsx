import ThreeJSPage from "../components/ThreeJSPage";
import { TypeWritterEffect, TextFade } from "../components/AnimatedTexts";
import {
  intro,
  technical_skill,
  product_skill,
  advantage,
} from "../data/FrontPageIntro";
import { Box, Typography } from "@mui/material";
import MuxPlayer from "@mux/mux-player-react";

const fontFamilyStyle = "inter, san serif";

function HomePage() {
  return (
    <>
      {/*Upcoming product lanuch section */}
      <Box
        sx={{
          width: "100%",
          height: "800px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <MuxPlayer
            playbackId="yKForX3JCoOlGFHbKaxEfplqJzz00RqsKyEQ3frY01PvY"
            streamType="on-demand"
            autoPlay="muted"
            muted
            loop
            style={{
              width: "100%",
              height: "120vh",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              backgroundColor: "#00000055",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 2, // Ensures text is above the image
            }}
          >
            <Typography
              sx={{
                color: "#ffffffaa",
                fontWeight: "700",
                fontFamily: fontFamilyStyle,
                fontSize: { xs: "30px", md: "40px" },
                textAlign: "center",
                letterSpacing: "0.3em",
                mb: 2,
                px: 2,
              }}
            >
              Create, Share, Sell Your Memories
            </Typography>
            <Typography
              sx={{
                color: "#ffffffaa",
                fontWeight: "400",
                fontFamily: fontFamilyStyle,
                fontSize: { xs: "20px", md: "24px" },
                textAlign: "center",
                letterSpacing: "0.2em",
                px: 2,
              }}
            >
              New Product Launch Coming Soon
            </Typography>
          </Box>
        </Box>
      </Box>
      {/*Self introduction section */}
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
