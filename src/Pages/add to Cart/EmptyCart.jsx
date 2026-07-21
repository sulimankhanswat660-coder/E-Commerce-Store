import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { useNavigate } from "react-router-dom";
import Footer from "../../component/Footer";

function EmptyCart() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1400px",
        mx: "auto",
        mt: 15,
       
      }}
    >
      <Box 
      sx={{display:'flex',
        flexDirection:'column',
        alignItems:'center',
        gap:2,
        justifyContent:'center',
         py:10,
         mx:'15px'
      }}
    
      >
        {/* Icon */}
        <ShoppingBagOutlinedIcon
          sx={{
            fontSize: 100,
            color: "#6B7280",
          }}
        />

        {/* Heading */}
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            fontSize: '30px'
          }}
        >
          Your cart is empty
        </Typography>

        {/* Description */}
         <Typography
            sx={{
              color: "#64748b",
            //   mt: 2,
              fontSize: "18px",
              textAlign:'center'
            }}
          >
            Looks like you haven't added anything to your cart yet.
          </Typography>

        {/* Button */}
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{
            mt: 2,
            px: 5,
            py: 1.2,
            bgcolor: "#F59E0B",
            color: "#000",
            borderRadius: "20px",
            fontWeight: 600,
            fontSize: "14px",
            textTransform: "none",

            "&:hover": {
              bgcolor: "#FBBF24",
            },
          }}
        >
          Continue Shopping
        </Button>

        {/* Bottom Features */}
        <Stack
          direction={{
            // xs: "column",
            xs: "row",
          }}
          spacing={4}
          mt={2}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <LocalShippingOutlinedIcon sx={{ color: "#6B7280",fontSize:'18px' }} />

            <Typography sx={{color:"#64748b"}}>Free shipping over $50</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <SecurityOutlinedIcon sx={{ color: "#6B7280",fontSize:'18px' }} />

            <Typography sx={{color:"#64748b"}}>Secure checkout</Typography>
          </Box>
        </Stack>
      </Box>
      <Footer/>
    </Box>
  );
}

export default EmptyCart;
