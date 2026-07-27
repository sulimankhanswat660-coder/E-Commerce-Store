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
import { Form, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../lib/Firebase";
import UserContext from "../../context/UserContext";
import { cartContext } from "../../context/CartContext";
import CircularProgress from "@mui/material/CircularProgress";
function Checkout() {
  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);
  const { cartItem } = useContext(cartContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      payment: "Cash on Delivery",
    },
  });

  const subtotal = cartItem.reduce((total, item) => {
    const price = Number(item.price.replace("$", ""));
    return total + price * item.quantity;
  }, 0);

  const tax = subtotal * 0.08;

  const total = subtotal + tax;

  const totalItems = cartItem.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  const placeOrder = async (Data) => {
    try {
      // Step 1: Check stock of every cart item
      for (const item of cartItem) {
        const productRef = doc(db, "products", String(item.productId));
        const productSnap = await getDoc(productRef);

        if (!productSnap.exists()) {
          alert(`${item.name} does not exist.`);
          return;
        }

        const product = productSnap.data();

        if (product.stock < item.quantity) {
          alert(
            `${item.name} has only ${product.stock} item(s) left in stock.`,
          );
          return;
        }
      }

      // Step 2: Create order
      await addDoc(collection(db, "orders"), {
        userId: currentUser,
        customer: Data,
        items: cartItem,
        totalItems,
        subtotal,
        tax,
        total,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      // Step 3: Update stock
      for (const item of cartItem) {
        const productRef = doc(db, "products", String(item.productId));
        const productSnap = await getDoc(productRef);

        await updateDoc(productRef, {
          stock: productSnap.data().stock - item.quantity,
        });
      }

      // Step 4: Delete cart items
      for (const item of cartItem) {
        await deleteDoc(doc(db, "cart", item.cartId));
      }

      navigate("/order-success");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 15, mb: 10 }}>
      <form onSubmit={handleSubmit(placeOrder)}>
        <Typography variant="h4" fontWeight={700} mb={5} textAlign="center">
          Checkout
        </Typography>
        <Grid container spacing={4}>
          {/* Shipping Form */}

          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 4, borderRadius: 4 }}>
              <Typography sx={{ mb: 3 }}>Shipping Details</Typography>

              <TextField
                fullWidth
                label="Full Name"
                sx={{ mb: 3 }}
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters ",
                  },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                fullWidth
                label="Phone Number"
                sx={{ mb: 3 }}
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^0\d{10}$/,
                    message: "Enter a valid phone number",
                  },
                })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
              <TextField
                fullWidth
                label="Email"
                sx={{ mb: 3 }}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Address"
                sx={{ mb: 3 }}
                {...register("address", {
                  required: "Address is required",
                })}
                error={!!errors.address}
                helperText={errors.address?.message}
              />

              <TextField
                fullWidth
                label="City"
                sx={{ mb: 3 }}
                {...register("city")}
                error={!!errors.city}
                helperText={errors.city?.message}
              />
              <TextField
                select
                fullWidth
                label="Payment Method"
                defaultValue="Cash on Delivery"
                {...register("payment")}
              >
                <MenuItem value="Cash on Delivery">Cash on Delivery</MenuItem>
                <MenuItem value="Credit Card">Credit Card</MenuItem>
                <MenuItem value="Easypaisa">Easypaisa</MenuItem>
                <MenuItem value="JazzCash">JazzCash</MenuItem>
              </TextField>
            </Paper>
          </Grid>

          {/* Order Summary */}

          <Grid item size={{ xs: 12, md: 5 }}>
            <Paper sx={{ p: 4, borderRadius: 4 }}>
              <Typography sx={{ fontSize: "18px", fontWeight: 600, mb: 3 }}>
                Order Summary
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Typography sx={{ color: "#6b7280" }}>Toatal Items</Typography>

                <Typography>{totalItems}</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Typography sx={{ color: "#6b7280" }}>Subtotal</Typography>

                <Typography>${subtotal.toFixed(2)}</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Typography sx={{ color: "#6b7280" }}>Tax</Typography>

                <Typography>${tax.toFixed(2)}</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 3,
                }}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                  Total
                </Typography>

                <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                  ${total.toFixed(2)}
                </Typography>
              </Box>

              <Button
                fullWidth
                type="submit"
                sx={{
                  bgcolor: "#F59E0B",
                  color: "#000",
                  py: 1.5,
                  borderRadius: "20px",
                  fontSize: "16px",
                  fontWeight: 600,

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
      </form>
    </Container>
  );
}

export default Checkout;
