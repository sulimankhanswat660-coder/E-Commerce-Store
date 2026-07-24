import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/Firebase";
import UserContext from "../../context/UserContext";
import { cartContext } from "../../context/CartContext";

function Checkout() {
  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);
  const { cartItem } = useContext(cartContext);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    payment: "Cash on Delivery",
  });

  const handleChange = (e, ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const subtotal = cartItem.reduce((total, item) => {
    const price = Number(item.price.replace("$", ""));
    return total + price * item.quantity;
  }, 0);

  const tax = subtotal * 0.08;

  const total = subtotal + tax;

  const totalItems = cartItem.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const placeOrder = async () => {
    try {
      await addDoc(collection(db, "orders"), {
        userId: currentUser,

        customer: formData,

        items: cartItem,

        totalItems,

        subtotal,

        tax,

        total,

        status: "Pending",

        createdAt: serverTimestamp(),
      });

      for (const item of cartItem) {
        const productRef = doc(db, "products", item.productId);

        const snap = await getDoc(productRef);

        if (snap.exists()) {
          const stock = snap.data().stock;

          await updateDoc(productRef, {
            stock: stock - item.quantity,
          });
        }
      }

      for (const item of cartItem) {
        await deleteDoc(doc(db, "cart", item.cartId));
      }
      navigate("/order-success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 15, mb: 10 }}>
      <Typography variant="h4" fontWeight={700} mb={5} textAlign="center">
        Checkout
      </Typography>

      <Grid container spacing={4}>
        {/* Shipping Form */}

        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h6" mb={3}>
              Shipping Details
            </Typography>

            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Address"
              name="address"
              multiline
              rows={3}
              value={formData.address}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />

            <TextField
              select
              fullWidth
              label="Payment Method"
              name="payment"
              value={formData.payment}
              onChange={handleChange}
            >
              <MenuItem value="Cash on Delivery">Cash on Delivery</MenuItem>

              <MenuItem value="Credit Card">Credit Card</MenuItem>
            </TextField>
          </Paper>
        </Grid>

        {/* Order Summary */}

        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h6" mb={3}>
              Order Summary
            </Typography>

            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography>Total Items</Typography>

              <Typography>{totalItems}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography>Subtotal</Typography>

              <Typography>${subtotal.toFixed(2)}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography>Tax</Typography>

              <Typography>${tax.toFixed(2)}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={4}>
              <Typography fontWeight={700}>Total</Typography>

              <Typography fontWeight={700}>${total.toFixed(2)}</Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              onClick={placeOrder}
              sx={{
                bgcolor: "#F59E0B",
                color: "#000",
                py: 1.5,
                borderRadius: 10,

                "&:hover": {
                  bgcolor: "#d97706",
                },
              }}
            >
              Place Order
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Checkout;
