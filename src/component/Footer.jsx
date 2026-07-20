import {
  Box,
  Container,
  Typography,
  IconButton,
  InputBase,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import XIcon from "@mui/icons-material/X"; // Twitter/X
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";

function Footer() {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: "#fff", mt: 8, borderTop: "1px solid #ddd" }}>
      <Container maxWidth="xl">
        {/* Newsletter */}
        <Box
          sx={{
            py: 8,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: "26px",
            }}
          >
            Stay in the loop
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
              mt: 2,
              fontSize: "16px",
            }}
          >
            Subscribe to our newsletter for exclusive offers, new arrivals, and
            style inspiration.
          </Typography>

          <Box
            sx={{
              mt: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
                alignItems: "center",
                border: "1px solid #ddd",
                borderRadius: "40px",
                px: 2,
                width: "30%",
              }}
            >
              <InputBase
                placeholder="Enter your email"
                sx={{
                  ml: 1,
                  width: "50%",
                }}
              />
            </Box>

            <IconButton
              sx={{
                bgcolor: "#F59E0B",
                width: 50,
                height: 30,
                borderRadius: "20px",
                color: "#000",

                "&:hover": {
                  bgcolor: "#FBBF24",
                },
              }}
            >
              <ArrowForwardIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ borderTop: "1px solid #ddd", mb: 6 }} />

        {/* Footer Links */}

        <Box
          sx={{
            display: "flex",
            flexWrap: {
              xs: "wrap",
              lg: "nowrap",
            },
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 6,
            mx: "2%",
            pb: 6,
          }}
        >
          {/* Brand */}

          <Box
            sx={{
              width: {
                xs: "100%",
                lg: "30%",
              },
            }}
          >
            <Typography
              component="span"
              sx={{
                color: "#2F3B52",
                fontSize: "2rem",
                fontWeight: 500,
              }}
            >
              BLOOM
            </Typography>

            <Typography
              component="span"
              sx={{
                color: "#F59E0B",
                fontWeight: 500,
                fontSize: {
                  xs: "1.5rem",
                  sm: "2rem",
                },
              }}
            >
              SHOP
            </Typography>
            <Typography
              sx={{
                color: "#6b7280",
                fontSize: "16px",
              }}
            >
              Discover unique products that inspire your lifestyle. Quality
              craftsmanship meets modern design.
            </Typography>
            <Box mt={5}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}
              >
                <LocationOnOutlinedIcon
                  sx={{ color: "#F59E0B", fontSize: "20px" }}
                />
                <Typography sx={{ fontSize: "15px", color: "#64748b" }}>
                  123 Fashion Street, Style City, SC 12345
                </Typography>
              </Box>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
              >
                <PhoneOutlinedIcon sx={{ color: "#F59E0B" }} />
                <Typography sx={{ fontSize: "15px", color: "#64748b" }}>
                  +1 (555) 123-4567
                </Typography>
              </Box>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
              >
                <EmailOutlinedIcon sx={{ color: "#F59E0B" }} />
                <Typography sx={{ fontSize: "15px", color: "#64748b" }}>
                  support@bloomshop.com
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 5,
              }}
            >
              <IconButton
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "#F5F5F5",
                  "&:hover": { bgcolor: "#F59E0B", color: "#000" },
                }}
              >
                <FacebookOutlinedIcon />
              </IconButton>

              <IconButton
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "#F5F5F5",
                  "&:hover": { bgcolor: "#F59E0B", color: "#000" },
                }}
              >
                <XIcon />
              </IconButton>

              <IconButton
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "#F5F5F5",
                  "&:hover": { bgcolor: "#F59E0B", color: "#000" },
                }}
              >
                <InstagramIcon />
              </IconButton>

              <IconButton
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "#F5F5F5",
                  color: "#000",
                  "&:hover": { bgcolor: "#E68A00", color: "#000" },
                }}
              >
                <GitHubIcon />
              </IconButton>
            </Box>
          </Box>

          {/* SHOP */}

          <Box>
            <Typography sx={{ fontSize: "15px", fontWeight: 600, mb: 3 }}>
              SHOP
            </Typography>

            {["All Products", "New Arrivals", "Sale", "Featured"].map(
              (item) => (
                <Typography
                  key={item}
                  onClick={() => navigate("/")}
                  sx={{
                    mb: 2,
                    fontSize: "14px",
                    color: "#64748b",
                    cursor: "pointer",
                    transition: "0.3s",

                    "&:hover": {
                      color: "#000",
                      //   pl: 1,
                    },
                  }}
                >
                  {item}
                </Typography>
              ),
            )}
          </Box>

          {/* CUSTOMER CARE */}

          <Box>
            <Typography sx={{ fontSize: "15px", fontWeight: 600, mb: 3 }}>
              CUSTOMER CARE
            </Typography>

            {[
              "Contact Us",
              "Help Center",
              "Shipping Info",
              "Returns & Exchanges",
            ].map((item) => (
              <Typography
                key={item}
                sx={{
                  mb: 2,
                  fontSize: "14px",
                  color: "#64748b",
                  cursor: "pointer",
                  transition: "0.3s",

                  "&:hover": {
                    color: "#000",
                  },
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>

          {/* COMPANY */}

          <Box>
            <Typography sx={{ fontSize: "15px", fontWeight: 600, mb: 3 }}>
              COMPANY
            </Typography>

            {["About Us", "Careers", "Blog", "Press"].map((item) => (
              <Typography
                key={item}
                sx={{
                  mb: 2,
                  fontSize: "14px",
                  color: "#64748b",
                  cursor: "pointer",
                  transition: "0.3s",

                  "&:hover": {
                    color: "#000",
                  },
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>

          {/* LEGAL */}

          <Box>
            <Typography sx={{ fontSize: "15px", fontWeight: 600, mb: 3 }}>
              LEGAL
            </Typography>

            {[
              "Privacy Policy",
              "Terms & Conditions",
              "Cookie Policy",
              "Accessibility",
            ].map((item) => (
              <Typography
                key={item}
                sx={{
                  mb: 2,
                  fontSize: "14px",
                  color: "#64748b",
                  cursor: "pointer",
                  transition: "0.3s",

                  "&:hover": {
                    color: "#000",
                  },
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
        <Divider />
      </Container>
      <Box
        sx={{
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>Centered Content</Typography>
      </Box>
    </Box>
  );
}

export default Footer;
