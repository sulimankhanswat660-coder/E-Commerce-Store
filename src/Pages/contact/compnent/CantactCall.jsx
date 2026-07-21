import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import React from "react";

function CantactCall() {
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "90%",
          mx: "auto",
          mt: 6,
          p: 3,
          borderRadius: 6,
          background: "#fffcf6",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            py: 3,
          }}
        >
          <Typography
            sx={{
              color: "#000",
              fontSize: { xs: "16px", sm: "32px" },
              fontWeight: "700",

              mb: 2,
            }}
          >
            Still have questions?{" "}
          </Typography>
          <Typography
            sx={{
              color: "#9ca9b9",
              fontSize: { xs: "16px", sm: "18px" },

              mb: 2,
            }}
          >
            Can't find what you're looking for? Our customer support team is
            here to help.
          </Typography>
          <Stack direction={"row"} spacing={2}>
            <Button
              variant="contained"
              startIcon={<LocalPhoneOutlinedIcon/>}
              sx={{
                mt: 4,
                bgcolor: "#F59E0B",
                color: "#000",
                px: 4,
                borderRadius: "15px",
                fontWeight: "600",
                fontSize: "16px",
                textTransform: "none",
                boxShadow: 4,

                "&:hover": {
                  bgcolor: "#FBBF24",
                },
              }}
            >
              Call us now
            </Button>
            <Button
           
              variant="contained"
              startIcon={<MailOutlinedIcon />}
              sx={{
                bgcolor: "#fff",
                color: "#000",
                px: 4,
                py: 1,
                borderRadius: "40px",
                fontSize: { xs: "12px", sm: "14px" },
                fontWeight:'600',
                textTransform: "none",
                 borderRadius: "15px",
                boxShadow: 3,
                border: "1px solid #ddd",

                "&:hover": {
                  bgcolor: "#f8f8f8",
                  color:"#7f5205"
                },
              }}
            >
              Live Chat
            </Button>
          </Stack>
        </Box>
      </Paper>
    </>
  );
}

export default CantactCall;
