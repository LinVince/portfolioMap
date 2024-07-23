import { Box, Typography } from "@mui/material";
import "../App.css";

const AnimatedTextsComponentMobile = () => {
  const fontFamily = "Orbitron, sans-serif";
  const fontSize = "3.5vw";

  /*useEffect(() => {
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
  }, []);*/

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
              // Light cyan background
              padding: 2,
              borderRadius: 2,
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
              padding: 2,
              borderRadius: 2,
            }}
          >
            <Typography
              fontSize={"2.5vw"}
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
              // Light green background
              padding: 2,
              borderRadius: 2,
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
              padding: 2,
              borderRadius: 2,
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
