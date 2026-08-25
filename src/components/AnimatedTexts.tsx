import { Box, Typography, useMediaQuery } from "@mui/material";
import "../App.css";
import { useEffect, useState } from "react";
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

import { useSelector } from "react-redux";

export function TextFade({
  DOM_array,
  Icon_path,
  title,
  content,
}: TextFadeProps) {
  const [currentIndex, setIndex] = useState(0);
  const darkMode = useSelector((state: any) => state.darkMode);
  let thumbnailColor = darkMode ? ["#fff", "#777"] : ["#000", "#ccc"];

  useEffect(() => {
    const tl = gsap.timeline({
      repeat: -1,
      onRepeat: () => {
        handleCarousel();
      },
    });

    const handleCarousel = () => {
      setIndex((prev) => prev % DOM_array.length);
    };

    DOM_array.map((d, index) => {
      tl.to(`${d} > *`, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        onStart: () => {
          setIndex(index);
        },
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
        {/* Carousel Thumbnail Indicator */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 1,
          }}
        >
          {DOM_array.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: "10px",
                height: "10px",
                margin: "0 5px",
                borderRadius: "50%",
                backgroundColor:
                  currentIndex === index
                    ? thumbnailColor[0]
                    : thumbnailColor[1],
                transition: "background-color 0.3s ease",
              }}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}

export const HomeIntroAnimatedTexts = () => {
  const isDevice = useMediaQuery("(max-width:600px)");
  const fontSize = isDevice ? "5vw" : "2.2vw";
  
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 8,
          marginBottom: 12,
          overflow: "hidden",
          gap: 4,
          px: 2,
        }}
      >
        {/* Computing Lecturer Section */}
        <Box
          sx={{
            padding: 4,
            borderRadius: 3,
            boxShadow: "0 8px 24px rgba(13, 71, 161, 0.15)",
            border: "2px solid rgba(2, 119, 189, 0.3)",
            maxWidth: "95%",
            width: "100%",
     
            backgroundColor: "#e3f2fd",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 12px 32px rgba(13, 71, 161, 0.25)",
              transform: "translateY(-6px)",
              borderColor: "rgba(2, 119, 189, 0.6)",
            },
          }}
        >
          <Typography
            fontSize={fontSize}
            fontWeight={700}
            fontFamily={fontFamily}
            color="#0d47a1"
            textAlign="center"
            sx={{ mb: 2 }}
          >
            📚 Computing Lecturer
          </Typography>
          <Typography
            fontSize={isDevice ? "4vw" : "1.8vw"}
            fontWeight={600}
            fontFamily={fontFamily}
            color="#1565c0"
            textAlign="center"
          >
            Python, AI, Machine Learning
          </Typography>
        </Box>

        {/* Pedagogical Theories Section */}
        <Box
          sx={{
            padding: 4,
            borderRadius: 3,
            boxShadow: "0 8px 24px rgba(2, 119, 189, 0.15)",
            border: "2px solid rgba(2, 119, 189, 0.3)",
            maxWidth: "95%",
            width: "100%",
   
            backgroundColor: "#e1f5fe",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 12px 32px rgba(2, 119, 189, 0.25)",
              transform: "translateY(-6px)",
              borderColor: "rgba(2, 119, 189, 0.6)",
            },
          }}
        >
          <Typography
            fontSize={fontSize}
            fontWeight={700}
            fontFamily={fontFamily}
            color="#0277bd"
            textAlign="center"
            sx={{ mb: 2 }}
          >
            🎓 Pedagogical Innovation
          </Typography>
          <Typography
            fontSize={isDevice ? "4vw" : "1.8vw"}
            fontWeight={600}
            fontFamily={fontFamily}
            color="#01579b"
            textAlign="center"
          >
            Combining Pedagogical theories with human-computer interaction design
          </Typography>
        </Box>

        {/* YouTube Evangelist Section */}
        <Box
          sx={{
            padding: 4,
            borderRadius: 3,
            boxShadow: "0 8px 24px rgba(13, 71, 161, 0.15)",
            border: "2px solid rgba(13, 71, 161, 0.3)",
            maxWidth: "95%",
            width: "100%",
         
            backgroundColor: "#e3f2fd",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 12px 32px rgba(13, 71, 161, 0.25)",
              transform: "translateY(-6px)",
              borderColor: "rgba(13, 71, 161, 0.6)",
            },
          }}
        >
          <Typography
            fontSize={fontSize}
            fontWeight={700}
            fontFamily={fontFamily}
            color="#0d47a1"
            textAlign="center"
            sx={{ mb: 2 }}
          >
            🎥 AI Evangelist on YouTube
          </Typography>

          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "center",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Typography
              fontSize={isDevice ? "3.5vw" : "1.3vw"}
              fontWeight={600}
              fontFamily={fontFamily}
              color="#0d47a1"
            >
              Channel:
            </Typography>
            <Box
              sx={{
                minWidth: isDevice ? "160px" : "280px",
                padding: 2.5,
                backgroundColor: "#fff",
                border: "2px solid #0277bd",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(2, 119, 189, 0.1)",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "#f0f8ff",
                  boxShadow: "0 4px 12px rgba(2, 119, 189, 0.2)",
                },
              }}
            >
              <Typography
                fontSize={isDevice ? "2.8vw" : "1.1vw"}
                fontWeight={600}
                color="#0d47a1"
                textAlign="center"
              >
                [Your YouTube Channel]
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
