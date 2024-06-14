import { Button, Stack, Typography } from "@mui/material";
import { darkThemeOptions, lightThemeOptions } from "../theme";

interface MapNode {
  text: string;
  longitude: number;
  latitude: number;
}

export default function ButtonGroup({
  darkMode,
  layout,
  objects,
  onButtonClick,
}: {
  darkMode: boolean;
  layout: string;
  objects: MapNode[];
  onButtonClick: (node: MapNode) => void;
}) {
  const theme = darkMode ? darkThemeOptions : lightThemeOptions;

  return (
    <>
      <Stack
        sx={{
          flexDirection: layout,
          justifyContent: layout === "row" ? "center" : "flex-start",
          position: "absolute",
          top: "10px",
          left: "10px",
        }}
      >
        {objects.map((o) => (
          <Button
            onClick={() => onButtonClick(o)}
            sx={{
              paddingX: 0.8,
              marginX: 1,
              width: "fit-content",
              borderRadius: "30px",
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Typography
              noWrap
              style={{
                fontSize: "12px",
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
