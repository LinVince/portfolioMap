import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EmailIcon from "@mui/icons-material/Email";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: YouTubeIcon, url: "https://www.youtube.com/@ArtificialChristelligence", label: "YouTube" },
    { icon: EmailIcon, url: "mailto:vincejim91126@gmail.com", label: "Email" },
  ];

  const footerLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Map", path: "/portfolioMap" },
    { label: "Gallery", path: "/portfolioGallery" }
   
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0d47a1",
        color: "#fff",
        py: 8,
        mt: 10,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Brand & About */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #42a5f5 0%, #4fc3f7 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "1.4rem",
                  mb: 2,
                }}
              >
                Y
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                Yueh
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  opacity: 0.8,
                  lineHeight: 1.6,
                }}
              >
                Creative technologist, educator, and AI enthusiast. Bridging design, technology, and human learning.
              </Typography>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              Navigation
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {footerLinks.map((link) => (
                <Typography
                  key={link.path}
                  component="a"
                  href={link.path}
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "#fff",
                    },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              Get In Touch
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Typography sx={{ fontSize: "0.9rem", opacity: 0.8 }}>
                📧 vincejim91126@gmail.com
              </Typography>
              <Typography sx={{ fontSize: "0.9rem", opacity: 0.8 }}>
                💼 Available for freelance & consulting
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.label}
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: "rgba(255, 255, 255, 0.8)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "#fff",
                        transform: "translateY(-3px)",
                      },
                    }}
                    size="small"
                  >
                    <social.icon />
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)", my: 3 }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography sx={{ fontSize: "0.85rem", opacity: 0.7 }}>
            © {currentYear} Yueh. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography
              component="a"
              href="#"
              sx={{
                fontSize: "0.85rem",
                opacity: 0.7,
                textDecoration: "none",
                color: "#fff",
                transition: "opacity 0.3s ease",
                "&:hover": {
                  opacity: 1,
                },
              }}
            >
              Privacy Policy
            </Typography>
            <Typography
              component="a"
              href="#"
              sx={{
                fontSize: "0.85rem",
                opacity: 0.7,
                textDecoration: "none",
                color: "#fff",
                transition: "opacity 0.3s ease",
                "&:hover": {
                  opacity: 1,
                },
              }}
            >
              Terms of Service
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
