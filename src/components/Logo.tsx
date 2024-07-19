import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

const Logo = () => {
  const darkMode = useSelector((state: any) => state.darkMode);
  const isDevice = useMediaQuery("(max-width:800px)");
  const path = darkMode
    ? "../image/logoYueh_dark.png"
    : "../image/logoYueh.png";

  const logoRef = useRef(null);

  useEffect(() => {
    const logo = logoRef.current;

    const tl = gsap.timeline({ repeat: -1 });

    tl.to(logo, { scale: 1.2, duration: 0.3, ease: "power2.out" })
      .to(logo, { scale: 1, duration: 0.3, ease: "power2.in" })
      .to(logo, { scale: 1.1, duration: 0.3, ease: "power2.out" })
      .to(logo, { scale: 1, duration: 0.3, ease: "power2.in" });

    // Interval to restart the animation every 5 seconds
    const interval = setInterval(() => {
      tl.restart();
    }, 5000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <Box ref={logoRef} sx={{ position: "absolute", top: 5, left: 5 }}>
      <img width={isDevice ? "70px" : "100px"} src={path} alt="Yueh Logo" />
    </Box>
  );
};

export default Logo;
