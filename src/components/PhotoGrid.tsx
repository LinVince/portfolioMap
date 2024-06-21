import { Box, Grid, Container } from "@mui/material";
import PhotoCard from "./PhotoCard";
import NodeDetailModal from "./NodeDetailModal";
import { useState } from "react";

const PhotoGallery = ({ nodes }: { nodes: any[] }) => {
  const [nodeBrief, setNodeBrief] = useState<any>(undefined);
  const [modalOpen, setModalOpen] = useState(false);

  //Event Triggered by Clicking Nodes
  const nodeClickEvent = (node: any) => {
    setModalOpen(true);
    setNodeBrief(node);
    console.log(nodeBrief);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "15vh",
          width: "100%",
        }}
      >
        <Container sx={{ p: 0, m: 0 }}>
          <Grid container spacing={3}>
            {nodes.map((node, index) => (
              <Grid
                sx={{ display: "flex", justifyContent: "center" }}
                item
                xs={12}
                sm={6}
                md={4}
                key={index}
              >
                <PhotoCard
                  node={node}
                  nodeClickEvent={() => nodeClickEvent(node)}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <NodeDetailModal
        open={modalOpen}
        handleModalClose={handleModalClose}
        node={nodeBrief}
      />
    </>
  );
};

export default PhotoGallery;
