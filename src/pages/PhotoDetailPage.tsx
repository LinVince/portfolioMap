import { Box, Typography } from "@mui/material";

const PhotoDetailPage = () => {
  return (
    <Box
      direction={{ base: "column", md: "row" }}
      align="center"
      p={5}
      borderWidth={1}
      borderRadius="lg"
      overflow="hidden"
    >
      <Box flexShrink={0} width={{ base: "100%", md: "50%" }}>
        <img
          src={photo.src.original}
          alt={photo.alt}
          objectFit="cover"
          width="100%"
          height="100%"
          borderRadius="lg"
        />
      </Box>
      <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }} flexGrow={1}>
        <Typography as="h3" size="lg" mb={2}>
          Hello
        </Typography>
        <Typography fontSize="md" color="black.600">
          Hello
        </Typography>
      </Box>
    </Box>
  );
};

export default PhotoDetailPage;
