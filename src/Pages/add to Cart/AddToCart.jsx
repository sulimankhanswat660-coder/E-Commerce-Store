import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { db } from "../../lib/Firebase";
import UserContext from "../../context/UserContext";
import airflex from "../../../public/Airflex.avif";
import urban from "../../../public/Urban.avif";
import classic from "../../../public/Classic.avif";
import volt from "../../../public/Volt.avif";
import zenith from "../../../public/Zenith.avif";
import street from "../../../public/Street.avif";
import nova from "../../../public/Nova.avif";
import pulse from "../../../public/Pulse.avif";
import core from "../../../public/Core.avif";
import { cartContext } from "../../context/CartContext";
import OrderSummary from "./OrderSummary";
import Footer from "../../component/Footer";
import ProductList from "./ProductList";

const products = [
  {
    id: 1,
    name: "AirFlex Runner",
    price: "$89.00",
    image: airflex,
  },
  {
    id: 2,
    name: "Urban Street Pro",
    price: "$99.00",
    image: urban,
  },
  {
    id: 3,
    name: "Classic Court 90s",
    price: "$79.00",
    image: classic,
  },
  {
    id: 4,
    name: "Volt Adge",
    price: "$119.00",
    image: volt,
  },
  {
    id: 5,
    name: "Zenith Flow",
    price: "$129.00",
    image: zenith,
  },
  {
    id: 6,
    name: "Street Vibe low",
    price: "$69.00",
    image: street,
  },
  {
    id: 7,
    name: "Nova Horizon",
    price: "$109.00",
    image: nova,
  },
  {
    id: 8,
    name: "Nova Horizon",
    price: "$109.00",
    image: pulse,
  },
  {
    id: 9,
    name: "Nova Horizon",
    price: "$109.00",
    image: core,
  },
];

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
    if(cartItem.length ===0){
      navigate('/emptycart')
    }

    const q = query(collection(db, "cart"), where("userId", "==", currentUser));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const cartData = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));

        setCartItem(cartData);
        setCounter(cartData.length);
      },
      (error) => {
        console.log("Cart snapshot error:", error);
      },
    );

    return () => unsubscribe();
  }, [currentUser, setCounter,cartItem,navigate]);

  const filterItem = cartItem
    .map((cart) => {
      const product = products.find(
        (p) => Number(p.id) === Number(cart.productId),
      );

      if (!product) return null;

      return {
        ...product,
        cartId: cart.id,
        quantity: cart.quantity || 1,
      };
    })
    .filter(Boolean);
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
 
  

  return (
    <Box sx={{ width: "100%", maxWidth: "1400px", mx: "auto",  }}>
      <Box
        sx={{
          px: {xs:'10px',md:"30px"},
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt:{xs:12,md:15},
          mb:4
        }}
      >
        <Stack>
          <Typography sx={{fontSize:{xs:'22px',sm:'32px'},fontWeight:600}}>
            Shopping Cart
          </Typography>

          <Typography>{cartItem.length} Item in your Cart</Typography>
        </Stack>

        <Box
          onClick={() => navigate("/")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            width: "fit-content",
            p: 1,
            color: "#6b7280",
            "&:hover": {
              bgcolor: "#f9e7c8",
              borderRadius: "30px",
              color: "#000",
            },
          }}
        >
          <ArrowBackIcon sx={{fontSize:{xs:'14px',sm:'16px'}}} />
          <Typography sx={{fontSize:{xs:'14px',sm:'16px'}}}>Continue Shopping</Typography>
        </Box>
      </Box>
      <Box
      
         sx={{
          display: "flex",
          mx:'auto',
          flexDirection: { xs: "column", md: "row" },
          width: "95%",
          gap: 5,
        }}
      >
        <Paper
          elevation={2}
          sx={{
            flex:2,
            borderRadius: 5,
            p: 2,
            height:'max-content'
          }}
        >
          <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
           <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
          Cart Items
        </Typography>
        <Box
          // onClick={() => deleteItem(item.cartId)}
        
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            width: "fit-content",
            p: 1,
            color: "#6b7280",
            "&:hover": {
              bgcolor: "#f9e7c8",
              borderRadius: 30,
              color: "#d65050",
            },
          }}
        >
          <DeleteOutlineOutlinedIcon  sx={{ fontSize: "15px" }} />

          <Typography sx={{ fontSize: "15px" }}>Clear All</Typography>
          </Box>
        </Box>
          {filterItem.map((item) => (
            <ProductList key={item.id} item={item} deleteItem={deleteItem} />
          ))}
        </Paper>
        <Box
          sx={{
           
            flex:1,
          }}
        >
          <OrderSummary
            subtotal={grandTotal}
            totalItems={totalItems}
            tax={grandTotal * 0.08}
            total={grandTotal + grandTotal * 0.08}
          />
        </Box>
      </Box>
     
      <Paper
        elevation={3}
        sx={{
          width: {xs:'70%',sm:"90%"},
          mx: "auto",
          mt: 6,
          mb: 6,
          p:3,
          borderRadius: 6,
        }}
      >
        <Typography
        
          sx={{ fontSize:'16px',fontWeight:600 }}
        >
          You might also like
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            mt:6,
            mb:3
          }}
        >
          <Typography
            sx={{
              color: "#64748b",
              fontSize: {xs:'16px',sm:'16px'},
              
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
              px: 3,
              py: 1,
              borderRadius: "40px",
              fontSize: {xs:'12px',sm:"14px"},
              textTransform: "none",
              boxShadow: 3,
              border: "1px solid #ddd",

              "&:hover": {
                bgcolor: "#f8f8f8",
              },
            }}
          >
            Browse Products
          </Button>
        </Box>
      </Paper>
      <Footer/>
    </Box>
  );
}

export default AddToCart;
