import PhotoGrid from "../components/PhotoGrid";
import nodes from "../data/Nodes";
import BackToHomeIcon from "../components/HomeIcon";
import { Box, Chip } from "@mui/material";
import { Skills } from "../data/NodeDetail";

function PhotoGallery() {
  const HomeStyle = {
    position: "fixed",
    bottom: "10px",
    left: "10px",
  };
  return (
    <>
      <BackToHomeIcon style={HomeStyle} />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            width: "100%",
            px: 5,
            pt: 15,
            display: "flex",
            justifyContent: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          {Skills.map((skill) => {
            return <Chip label={skill} />;
          })}
        </Box>
      </Box>
      <PhotoGrid nodes={nodes} />
    </>
  );
}

export default PhotoGallery;
