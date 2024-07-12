import { IconButton, Link, Box } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { useSelector } from "react-redux";

const BackToHomeIcon = ({ style }: any) => {
  const darkMode = useSelector((state: any) => state.darkMode);

  return (
    <Box>
      <Link href="/">
        <IconButton sx={style}>
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
