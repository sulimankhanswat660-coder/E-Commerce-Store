import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";

import { db } from "../../lib/Firebase";
import UserContext from "../../context/UserContext";
import { cartContext } from "../../context/CartContext";

import OrderSummary from "./OrderSummary";
import Footer from "../../component/Footer";
import ProductList from "./ProductList";

function AddToCart() {
  const navigate = useNavigate();

  const { cartItem, setCartItem } = useContext(cartContext);
  const { currentUser, setCounter } = useContext(UserContext);

  // Redirect when cart is empty
  useEffect(() => {
    if (!currentUser) {
      setCartItem([]);
      setCounter(0);
      return;
    }

    if (cartItem.length === 0) {
      navigate("/emptycart");
    }

    setCounter(cartItem.length);
  }, [currentUser, cartItem, navigate]);

  // Cart already contains product details from CartContext
  const filterItem = cartItem;

  const totalItems = filterItem.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const grandTotal = filterItem.reduce((total, item) => {
    const price = Number(item.price.replace("$", ""));
    return total + price * item.quantity;
  }, 0);

  const deleteItem = async (cartId) => {
    try {
      await deleteDoc(doc(db, "cart", cartId));
    } catch (error) {
      console.log(error);
    }
  };

  const clearCart = async () => {
    try {
      for (const item of cartItem) {
        await deleteDoc(doc(db, "cart", item.cartId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "1400px", mx: "auto" }}>
      {/* Header */}

      <Box
        sx={{
          px: { xs: "10px", md: "30px" },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: { xs: 12, md: 15 },
          mb: 4,
        }}
      >
        <Stack>
          <Typography sx={{ fontSize: { xs: "22px", sm: "32px" }, fontWeight: 600 }}>
            Shopping Cart
          </Typography>

          <Typography>{totalItems} Item in your Cart</Typography>
        </Stack>

        <Box
          onClick={() => navigate("/")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            p: 1,
            color: "#6b7280",

            "&:hover": {
              bgcolor: "#f9e7c8",
              borderRadius: "30px",
              color: "#000",
            },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: { xs: "14px", sm: "16px" } }} />

          <Typography sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
            Continue Shopping
          </Typography>
        </Box>
      </Box>

      {/* Cart */}

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 5,
          width: "95%",
          mx: "auto",
        }}
      >
        <Paper
          elevation={2}
          sx={{
            flex: 2,
            p: 2,
            borderRadius: 5,
            height: "max-content",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography fontWeight={600}>Cart Items</Typography>

            <Box
              onClick={clearCart}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",

                "&:hover": {
                  color: "#d65050",
                },
              }}
            >
              <DeleteOutlineOutlinedIcon fontSize="small" />

              <Typography>Clear All</Typography>
            </Box>
          </Box>

          {filterItem.map((item) => (
            <ProductList
              key={item.cartId}
              item={item}
              deleteItem={deleteItem}
            />
          ))}
        </Paper>

        {/* Summary */}

        <Box sx={{ flex: 1 }}>
          <OrderSummary
            subtotal={grandTotal}
            totalItems={totalItems}
            tax={grandTotal * 0.08}
            total={grandTotal + grandTotal * 0.08}
          />
        </Box>
      </Box>

      {/* Browse */}

      <Paper
        elevation={3}
        sx={{
          width: { xs: "70%", sm: "90%" },
          mx: "auto",
          mt: 6,
          mb: 6,
          p: 3,
          borderRadius: 6,
        }}
      >
        <Typography fontWeight={600}>
          You might also like
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 6,
            mb: 3,
          }}
        >
          <Typography
            sx={{
              color: "#64748b",
              mb: 2,
            }}
          >
            Discover more products that match your style
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{
              bgcolor: "#fff",
              color: "#000",
              border: "1px solid #ddd",
              borderRadius: "40px",

              "&:hover": {
                bgcolor: "#f8f8f8",
              },
            }}
          >
            Browse Products
          </Button>
        </Box>
      </Paper>

      <Footer />
    </Box>
  );
}

export default AddToCart;