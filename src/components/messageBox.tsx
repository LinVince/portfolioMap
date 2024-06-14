import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Button,
  Box,
  Skeleton,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
/*Expected Props: When you pass props to the MessageBox component, such as in <MessageBox myGod="hei" msg="hei" />, those props will be combined into a single object { myGod: "hei", msg: "hei" } and passed to the component.*/

const MessageBox = ({ node, nodeClickEvent, onClose }: any) => {
  if (node === undefined) {
    return <></>;
  } else {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
      setImageLoaded(false); // Reset loading state when modal opens or node changes
    }, [node]);

    const handleImageLoad = () => {
      setImageLoaded(true);
    };

    return (
      <Container>
        <Card
          sx={{
            width: "50vh",
            position: "absolute", // Positioning the box
            bottom: "60px", // Top padding
            left: "10px", // Right padding
            border: "0px solid #555", // Border
            padding: "10px", // Padding inside the box
            borderRadius: "10px", // Rounded corners
            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Box sx={{ position: "relative", width: "100%", height: "auto" }}>
            <IconButton
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 1,
                color: "rgba(0, 0, 0, 0.2)", // Set the color with transparency
                "&:hover": {
                  color: "rgba(0, 0, 0, 0.8)", // Change color on hover
                },
              }}
              onClick={onClose}
            >
              <CloseIcon sx={{ fontSize: 12 }} />
            </IconButton>
            {!imageLoaded && (
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                height="300px"
              />
            )}
            <CardMedia
              style={{
                display: imageLoaded ? "block" : "none",
              }}
              component="img"
              width="100%"
              height="auto"
              image={node.img}
              alt={node.text}
              onLoad={handleImageLoad}
            />
          </Box>
          <CardContent>
            <Typography fontWeight="bold">{node.text}</Typography>
            <Typography>{node.skill}</Typography>
            <Typography fontSize="10px">
              {node.longitude}, {node.latitude}
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              onClick={nodeClickEvent}
              style={{ borderRadius: 30, paddingLeft: 20, paddingRight: 20 }}
            >
              Read More
            </Button>
          </Box>
        </Card>
      </Container>
    );
  }
};

export default MessageBox;
