// import { Box, Button, Paper, Stack, Typography } from "@mui/material";
// import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
// import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
// import React from "react";

// function CantactCall() {
//   return (
//     <>
//       <Paper
//         elevation={3}
//         sx={{
//           width: "85%",
//           mx: "auto",
//           mt: 6,
//           p: 3,
//           borderRadius: 6,
//           background: "#fffcf6",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             textAlign: "center",
//             py: 3,
//           }}
//         >
//           <Typography
//             sx={{
//               color: "#000",
//               fontSize: { xs: "16px", sm: "32px" },
//               fontWeight: "700",

//               mb: 2,
//             }}
//           >
//             Still have questions?{" "}
//           </Typography>
//           <Typography

//           >
//             Can't find what you're looking for? Our customer support team is
//             here to help.
//           </Typography>
//           <Stack direction={{sx:'column',sm:'row'}} spacing={2}>
//             <Button
//               variant="contained"
//               startIcon={<LocalPhoneOutlinedIcon/>}
//               sx={{
//                 mt: 4,
//                 bgcolor: "#F59E0B",
//                 color: "#000",
//                 px: 4,
//                 borderRadius: "15px",
//                 fontWeight: "600",
//                 fontSize: "16px",
//                 textTransform: "none",
//                 boxShadow: 4,

//                 "&:hover": {
//                   bgcolor: "#FBBF24",
//                 },
//               }}
//             >
//               Call us now
//             </Button>
//             <Button

//               variant="contained"
//               startIcon={<MailOutlinedIcon />}
//               sx={{
//                 bgcolor: "#fff",
//                 color: "#000",
//                 px: 4,
//                 py: 1,
//                 borderRadius: "40px",
//                 fontSize: { xs: "12px", sm: "14px" },
//                 fontWeight:'600',
//                 textTransform: "none",
//                  borderRadius: "15px",
//                 boxShadow: 3,
//                 border: "1px solid #ddd",

//                 "&:hover": {
//                   bgcolor: "#f8f8f8",
//                   color:"#7f5205"
//                 },
//               }}
//             >
//               Live Chat
//             </Button>
//           </Stack>
//         </Box>
//       </Paper>
//     </>
//   );
// }

// export default CantactCall;

import { Box, Button, Container, Paper, Typography } from "@mui/material";

import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";

function ContactCTA() {
  return (
    <Container maxWidth="xl">
      <Paper
        elevation={3}
        sx={{
          mb:15,
          py: { xs: 4, md: 5 },
          px: 3,
          borderRadius: 6,
          textAlign: "center",
          background:
            "linear-gradient(90deg,#FFF7ED 0%, #FFFFFF 50%, #FFF7ED 100%)",
          border: "1px solid #FCD9A5",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "1.5rem", md: "2rem" },
            fontWeight: 'bold',
            color: "#1E293B",
          }}
        >
          Still have questions?
        </Typography>

        <Typography
          sx={{
            mt: 1.5,
            color: "#64748B",
            fontSize: { xs: "16px", sm: "18px" },

            maxWidth: "900px",
            mx: "auto",
            lineHeight: 1.7,
          }}
        >
          Can't find what you're looking for? Our customer support team is here
          to help.
        </Typography>

        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {/* Call Button */}

          <Button
            startIcon={<PhoneOutlinedIcon />}
            variant="contained"
            sx={{
              bgcolor: "#F59E0B",
              color: "#000",
              px: 4,
              borderRadius: "20px",
              fontSize: "16px",
              textTransform: "none",
              boxShadow: 4,

              "&:hover": {
                bgcolor: "#FBBF24",
              },
            }}
          >
            Call Us Now
          </Button>

          {/* Live Chat */}

          <Button
            startIcon={<ChatOutlinedIcon />}
            variant="outlined"
            sx={{
              bgcolor: "#fff",
              color: "#000",
              px: 5,
              borderRadius: "20px",
              fontSize: "16px",
              textTransform: "none",
              border: "1px solid #E5E7EB",
              boxShadow: 2,

              "&:hover": {
                bgcolor: "#F8FAFC",
              },
            }}
          >
            Live Chat
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default ContactCTA;
