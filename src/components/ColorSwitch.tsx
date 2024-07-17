import { Stack, Switch, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../reducers/darkModeReducer";

interface DarkModeState {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ColorModeSwitch: React.FC<DarkModeState> = () => {
  const darkMode = useSelector((state: any) => state.darkMode);
  const dispatch = useDispatch();

  const setDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <Box
      sx={
        {
          width: "150px",
          height: "auto",
          position: "absolute",
          top: "20px",
          right: "5px",
          zIndex: 999,
        } as any
      }
    >
      <Stack direction="row" alignItems="center">
        <Switch checked={darkMode} onChange={setDarkMode} />
        <Typography>Dark Mode</Typography>
      </Stack>
    </Box>
  );
};

export default ColorModeSwitch;
