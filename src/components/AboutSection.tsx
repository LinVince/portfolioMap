import { Box, Typography, Container, Grid, Card } from "@mui/material";


const AboutSection = () => {
  const roles = [
    {
      emoji: "📚",
      title: "Computing Lecturer",
      description: "Teaching Python, AI, and Machine Learning to inspire the next generation",
    },
    {
      emoji: "🎓",
      title: "HCI Researcher",
      description: "Combining pedagogical theories with human-computer interaction design",
    },
    {
      emoji: "🎥",
      title: "AI Evangelist",
      description: "Creating educational content about AI on YouTube",
    },
    {
      emoji: "🛡️",
      title: "Security Expert",
      description: "8+ years in cybersecurity and data protection solutions",
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
          About Me
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            color: "#1a4d7a",
            mb: 6,
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          A multidisciplinary professional bridging education, design, and technology
        </Typography>

        <Grid container spacing={3} sx={{ mb: 8 }}>
          {roles.map((role, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  p: 3,
                  height: "100%",
                  backgroundColor: "#e3f2fd",
                  border: "1px solid rgba(2, 119, 189, 0.2)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 24px rgba(13, 71, 161, 0.15)",
                    backgroundColor: "#fff",
                  },
                }}
              >
                <Typography sx={{ fontSize: "2.5rem", mb: 2 }}>
                  {role.emoji}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "#0d47a1", mb: 1 }}
                >
                  {role.title}
                </Typography>
                <Typography sx={{ color: "#1a4d7a", fontSize: "0.95rem" }}>
                  {role.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Bio */}
        <Box
          sx={{
            backgroundColor: "#fff",
            p: 4,
            borderRadius: "12px",
            border: "1px solid rgba(2, 119, 189, 0.2)",
          }}
        >
          <Typography sx={{ color: "#1a4d7a", lineHeight: 1.8, fontSize: "1.05rem" }}>
            With a background in language education, cybersecurity, and full-stack development, 
            I've spent the last 8+ years helping organizations innovate through thoughtful design 
            and technology. My passion lies in making complex concepts accessible through education 
            and creating beautiful, functional digital experiences.
          </Typography>
          <Typography
            sx={{
              color: "#1a4d7a",
              lineHeight: 1.8,
              fontSize: "1.05rem",
              mt: 2,
            }}
          >
            When I'm not teaching or building, you'll find me exploring the intersection of 
            AI and pedagogy, sharing insights on YouTube, or working on open-source projects 
            that make a difference.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutSection;
