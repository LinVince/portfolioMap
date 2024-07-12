import React, { useState } from "react";
import { Box, Typography, IconButton, Stack, Paper, Link } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import services from "../data/Services";

const ServiceTableMobile: React.FC = () => {
  const [language, setLanguage] = useState<"en" | "zh">("zh");
  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "zh" : "en"));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "5rem",
      }}
    >
      <Box sx={{ padding: 2, width: "90%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            {language === "en" ? "Services" : "服務"}
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography fontWeight={400}>
              {language === "en" ? "切換繁中" : "Switch to English"}
            </Typography>
            <IconButton
              color="inherit"
              aria-label="language"
              onClick={toggleLanguage}
            >
              <LanguageIcon />
            </IconButton>
          </Stack>
        </Box>
        {services.map((service, index) => (
          <Paper key={index} sx={{ marginBottom: 2, padding: 2 }}>
            <Box sx={{ alignItems: "center", display: "flex" }}>
              <Typography
                textAlign="left"
                fontWeight={600}
                sx={{ width: "30%" }}
              >
                {language === "en" ? "Category" : "項目"}
              </Typography>
              <Typography sx={{ width: "70%", textAlign: "left", paddingY: 2 }}>
                {service.category[language]}
              </Typography>
            </Box>
            <Box
              sx={{ alignItems: "center", display: "flex", marginBottom: 1 }}
            >
              <Typography
                textAlign="left"
                fontWeight={600}
                sx={{ width: "30%" }}
              >
                {language === "en" ? "Details" : "詳細內容"}
              </Typography>
              <Box sx={{ width: "70%" }}>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {service.details[language].map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </Box>
            </Box>
            <Box
              sx={{ alignItems: "center", display: "flex", marginBottom: 1 }}
            >
              <Typography
                textAlign="left"
                fontWeight={600}
                sx={{ width: "30%" }}
              >
                {language === "en" ? "Results" : "預期成效"}
              </Typography>
              <Box sx={{ width: "70%" }}>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {service.results[language].map((result, i) => (
                    <li key={i}>{result}</li>
                  ))}
                </ul>
              </Box>
            </Box>
            <Box
              sx={{ alignItems: "center", display: "flex", marginBottom: 1 }}
            >
              <Typography
                textAlign="left"
                fontWeight={600}
                sx={{ width: "30%" }}
              >
                {language === "en" ? "Reference" : "作品連結"}
              </Typography>
              <Box sx={{ width: "70%" }}>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {service.reference?.map((ref, i) => (
                    <li key={i}>
                      <Link
                        href={ref.link}
                        style={{ textDecoration: "none" }}
                        target="_blank"
                      >
                        {ref.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ServiceTableMobile;
