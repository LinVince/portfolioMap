import { Box, Typography, Button, Container } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const HeroSection = () => {
  const isDevice = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "90vh",
        background: "linear-gradient(135deg, #f5f9ff 0%, #e3f2fd 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        py: 8,
      }}
    >
      {/* Decorative background elements */}
      <Box
        sx={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(13, 71, 161, 0.08)",
          top: "-100px",
          right: "-100px",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(2, 119, 189, 0.08)",
          bottom: "-50px",
          left: "-50px",
          animation: "float 8s ease-in-out infinite reverse",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: isDevice ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 4,
          }}
        >
          {/* Left Content */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: isDevice ? "2.5rem" : "3.5rem",
                background: "linear-gradient(135deg, #0d47a1 0%, #0277bd 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
                lineHeight: 1.2,
              }}
            >
              Creative Technologist & Educator
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: "#1a4d7a",
                fontWeight: 500,
                mb: 4,
                lineHeight: 1.6,
              }}
            >
              I design elegant solutions at the intersection of education, AI, and human-computer interaction. Currently helping organizations innovate through technology and pedagogy.
            </Typography>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                component={RouterLink}
                to="/portfolioGallery"
                variant="contained"
                sx={{
                  background: "linear-gradient(135deg, #0d47a1 0%, #0277bd 100%)",
                  color: "white",
                  fontWeight: 600,
                  padding: "12px 32px",
                  borderRadius: "8px",
                  textTransform: "none",
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 12px 24px rgba(13, 71, 161, 0.3)",
                  },
                }}
              >
                View My Work
              </Button>
            
            </Box>

            {/* Stats */}
            <Box
              sx={{
                display: "flex",
                gap: 4,
                mt: 6,
                pt: 4,
                borderTop: "1px solid rgba(2, 119, 189, 0.2)",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#0d47a1",
                  }}
                >
                  8+
                </Typography>
                <Typography sx={{ color: "#1a4d7a", fontWeight: 500 }}>
                  Years Experience
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#0d47a1",
                  }}
                >
                  50+
                </Typography>
                <Typography sx={{ color: "#1a4d7a", fontWeight: 500 }}>
                  Projects Completed
                </Typography>
              </Box>
            
            </Box>
          </Box>

          {/* Right Visual */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src="../image/profile_photo.jpg"
              alt="Profile photo"
              sx={{
                width: isDevice ? "250px" : "400px",
                height: isDevice ? "250px" : "400px",
                borderRadius: "20px",
                objectFit: "cover",
                border: "2px solid rgba(2, 119, 189, 0.2)",
                boxShadow: "0 20px 40px rgba(13, 71, 161, 0.15)",
                display: "block",
              }}
            />
          </Box>
        </Box>
      </Container>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(30px); }
        }
      `}</style>
    </Box>
  );
};

export default HeroSection;
