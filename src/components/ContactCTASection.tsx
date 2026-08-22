import { Box, Typography, Container, Button, TextField, Card } from "@mui/material";
import { useState } from "react";

const ContactCTASection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Box
      sx={{
        py: 12,
        background: "linear-gradient(135deg, #f5f9ff 0%, #e3f2fd 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(13, 71, 161, 0.08)",
          top: "-100px",
          left: "-100px",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "rgba(2, 119, 189, 0.08)",
          bottom: "-50px",
          right: "-50px",
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            textAlign: "center",
            mb: 2,
            color: "#0d47a1",
          }}
        >
          Let's Work Together
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            color: "#1a4d7a",
            mb: 6,
          }}
        >
          Have a project in mind? I'd love to hear about it. Drop me a message and let's create something amazing together.
        </Typography>

        <Card
          sx={{
            p: 4,
            backgroundColor: "#fff",
            border: "2px solid rgba(2, 119, 189, 0.2)",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <TextField
                fullWidth
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#0277bd",
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Your Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#0277bd",
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Your Message"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#0277bd",
                    },
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  background: "linear-gradient(135deg, #0d47a1 0%, #0277bd 100%)",
                  color: "white",
                  fontWeight: 600,
                  padding: "14px 40px",
                  fontSize: "1rem",
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 12px 24px rgba(13, 71, 161, 0.3)",
                  },
                }}
              >
                Send Message
              </Button>
            </Box>
          </form>

          {/* Contact Info */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              mt: 6,
              pt: 4,
              borderTop: "1px solid rgba(2, 119, 189, 0.2)",
            }}
          >
            <Box>
              <Typography sx={{ color: "#0d47a1", fontWeight: 700, mb: 1 }}>
                📧 Email
              </Typography>
              <Typography sx={{ color: "#1a4d7a" }}>
                hello@yourportfolio.com
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ color: "#0d47a1", fontWeight: 700, mb: 1 }}>
                💼 LinkedIn
              </Typography>
              <Typography sx={{ color: "#1a4d7a" }}>
                linkedin.com/in/yourprofile
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ color: "#0d47a1", fontWeight: 700, mb: 1 }}>
                🎥 YouTube
              </Typography>
              <Typography sx={{ color: "#1a4d7a" }}>
                youtube.com/@yourChannel
              </Typography>
            </Box>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default ContactCTASection;
