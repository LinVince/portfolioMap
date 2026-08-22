import ThreeJSPage from "../components/ThreeJSPage";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import SkillsSection from "../components/SkillsSection";


function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Featured Work 
      <Box sx={{ display: "flex", flexWrap: "wrap", backgroundColor: "#fff" }}>
        <TextFade
          DOM_array={["#technical_skill_1", "#technical_skill_2"]}
          Icon_path="../image/technical skill.png"
          title="Technical"
          content={technical_skill}
        />
        <TextFade
          DOM_array={["#product_skill_1", "#product_skill_2"]}
          Icon_path="../image/product.png"
          title="Product"
          content={product_skill}
        />
        <TextFade
          DOM_array={["#advantage_1", "#advantage_2"]}
          Icon_path="../image/advantage.png"
          title="Advantage"
          content={advantage}
        />
      </Box>
      */}

      {/* Testimonials 
      <TestimonialsSection />
      */}

      {/* Contact CTA 
      <ContactCTASection />
      */}

      {/* 3D Showcase */}
      <ThreeJSPage />
    </>
  );
}

export default HomePage;
