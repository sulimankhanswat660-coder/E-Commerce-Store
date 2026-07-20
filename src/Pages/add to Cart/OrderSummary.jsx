import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";

export default function OrderSummary({ subtotal, totalItems, tax, total }) {
  return (
    <Paper
      elevation={2}
      sx={{
       
        p: 3,
        borderRadius: 6,
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "18px", md: "20px", },
           fontWeight: 600,
          mb: 3,
        }}
      >
        Order Summary
      </Typography>

      {/* Subtotal */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography sx={{ color: "#6b7280" ,fontSize:14}} >
          Subtotal ({totalItems} items)
        </Typography>

        <Typography sx={{fontWeight:550}} fontSize={12}>
          ${subtotal.toFixed(2)}
        </Typography>
      </Box>

      {/* Shipping */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography sx={{ color: "#6b7280",fontSize:14 }} >
          Shipping
        </Typography>

        <Typography
          sx={{
            color: "#6b7280",
            bgcolor: "#F3F4F6",
            px: 2,
            py: 0.5,
            borderRadius: 10,
            fontWeight: 600,
            fontSize:12
          }}
        >
          Free
        </Typography>
      </Box>

      {/* Tax */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 1.5,
        }}
      >
        <Typography sx={{ color: "#6b7280",fontSize:14 }}>
          Tax
        </Typography>

        <Typography  sx={{fontWeight:550}} fontSize={12}>
          ${tax.toFixed(2)}
        </Typography>
      </Box>

      <Divider />

      {/* Total */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pb: 2,
          pt: 1.5,
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 700,
          }}
        >
          Total
        </Typography>

        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 700,
            color: "#F59E0B",
          }}
        >
          ${total.toFixed(2)}
        </Typography>
      </Box>

      {/* Button */}
      <Button
        fullWidth
        startIcon={<CreditCardOutlinedIcon />}
        variant="contained"
        sx={{
          //   py: 1.8,
          borderRadius: "18px",
          bgcolor: "#f59e0b",
          color: "#000",
          fontSize: 15,
          fontWeight:600,
          textTransform: "none",
          boxShadow: 4,

          "&:hover": {
            bgcolor: "#E69500",
          },
        }}
      >
        Proceed to Checkout
      </Button>

      <Divider sx={{ my: 2.5}} />

      {/* Features */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ShieldOutlinedIcon color="success" />
          <Typography color="text.secondary" fontSize={18}>
            Secure SSL checkout
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <LocalShippingOutlinedIcon color="primary" />
          <Typography color="text.secondary" fontSize={18}>
            Free returns within 30 days
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <FavoriteBorderOutlinedIcon color="error" />
          <Typography color="text.secondary" fontSize={18}>
            24/7 customer support
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
