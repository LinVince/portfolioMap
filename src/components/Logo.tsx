import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

const Logo = () => {
  const darkMode = useSelector((state: any) => state.darkMode);
  const isDevice = useMediaQuery("(max-width:800px)");
  const path = darkMode
    ? "../image/logoYueh_dark.png"
    : "../image/logoYueh.png";
  return (
    <Box sx={{ position: "absolute", top: 5, left: 5 }}>
      <img width={isDevice ? "70px" : "100px"} src={path} alt="Yueh Logo" />
    </Box>
  );
};

export default Logo;
