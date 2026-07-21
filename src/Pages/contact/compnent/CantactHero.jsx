import { Box, Chip, Container, Typography } from "@mui/material";

function ContactHero() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f6f2f2",
        py:{xs:9,md:12}
      }}
     
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* Top Badge */}
          <Chip
            label="Get in Touch"
            sx={{
              bgcolor: "#F59E0B",
              color: "#000",
              fontWeight: 600,
              fontSize: "12px",
            //   px: 1,
              mb: 4,
              borderRadius: "30px",
            }}
          />

          {/* Heading */}
          <Typography
            sx={{
              fontSize: {
                xs: "2.2rem",
                sm:'3rem',
                md: "3.7rem",
              },
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            We'd love to{" "}
            <Box
              component="span"
              sx={{
                color: "#F59E0B",
              }}
            >
              hear from
            </Box>
            <br />
            <Box
              component="span"
              sx={{
                color: "#F59E0B",
              }}
            >
              you
            </Box>
          </Typography>

          {/* Description */}
          <Typography
            sx={{
              mt: 3,
              maxWidth: "900px",
              color: "#64748b",
              fontSize: {
                xs: "16px",
                sm: "18px",
              },
              lineHeight: 1.7,
            }}
          >
            Have a question, suggestion, or just want to say hello?
            We're here to help and <br /> would love to hear from you.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default ContactHero;