import React from "react";
import ContactHero from "./compnent/CantactHero";
import { Box } from "@mui/material";
import ContactForm from "./compnent/ContactForm";
import Footer from "../../component/Footer";
import ContactCTA from "./compnent/CantactCTA";

export default function Contact() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1400px",
          mx: "auto",
          mt: 10,
        }}
      >
        <ContactHero />
        <ContactForm/>
        <ContactCTA/>
        <Footer/>
      </Box>
    </>
  );
}

