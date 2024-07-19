import { IconButton, Link, Box, useMediaQuery } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { useSelector } from "react-redux";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const BackToHomeIcon = ({ style }: any) => {
  const darkMode = useSelector((state: any) => state.darkMode);
  const isDevice = useMediaQuery("(max-width:800px)");

  useGSAP(() => {
    gsap.to("#iconRef", {
      x: isDevice ? 5 : 30,
      repeat: -1,
      yoyo: true,
      duration: isDevice ? 0.8 : 2,
    });
  }, []);

  return (
    <Box>
      <Link href="/">
        <IconButton id="iconRef" sx={style}>
          <ArrowCircleLeftIcon
            style={{
              fontSize: "32px",
              color: darkMode ? "#555555" : "#DDDDDD",
            }}
          />
        </IconButton>
      </Link>
    </Box>
  );
};

export default BackToHomeIcon;
