import { Button, Stack, Typography } from "@mui/material";
import "../theme";
import { darkThemeOptions, lightThemeOptions } from "../theme";

interface MapNode {
  text: string;
  type: string;
  longitude: number;
  latitude: number;
}

export default function ButtonGroup({
  darkMode,
  objects,
}: {
  darkMode: boolean;
  objects: MapNode[];
}) {
  const theme = darkMode ? darkThemeOptions : lightThemeOptions;

  return (
    <>
      <Stack sx={{ position: "absolute", top: "10px", left: "10px" }}>
        {objects.map((o) => (
          <Button
            sx={{
              width: "200px",
              borderRadius: "30px",
              backgroundColor: theme.palette.background.paper + 50,
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
