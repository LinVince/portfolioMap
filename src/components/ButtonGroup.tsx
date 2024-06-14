import { Button, Stack, Typography } from "@mui/material";
import "../theme";
import { darkThemeOptions, lightThemeOptions } from "../theme";

interface MapNode {
  text: string;
  longitude: number;
  latitude: number;
}

export default function ButtonGroup({
  darkMode,
  objects,
  onButtonClick,
}: {
  darkMode: boolean;
  objects: MapNode[];
  onButtonClick: (node: MapNode) => void;
}) {
  const theme = darkMode ? darkThemeOptions : lightThemeOptions;

  return (
    <>
      <Stack
        sx={{
          flexDirection: "row",
          position: "absolute",
          top: "10px",
          left: "10px",
        }}
      >
        {objects.map((o) => (
          <Button
            onClick={() => onButtonClick(o)}
            sx={{
              paddingX: 5,
              marginX: 2,
              width: "auto",
              borderRadius: "30px",
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Typography
              noWrap
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                maxWidth: "100%",
                color: theme.palette.text.primary,
              }}
            >
              {o.text}
            </Typography>
          </Button>
        ))}
      </Stack>
    </>
  );
}
