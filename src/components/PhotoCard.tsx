import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
/*Expected Props: When you pass props to the MessageBox component, such as in <MessageBox myGod="hei" msg="hei" />, those props will be combined into a single object { myGod: "hei", msg: "hei" } and passed to the component.*/

const PhotoCard = ({ node, nodeClickEvent }: any) => {
  return (
    <Card
      sx={{
        width: "400px",
        border: "0px solid #555", // Border
        padding: "10px", // Padding inside the box
        borderRadius: "10px", // Rounded corners
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/*!imageLoaded && (
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height="300px"
          />
        )*/}
      <CardMedia
        style={{
          display: "block" /*imageLoaded ? "block" : "none"*/,
          objectFit: "cover",
        }}
        component="img"
        width="300px"
        height="250px"
        image={node.img}
        alt={node.text}
        /*onLoad={handleImageLoad}*/
      />

      <CardContent>
        <Typography noWrap fontWeight="bold">
          {node.text}
        </Typography>
        <Typography noWrap>{node.skill}</Typography>
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
          Visit
        </Button>
      </Box>
    </Card>
  );
};

export default PhotoCard;
