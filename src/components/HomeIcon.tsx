import { IconButton, Link, Box } from "@mui/material";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";

const BackToHomeIcon = ({ style }: any) => {
  return (
    <Box>
      <Link href="/">
        <IconButton sx={style}>
          <HomeWorkRoundedIcon
            style={{ fontSize: "32px", color: "#d5d5d599" }}
          />
        </IconButton>
      </Link>
    </Box>
  );
};

export default BackToHomeIcon;
