import { Box, Typography, Container, Grid, Card, Avatar } from "@mui/material";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager at TechCorp",
      text: "Working with Yueh was transformative. Their ability to bridge design and development while keeping pedagogical principles in mind resulted in a product that users genuinely loved.",
      avatar: "SC",
      color: "#0d47a1",
    },
    {
      name: "Dr. James Wilson",
      role: "Professor, University of London",
      text: "An exceptional educator who makes complex AI concepts accessible and engaging. Their students consistently rate them as one of the best teachers on campus.",
      avatar: "JW",
      color: "#0277bd",
    },
    {
      name: "Maria Rodriguez",
      role: "CEO, StartupXYZ",
      text: "The data visualization solutions delivered exceeded all expectations. Yueh's attention to detail and creative problem-solving set them apart from other developers.",
      avatar: "MR",
      color: "#01579b",
    },
    {
      name: "Ahmed Khan",
      role: "Cybersecurity Director",
      text: "A trusted partner for security implementations. Their expertise in both technical and educational aspects made compliance straightforward and manageable.",
      avatar: "AK",
      color: "#1565c0",
    },
  ];

  return (
    <Box
      sx={{
        py: 12,
        backgroundColor: "#f5f9ff",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            textAlign: "center",
            mb: 2,
            color: "#0d47a1",
          }}
        >
          Testimonials
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            color: "#1a4d7a",
            mb: 8,
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          What clients and collaborators have to say
        </Typography>

        <Grid container spacing={3}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Card
                sx={{
                  p: 4,
                  height: "100%",
                  backgroundColor: "#fff",
                  border: "1px solid rgba(2, 119, 189, 0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 12px 24px rgba(13, 71, 161, 0.1)",
                  },
                }}
              >
                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start", mb: 3 }}>
                  <Avatar
                    sx={{
                      backgroundColor: testimonial.color,
                      color: "white",
                      fontWeight: 700,
                      width: 48,
                      height: 48,
                    }}
                  >
                    {testimonial.avatar}
                  </Avatar>
                  <Box>
                    <Typography
                      sx={{ fontWeight: 700, color: "#0d47a1" }}
                    >
                      {testimonial.name}
                    </Typography>
                    <Typography
                      sx={{ color: "#1a4d7a", fontSize: "0.9rem" }}
                    >
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  sx={{
                    color: "#1a4d7a",
                    fontStyle: "italic",
                    lineHeight: 1.6,
                  }}
                >
                  "{testimonial.text}"
                </Typography>

                <Box sx={{ display: "flex", gap: 0.5, mt: 3 }}>
                  {[...Array(5)].map((_, i) => (
                    <Typography key={i} sx={{ color: "#ffc107", fontSize: "1.2rem" }}>
                      ★
                    </Typography>
                  ))}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
