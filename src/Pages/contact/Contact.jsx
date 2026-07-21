import React from "react";
import ContactHero from "./compnent/CantactHero";
import { Box } from "@mui/material";
import ContactForm from "./compnent/ContactForm";
import CantactCall from "./compnent/CantactCall";
import Footer from "../../component/Footer";

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
        <CantactCall/>
        <Footer/>
      </Box>
    </>
  );
}

