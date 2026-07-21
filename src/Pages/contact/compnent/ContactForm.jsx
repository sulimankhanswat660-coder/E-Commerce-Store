import {
  Box,
  Button,
  Container,
  Grid,
  InputBase,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ContactInformation from "./ContactInformation";
import WhyContact from "./WhyContact";

function ContactForm() {
  return (
    <Container maxWidth="xl" sx={{ py: 10 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
          gap: 5,
        }}
      >
        <Box sx={{ flex: 2 }}>
          <Paper
            elevation={2}
            sx={{
              borderRadius: 6,
              p: { xs: 3,  },
              border: "1px solid #E5E7EB",
            }}
          >
            {/* Heading */}
            <Typography
              sx={{
                fontSize: {
                  xs: "2rem",
                  sm: "26px",
                },
                fontWeight: 700,
              }}
            >
              Send us a message
            </Typography>

            <Typography
              sx={{
                color: "#64748B",
                fontSize: "16px",
                mt: 1,
                mb: 5,
              }}
            >
              Fill out the form below and we'll get back to you as soon as
              possible.
            </Typography>

            <Grid container spacing={2}>
              <Grid item size={{ xs: 12, md: 6 }}>
                <Typography
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                    fontSize: "18px",
                  }}
                >
                  Your Name
                </Typography>

                <TextField
                  fullWidth
                  placeholder="John Doe"
                  variant="outlined"
                  sx={{
                    // height: 78,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "40px",
                      bgcolor: "#fff",
                      height: "40px",
                      boxShadow: "0 5px 15px rgba(0,0,0,.08)",
                    },
                  }}
                />
              </Grid>
              {/* Email */}
              <Grid item size={{ xs: 12, md: 6 }}>
                <Typography
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                    fontSize: "18px",
                  }}
                >
                  Your Email
                </Typography>

                <TextField
                  fullWidth
                  placeholder="john@example.com"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "40px",
                      bgcolor: "#fff",
                      height: "40px",
                      boxShadow: "0 5px 15px rgba(0,0,0,.08)",
                    },
                  }}
                />
              </Grid>
            </Grid>
            {/* Subject */}
            <Grid item xs={12} fullWidth>
              <Typography
                sx={{
                  mb: 1,
                  mt: 4,
                  fontWeight: 600,
                  fontSize: "18px",
                }}
              >
                Subject
              </Typography>

              <TextField
                fullWidth
                placeholder="How can we help you?"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "40px",
                    height: "40px",
                    bgcolor: "#fff",
                    boxShadow: "0 5px 15px rgba(0,0,0,.08)",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography
                sx={{
                  mt: 4,
                  mb: 1,
                  fontWeight: 600,
                  fontSize: "18px",
                }}
              >
                Your Message
              </Typography>

              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Tell us more about your question or concern..."
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "25px",
                    bgcolor: "#fff",
                    boxShadow: "0 5px 15px rgba(0,0,0,.08)",
                    alignItems: "flex-start",
                  },
                }}
              />
            </Grid>

            {/* Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{
                  mt: 4,
                  bgcolor: "#F59E0B",
                  color: "#000",
                  px: 4,
                  borderRadius: "20px",
                  fontWeight: 500,
                  fontSize: "16px",
                  textTransform: "none",
                  boxShadow: 4,

                  "&:hover": {
                    bgcolor: "#FBBF24",
                  },
                }}
              >
                Send Message
              </Button>
            </Grid>
          </Paper>
        </Box>
        <Box sx={{ flex: 1 }}>
            <ContactInformation/>
            <WhyContact/>
        
        </Box>
      </Box>
    </Container>
  );
}

export default ContactForm;
