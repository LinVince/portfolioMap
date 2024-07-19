import { useGSAP } from "@gsap/react"; // Ensure this is correctly imported
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";

gsap.registerPlugin(ScrollTrigger);

type Animation = any;

const animation: Animation = {
  from: {
    0: {
      opacity: 0,
      x: 0,
      rotation: 0,
    },
    1: {
      opacity: 0,
      x: "100%",
      rotation: 30,
    },
    2: {
      opacity: 0,
      x: 0,
      rotation: 0,
    },
  },
  to: {
    0: {
      opacity: 1,
      x: "20%",
      rotation: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        start: "top 80%",
        end: "top 20%",
        scrub: true,
      },
    },
    1: {
      opacity: 1,
      x: "10%",
      rotation: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        start: "top 80%",
        end: "top 20%",
        scrub: true,
      },
    },
    2: {
      opacity: 1,
      x: "10%",
      rotation: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        start: "top 80%",
        end: "top 50%",
        scrub: true,
      },
    },
  },
};

const ScrollTriggerText = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isDevice = useMediaQuery("(max-width:800px)");
  useGSAP(
    () => {
      if (scrollRef.current) {
        const boxes = gsap.utils.toArray(scrollRef.current.children);

        boxes.forEach((box: any, index) => {
          const scrollTrigger = {
            ...animation.to[index].scrollTrigger,
            trigger: box,
          };
          // Apply different animations based on the index
          gsap.fromTo(box, animation.from[index], {
            ...animation.to[index],
            scrollTrigger,
          });
        });
      } else {
        console.warn("scrollRef.current is not defined");
      }
    },
    { scope: scrollRef }
  );

  return (
    <Box
      ref={scrollRef}
      sx={{
        width: "100%",
        display: "block",
        marginTop: 50,
        overflow: "hidden",
      }}
    >
      <Box className="box" sx={{ width: "auto", height: 800 }}>
        <Typography
          fontSize={isDevice ? "24px" : "60px"}
          fontWeight={700}
          fontFamily="Roboto"
        >
          Hello! How is everything?
        </Typography>
      </Box>

      <Box className="box" sx={{ width: "auto", height: 500 }}>
        <Typography
          fontSize={isDevice ? "24px" : "60px"}
          fontWeight={700}
          fontFamily="Roboto"
        >
          I'm Yueh, a UX Designer/Frontend Developer
        </Typography>
      </Box>
      <Box className="box" sx={{ width: "auto", height: 500 }}>
        <Typography
          fontSize={isDevice ? "24px" : "60px"}
          fontWeight={700}
          fontFamily="Roboto"
        >
          Walk around and enjoy!
        </Typography>
      </Box>
    </Box>
  );
};

export default ScrollTriggerText;
