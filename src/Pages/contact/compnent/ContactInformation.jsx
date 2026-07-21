import {
  Box,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

function ContactInformation() {
  const contactData = [
    {
      icon: <EmailOutlinedIcon sx={{ color: "#F59E0B", fontSize: 24 }} />,
      title: "Email Us",
      line1: "hello@bloomshop.com",
      line2: "support@bloomshop.com",
      desc: "Send us an email anytime",
    },
    {
      icon: <PhoneOutlinedIcon sx={{ color: "#F59E0B", fontSize: 24 }} />,
      title: "Call Us",
      line1: "+1 (555) 123-4567",
      line2: "+1 (555) 987-6543",
      desc: "Mon-Fri from 8am to 5pm",
    },
    {
      icon: (
        <LocationOnOutlinedIcon
          sx={{ color: "#F59E0B", fontSize: 24 }}
        />
      ),
      title: "Visit Us",
      line1: "123 Fashion Street",
      line2: "Style City, SC 12345",
      desc: "Come say hello at our office",
    },
    {
      icon: (
        <AccessTimeOutlinedIcon
          sx={{ color: "#F59E0B", fontSize: 24 }}
        />
      ),
      title: "Working Hours",
      line1: "Monday - Friday: 9am - 6pm",
      line2: "Saturday: 10am - 4pm",
      desc: "Sunday: Closed",
    },
  ];

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 6,
        p: { xs: 3, md: 3 },
      }}
    >
      <Typography
      sx={{fontSize:'20px',fontWeight:600,mb:5}}
      >
        Contact Information
      </Typography>

      <Stack spacing={5}>
        {contactData.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 3,
            }}
          >
            {/* Icon */}
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: "#FFF5E6",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              {item.icon}
            </Box>

            {/* Content */}
            <Box>
              <Typography
           
                sx={{fontSize:'16px',fontWeight:600,mb:1}}
              >
                {item.title}
              </Typography>

              <Typography
                sx={{
                  color: "#64748b",
                  fontSize: 14,
                }}
              >
                {item.line1}
              </Typography>

              <Typography
                sx={{
                  color: "#64748b",
                  fontSize: 14,
                }}
              >
                {item.line2}
              </Typography>

              <Typography
                sx={{
                //   mt: 1,
                  color: "#64748b",
                  fontSize: 12,
                }}
              >
                {item.desc}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}

export default ContactInformation;