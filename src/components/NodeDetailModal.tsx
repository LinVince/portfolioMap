import {
  Modal,
  Box,
  Button,
  Typography,
  useTheme,
  Skeleton,
  Chip,
} from "@mui/material";
import NodeDetail from "../data/NodeDetail";
import "../index.css";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";

interface Node {
  code: number;
}

interface OverviewProp {
  content: {
    class: string;
    text: string;
  }[];
}

const OverviewBox = ({ content }: OverviewProp) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          width: "100%",
          my: 5,
          pb: 5,
          px: 5,
          borderLeft: "3px solid #e0e0e0",
        }}
      >
        {content.map((object) => {
          return (
            <>
              <Typography className={object.class}>{object.text}</Typography>
            </>
          );
        })}
      </Box>
    </Box>
  );
};

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
  const isMobile = useMediaQuery("(max-width: 600px)");

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
    width: isMobile ? "95%" : "80%",
    bgcolor: theme.palette.background.default,
    boxShadow: 24,
    borderRadius: 3,
    overflow: "auto",
  };

  const InnerBoxStyle = {
    p: 4,
  };

  const nodeDetail = NodeDetail[node.code];
  const { banner, title, description, overview, text, skill } = nodeDetail;

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
                animation="wave"
                variant="rectangular"
                width="100%"
                height={isMobile ? "200px" : "600px"}
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
            {skill.map((skill) => {
              return (
                <>
                  <Chip label={skill} sx={{ mb: 4, mr: 1 }} />
                </>
              );
            })}
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <Typography style={{ paddingTop: 5 }}>{description}</Typography>
            <OverviewBox content={overview} />
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
                    {!imageLoaded && (
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width="100%"
                        height={isMobile ? "200px" : "600px"}
                      />
                    )}
                    <img
                      key={index}
                      src={item.src}
                      onLoad={handleImageLoad}
                      style={{
                        display: imageLoaded ? "block" : "none",
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                      }}
                    />
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
