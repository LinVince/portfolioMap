import { Box, Typography, useMediaQuery } from "@mui/material";
import "../App.css";
import { useEffect } from "react";
import { TextPlugin } from "gsap/TextPlugin";
import { gsap } from "gsap";

gsap.registerPlugin(TextPlugin);
const fontFamily = "Orbitron, sans-serif";

export const AnimatedTextsComponent = () => {
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

interface TextFadeProps {
  DOM_array: string[];
  Icon_path: string | "";
  title: string;
  content: string[][];
}

export function TextFade({
  DOM_array,
  Icon_path,
  title,
  content,
}: TextFadeProps) {
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });

    DOM_array.map((d) => {
      tl.to(`${d} > *`, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
      });
      tl.to(`${d} > *`, {
        y: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        delay: 4,
      });
    });
  }, []);

  return (
    <>
      {/* The Column of Skills */}
      <Box
        flex="1 1 300px"
        flexDirection="column"
        justifyContent="center"
        p={{ xs: 5, md: 10 }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={Icon_path}
            alt={Icon_path}
            width={0}
            height={0}
            style={{ width: "30px", height: "30px", objectFit: "contain" }}
          />
          <Typography
            sx={{
              fontFamily: { fontFamily }, // Ensure font family is referenced correctly
              fontWeight: 600,
              fontSize: "18px",
              px: 1,
            }}
          >
            {title}
          </Typography>
        </Box>

        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "300px",
            marginTop: 5,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {DOM_array.map((d, i) => (
            <Box
              key={i} // Use a unique key for each mapped component
              id={d.slice(1)} // Removing the '#' or similar character
              sx={{
                position: "absolute",
                top: 0,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {content[i].map((c, index) => (
                <Typography
                  key={index} // Ensure each Typography has a unique key
                  sx={{
                    opacity: 0,
                    fontSize: "16px",
                    fontFamily: { fontFamily }, // Fix font family reference here too
                    fontWeight: 400,
                    whiteSpace: "nowrap",
                    mb: 1,
                    textAlign: "center",
                  }}
                >
                  {c}
                </Typography>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
