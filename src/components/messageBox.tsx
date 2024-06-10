import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Button,
  Box,
} from "@mui/material";
/*Expected Props: When you pass props to the MessageBox component, such as in <MessageBox myGod="hei" msg="hei" />, those props will be combined into a single object { myGod: "hei", msg: "hei" } and passed to the component.*/

const MessageBox = ({ node, nodeClickEvent }: any) => {
  if (node === undefined) {
    return <></>;
  } else {
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
          <CardMedia
            component="img"
            width="100%"
            height="auto"
            image={node.img}
            alt={node.text}
          />
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
