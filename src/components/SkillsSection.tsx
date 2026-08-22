import { Box, Typography, Container, Grid, Card, Chip } from "@mui/material";

const SkillsSection = () => {
  const skillCategories = [
    {
      category: "Frontend Development",
      color: "#0d47a1",
      skills: ["React", "TypeScript", "Next.js", "D3.js", "Vibe Coding"],
    },
    {
      category: "Backend & Data",
      color: "#0277bd",
      skills: ["Azure Cloud Computing", "Python", "Django", "Flask", "REST APIs", "Data Analysis"],
    },
    {
      category: "Design & UX",
      color: "#01579b",
      skills: ["UI/UX Design", "Figma", "Information Architecture", "User Research"],
    },
    {
      category: "AI & ML",
      color: "#1565c0",
      skills: ["Machine Learning", "NLP", "AI Agents", "AI Security"],
    },
  ];

  return (
    <Box
      sx={{
        py: 12,
        backgroundColor: "#fff",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            textAlign: "center",
            mb: 5,
            color: "#0d47a1",
          }}
        >
          I develop and teach
        </Typography>
      

        <Grid container spacing={3}>
          {skillCategories.map((category, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  p: 3,
                  height: "100%",
                  backgroundColor: "#f5f9ff",
                  border: `2px solid ${category.color}20`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: `0 12px 24px ${category.color}20`,
                  },
                }}
              >
                <Box
                  sx={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: category.color,
                    borderRadius: "8px",
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "#0d47a1", mb: 2 }}
                >
                  {category.category}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {category.skills.map((skill, idx) => (
                    <Chip
                      key={idx}
                      label={skill}
                      size="small"
                      sx={{
                        backgroundColor: `${category.color}15`,
                        color: category.color,
                        fontWeight: 500,
                        borderColor: `${category.color}30`,
                        border: `1px solid ${category.color}30`,
                      }}
                    />
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

export default SkillsSection;
