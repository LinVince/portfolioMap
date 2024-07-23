import { useEffect } from "react";
import { gsap } from "gsap";
import { Box, Typography } from "@mui/material";

const AnimatedTextsComponentMobile = () => {
  const fontFamily = "Orbitron, sans-serif";
  const fontSize = "5vw";

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
      { opacity: 1, duration: 0.5 }
    );
    timeline.fromTo(
      "#e3",
      { opacity: 0, duration: 1 },
      { opacity: 1, duration: 0.5 }
    );

    timeline.fromTo(
      "#e4",
      { opacity: 0, duration: 0.5 },
      { opacity: 1, duration: 0.5 }
    );

    timeline.to({}, { duration: 5 });
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 40,
            overflow: "hidden",
            height: 600,
          }}
        >
          <Box
            className="textBox"
            id="e1"
            sx={{
              backgroundColor: "rgba(0, 255, 255, 0.1)", // Light cyan background
              padding: 1,
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
              textAlign="center"
            >
              Hi! I'm Yueh, Product Designer
            </Typography>
          </Box>

          <Box
            id="e2"
            sx={{
              padding: 1,
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
              backgroundColor: "rgba(50, 205, 50, 0.1)", // Light green background
              padding: 1,
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
              textAlign="center"
            >
              Frontend Developer
            </Typography>
          </Box>

          <Box
            id="e4"
            className="textBox"
            sx={{
              backgroundColor: "rgba(255, 215, 0, 0.1)", // Light gold background
              padding: 1,
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
              textAlign="center"
            >
              8+ Years in Cybersecurity - Crypto Solution
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AnimatedTextsComponentMobile;
