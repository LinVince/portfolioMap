import { Box, Typography, useMediaQuery } from "@mui/material";
import "../App.css";
import { useEffect } from "react";
import { TextPlugin } from "gsap/TextPlugin";
import { gsap } from "gsap";

gsap.registerPlugin(TextPlugin);
const fontFamily = "Orbitron, sans-serif";

const AnimatedTextsComponent = () => {
  const isDevice = useMediaQuery("(max-width:600px)");
  const fontSize = isDevice ? "5vw" : "2vw";
  return (
    <>
      {/*border effect defined in css*/}
      <Box
        sx={{
          width: "90%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start",
          marginTop: 20,
          overflow: "hidden",
          flexWrap: "wrap",
          height: "500px",
        }}
      >
        <Box
          className="textBox"
          id="e1"
          sx={{
            padding: 2,
            margin: 5,
            borderRadius: 2,
            boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)", // Neon glow
          }}
        >
          <Typography
            fontSize={fontSize}
            fontWeight={500}
            fontFamily={fontFamily}
            color="#00FFFF"
          >
            Hi! I'm Yueh, Product Designer
          </Typography>
        </Box>

        <Box
          id="e2"
          sx={{
            height: "100px",
            padding: 2,
            borderRadius: 2,
          }}
        >
          <Typography
            fontSize={"24px"}
            fontWeight={500}
            fontFamily={fontFamily}
          >
            AND
          </Typography>
        </Box>

        <Box
          id="e3"
          className="textBox"
          sx={{
            padding: 2,
            borderRadius: 2,
            margin: 5,
          }}
        >
          <Typography
            fontSize={fontSize}
            fontWeight={500}
            fontFamily={fontFamily}
            color="#66FF66"
          >
            Frontend Developer
          </Typography>
        </Box>

        <Box
          id="e4"
          className="textBox"
          sx={{
            padding: 2,
            borderRadius: 2,
            margin: 5,
            boxShadow: "0 0 10px rgba(255, 215, 0, 0.5)", // Gold neon glow
            border: "1px solid rgba(255, 215, 0, 0.3)",
          }}
        >
          <Typography
            fontSize={fontSize}
            fontWeight={500}
            fontFamily={fontFamily}
            color="#FFD700"
          >
            8+ Years in Cybersecurity - Crypto Solution
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export const TypeWritterEffect = ({ Text }: { Text: String[] }) => {
  const isDevice = useMediaQuery("(max-width:600px)");
  const fontSize = isDevice ? "5vw" : "2vw";
  useEffect(() => {
    gsap.to("#cursor", {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: "power2.inOut",
    });
    let tlMaster = gsap.timeline({ repeat: -1 });

    Text.forEach((word: any) => {
      const tlText = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 });
      tlText.to("#animated_text", { duration: 1, text: word });
      tlMaster.add(tlText);
    });
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "95%",
          height: isDevice ? "600px" : "800px",
          display: "flex",
          p: 10,
          paddingTop: 40,
        }}
      >
        <Box id="textArea">
          <Typography
            id="animated_text"
            display="inline"
            fontSize={fontSize}
            fontFamily={fontFamily}
          ></Typography>
          <Typography
            id="cursor"
            display="inline"
            fontSize={fontSize}
            fontFamily={fontFamily}
          >
            {"   "}|{"   "}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default AnimatedTextsComponent;
