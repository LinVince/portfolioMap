import { Container, Box, Typography } from "@mui/material";
import AboutSection from "../components/AboutSection";

const AboutPage = () => {
  return (
    <Box>
      <AboutSection />
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#0d47a1",
            mb: 4,
          }}
        >
          My Journey
        </Typography>
        
        <Typography
          sx={{
            color: "#1a4d7a",
            fontSize: "1.1rem",
            lineHeight: 1.8,
            mb: 3,
          }}
        >
          My career has been defined by a passion for bridging the gap between technology and human learning. 
          Starting with a background in language education, I evolved into a full-stack developer and designer, 
          and eventually became an advocate for accessible AI and ethical technology.
        </Typography>

        <Typography
          sx={{
            color: "#1a4d7a",
            fontSize: "1.1rem",
            lineHeight: 1.8,
            mb: 3,
          }}
        >
          Over 8+ years, I've worked on diverse projects ranging from cybersecurity implementations for 
          enterprise clients to designing educational tools that empower teachers and students. Each project 
          reinforced my belief that great technology is about understanding people first.
        </Typography>

        <Typography
          sx={{
            color: "#1a4d7a",
            fontSize: "1.1rem",
            lineHeight: 1.8,
          }}
        >
          Today, I focus on creating innovative solutions at the intersection of education, design, and technology. 
          Whether through teaching, building, or sharing knowledge on YouTube, my mission is to make complex 
          concepts accessible and empower others to innovate responsibly.
        </Typography>
      </Container>
    </Box>
  );
};

export default AboutPage;
