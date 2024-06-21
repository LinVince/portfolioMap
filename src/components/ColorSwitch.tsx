import { Stack, Switch, Box } from "@mui/material";

interface DarkModeState {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ColorModeSwitch: React.FC<DarkModeState> = ({
  darkMode,
  setDarkMode,
}) => {
  const handleColorSwitch = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Box
      sx={{
        width: "150px",
        height: "auto",
        position: "absolute",
        top: "20px",
        right: "5px",
        zIndex: "999",
      }}
    >
      <Stack direction="row" alignItems="center">
        <Switch checked={darkMode} onChange={handleColorSwitch} />
        <div>Dark Mode</div>
      </Stack>
    </Box>
  );
};

export default ColorModeSwitch;
