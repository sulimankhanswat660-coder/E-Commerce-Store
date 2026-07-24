import { Box, Button, Paper, Typography } from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f8fafc",
        p: 2,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          maxWidth: 550,
          width: "100%",
          textAlign: "center",
          p: 5,
          borderRadius: 5,
        }}
      >
        <CheckCircleOutlinedIcon
          sx={{
            fontSize: 90,
            color: "#22c55e",
            mb: 2,
          }}
        />

        <Typography variant="h4" fontWeight="700" gutterBottom>
          Order Placed Successfully!
        </Typography>

        <Typography
          sx={{
            color: "#64748b",
            mb: 4,
            fontSize: 17,
          }}
        >
          Thank you for shopping with <b>Bloom Shop</b>.
          <br />
          Your order has been received and is being processed.
        </Typography>

        <Button
          variant="contained"
          startIcon={<ShoppingBagOutlinedIcon />}
          onClick={() => navigate("/")}
          sx={{
            bgcolor: "#F59E0B",
            color: "#000",
            px: 5,
            py: 1.5,
            borderRadius: "40px",
            textTransform: "none",
            fontWeight: 700,
            fontSize: 16,
            "&:hover": {
              bgcolor: "#fbbf24",
            },
          }}
        >
          Continue Shopping
        </Button>
        
      </Paper>
    </Box>
  );
}

export default OrderSuccess;
