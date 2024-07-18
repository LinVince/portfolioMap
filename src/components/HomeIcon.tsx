import { IconButton, Link, Box } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { useSelector } from "react-redux";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const BackToHomeIcon = ({ style }: any) => {
  const darkMode = useSelector((state: any) => state.darkMode);

  useGSAP(() => {
    gsap.to("#iconRef", { x: 70, repeat: -1, yoyo: true, duration: 2 });
  }, []);

  return (
    <Box>
      <Link href="/">
        <IconButton id="iconRef" sx={style}>
          <ArrowCircleLeftIcon
            style={{
              fontSize: "32px",
              color: darkMode ? "#333333" : "#EAEAEA",
            }}
          />
        </IconButton>
      </Link>
    </Box>
  );
};

export default BackToHomeIcon;
