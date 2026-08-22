import { Container, Box } from "@mui/material";
import ContactCTASection from "../components/ContactCTASection";

const ContactPage = () => {
  return (
    <Box>
      <Box sx={{ py: 8, backgroundColor: "#f5f9ff" }}>
        <Container maxWidth="md">
          {/* This will be filled with the contact form component */}
        </Container>
      </Box>
      <ContactCTASection />
    </Box>
  );
};

export default ContactPage;
