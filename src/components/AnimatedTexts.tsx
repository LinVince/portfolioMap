import { useEffect } from "react";
import { gsap } from "gsap";
import { Box, Typography } from "@mui/material";

const AnimatedTextsComponent = () => {
  const fontFamily = "Orbitron, sans-serif";
  const fontSize = "32px";

  useEffect(() => {
    const timeline = gsap.timeline({ repeat: -1 });

    timeline.fromTo(
      "#e1",
      { opacity: 0, duration: 1 },
      { opacity: 1, duration: 0.5 }
    );

    timeline.fromTo(
      "#e2",
      { opacity: 0, duration: 1 },
      { opacity: 1, x: 600, rotate: -60, duration: 0.5 }
    );
    timeline.fromTo(
      "#e3",
      { opacity: 0, x: 900, duration: 1 },
      { opacity: 1, x: 700, duration: 0.5 }
    );

    timeline.fromTo(
      "#e4",
      { opacity: 0, y: 600, duration: 0.5 },
      { opacity: 1, y: 100, duration: 0.5 }
    );

    timeline.to({}, { duration: 2 });
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "90%",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          marginTop: 40,
          marginLeft: 5,
          overflow: "hidden",

          height: 600,
        }}
      >
        <Box
          className="textBox"
          id="e1"
          sx={{
            position: "absolute",
            backgroundColor: "rgba(0, 255, 255, 0.1)", // Light cyan background
            padding: 2,
            borderRadius: 2,
            boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)", // Neon glow
            border: "1px solid rgba(0, 255, 255, 0.3)",
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
            position: "absolute",
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
            position: "absolute",
            backgroundColor: "rgba(50, 205, 50, 0.1)", // Light green background
            padding: 2,
            borderRadius: 2,
            boxShadow: "0 0 10px rgba(50, 205, 50, 0.5)", // Green neon glow
            border: "1px solid rgba(50, 205, 50, 0.3)",
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
            position: "absolute",
            backgroundColor: "rgba(255, 215, 0, 0.1)", // Light gold background
            padding: 2,
            borderRadius: 2,
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

export default AnimatedTextsComponent;
