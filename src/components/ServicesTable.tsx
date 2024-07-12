import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
  Stack,
  Link,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import services from "../data/Services";

const ServiceTable: React.FC = () => {
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
      <Box sx={{ padding: 4, width: "80rem" }}>
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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "20%", padding: "30px" }}>
                  <Typography variant="h6" textAlign="center" fontWeight={600}>
                    {language === "en" ? "Category" : "項目"}
                  </Typography>
                </TableCell>
                <TableCell sx={{ width: "40%", padding: "30px" }}>
                  <Typography variant="h6" textAlign="center" fontWeight={600}>
                    {language === "en" ? "Details" : "詳細內容"}
                  </Typography>
                </TableCell>
                <TableCell sx={{ width: "40%", padding: "30px" }}>
                  <Typography variant="h6" textAlign="center" fontWeight={600}>
                    {language === "en" ? "Results" : "預期成效"}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map((service, index) => (
                <TableRow key={index}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ padding: "12px", textAlign: "center" }}
                  >
                    {service.category[language]}
                  </TableCell>
                  <TableCell sx={{ padding: "12px", textAlign: "center" }}>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                      {service.details[language].map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell sx={{ padding: "12px", textAlign: "center" }}>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                      {service.results[language].map((result, i) => (
                        <li key={i}>{result}</li>
                      ))}
                    </ul>
                    <Typography fontSize="inherit" sx={{ marginTop: "30px" }}>
                      {language === "en" ? "Reference" : "作品連結"}
                    </Typography>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                      {service.reference?.map((ref, i) => (
                        <li>
                          <Link
                            href={ref.link}
                            key={i}
                            style={{ textDecoration: "None" }}
                            target="_blank"
                          >
                            {ref.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ServiceTable;
