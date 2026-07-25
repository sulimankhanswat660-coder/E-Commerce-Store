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

  useEffect(() => {
    if (!currentUser) {
      setCartItem([]);
      setCounter(0);
      return;
    }

    if (cartItem.length === 0) {
      navigate("/emptycart");
      return;
    }

    const total = cartItem.reduce((sum, item) => sum + (item.quantity || 1), 0);

    setCounter(total);
  }, [currentUser, cartItem, navigate, setCartItem, setCounter]);

  const filterItem = cartItem.map((item) => ({
    ...item,
    outOfStock: (item.stock ?? 0) <= 0,
  }));

  const totalItems = filterItem.reduce(
    (total, item) => total + (item.quantity || 1),
    0,
  );

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

  const hasOutOfStock = filterItem.some((item) => item.outOfStock);

  return (
    <Box sx={{ width: "100%", maxWidth: "1400px", mx: "auto" }}>
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
          <Typography
            sx={{
              fontSize: { xs: "22px", sm: "32px" },
              fontWeight: 600,
            }}
          >
            Shopping Cart
          </Typography>

          <Typography>{totalItems} Items in your Cart</Typography>
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
          <ArrowBackIcon />
          <Typography>Continue Shopping</Typography>
        </Box>
      </Box>

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
            p: 3,
            borderRadius: 5,
            height:'max-content'
                

          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{fontSize:'20px' ,fontWeight:600}}>Cart Items</Typography>

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
              <DeleteOutlineOutlinedIcon />
              <Typography>Clear All</Typography>
            </Box>
          </Box>

          {hasOutOfStock && (
            <Typography
              sx={{
                color: "red",
                fontWeight: 600,
                mb: 2,
              }}
            >
              Some products are currently out of stock.
            </Typography>
          )}

          {filterItem.map((item) => (
            <ProductList
              key={item.cartId}
              item={item}
              deleteItem={deleteItem}
            />
          ))}
        </Paper>

        <Box sx={{ flex: 1 }}>
          <OrderSummary
            subtotal={grandTotal}
            totalItems={totalItems}
            tax={grandTotal * 0.08}
            total={grandTotal + grandTotal * 0.08}
            disableCheckout={filterItem.some((item) => item.stock <= 0)}
          />
        </Box>
      </Box>

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
        <Typography fontWeight={600}>You might also like</Typography>

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
            Discover more products that match your style.
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
