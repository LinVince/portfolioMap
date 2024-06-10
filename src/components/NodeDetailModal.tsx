import {
  Modal,
  Box,
  Button,
  Typography,
  useTheme,
  Skeleton,
} from "@mui/material";
import NodeDetail from "../data/NodeDetail";
import "../index.css";
import { useState, useEffect } from "react";

interface Node {
  code: number;
}

const NodeDetailModal = ({
  open,
  handleModalClose,
  node,
}: {
  open: boolean;
  handleModalClose: () => void;
  node: Node | undefined;
}) => {
  if (!node) return <></>;

  const theme = useTheme();

  const linkStyle = {
    textDecoration: "none",
    color: theme.palette.text.primary,
  };

  const OuterBoxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    maxHeight: "90%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: theme.palette.background.default,
    boxShadow: 24,
    borderRadius: 3,
    overflow: "auto",
  };

  const InnerBoxStyle = {
    p: 4,
  };

  const nodeDetail = NodeDetail[node.code];
  const { banner, title, description, text } = nodeDetail;

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false); // Reset loading state when modal opens or node changes
  }, [node]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={OuterBoxStyle}>
          <Box sx={{ position: "relative", width: "100%", height: "auto" }}>
            {!imageLoaded && (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ position: "absolute", top: 0, left: 0 }}
              />
            )}
            <img
              id="banner"
              src={banner}
              onLoad={handleImageLoad}
              style={{
                display: imageLoaded ? "block" : "none",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              alt="Banner"
            />
          </Box>
          <Box sx={InnerBoxStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <Typography style={{ paddingTop: 5 }}>{description}</Typography>
            {text.map((item, index) => {
              if (item.tag === "img") {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      backgroundColor: "#ffffff",
                      marginTop: 5,
                      marginBottom: 5,
                    }}
                  >
                    <img key={index} src={item.src} />
                  </Box>
                );
              } else if (item.tag === "a") {
                return (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={linkStyle}
                  >
                    {item.text}
                  </a>
                );
              } else {
                return (
                  <Typography key={index} className={item.class}>
                    {item.text}
                  </Typography>
                );
              }
            })}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                onClick={handleModalClose}
                style={{ borderRadius: 30, paddingLeft: 20, paddingRight: 20 }}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default NodeDetailModal;
