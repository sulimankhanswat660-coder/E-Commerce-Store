import { Paper, Typography, Box, Stack, Divider } from "@mui/material";

import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";

function WhyContact() {
  const reasons = [
    {
      icon: <HeadsetMicOutlinedIcon sx={{ color: "#B45309", fontSize: 24 }} />,
      title: "24/7 Support",
      desc: "Get help whenever you need it",
    },
    {
      icon: (
        <ChatBubbleOutlineOutlinedIcon
          sx={{ color: "#B45309", fontSize: 24 }}
        />
      ),
      title: "Quick Response",
      desc: "We reply within 2 hours",
    },
    {
      icon: <ShieldOutlinedIcon sx={{ color: "#B45309", fontSize: 24 }} />,
      title: "Secure & Private",
      desc: "Your information is safe with us",
    },
  ];

  return (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 3 },
        borderRadius: 6,
        mt: 5,
      }}
    >
      <Typography sx={{ fontSize: "20px", fontWeight: 600, mb: 2 }}>
        Why Contact Us?
      </Typography>

      <Stack spacing={3}>
        {reasons.map((item, index) => (
          <Box key={index}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Box
                sx={{
                 
                  borderRadius: "50%",
                  bgcolor: "#FFF7ED",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </Box>

              <Box>
                <Typography sx={{ fontSize: "16px", fontWeight: 500, }}>
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    color: "#64748b",
                    fontSize: 12,
                  }}
                >
                  {item.desc}
                </Typography>
              </Box>
            </Box>

            {index !== reasons.length - 1 && <Divider sx={{ mt: 2 }} />}
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}

export default WhyContact;
