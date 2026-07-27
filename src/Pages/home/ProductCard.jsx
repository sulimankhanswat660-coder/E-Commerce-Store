import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import { cartContext } from "../../context/CartContext";
import core from "../../../public/Core.avif";
import {
  doc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  increment,
} from "firebase/firestore";
import { db } from "../../lib/Firebase";
export default function ProductCard({ name, price, image, id, stock }) {
  const context = useContext(UserContext);
  const { setId, cartItem } = useContext(cartContext);
  const { currentUser, counter, setCounter } = context;
  const [isClicked, setIsClicked] = useState(false);

  const addToCart = async () => {
    if (!currentUser) {
      alert("Please login first");
      return;
    }

    // Product is out of stock
    if (stock <= 0) {
      alert("This product is out of stock.");
      return;
    }

    try {
      const q = query(
        collection(db, "cart"),
        where("userId", "==", currentUser),
        where("productId", "==", id),
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const cartDoc = snapshot.docs[0];
        const currentQuantity = cartDoc.data().quantity;

        // Don't allow quantity greater than stock
        if (currentQuantity >= stock) {
          alert(`Only ${stock} item(s) available in stock.`);
          return;
        }

        await updateDoc(doc(db, "cart", cartDoc.id), {
          quantity: increment(1),
        });
      } else {
        await addDoc(collection(db, "cart"), {
          userId: currentUser,
          productId: id,
          quantity: 1,
        });
      }

      setIsClicked(true);

      setTimeout(() => {
        setIsClicked(false);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };
  const isInCart = cartItem.some((item) => item.productId === id);
  return (
    <Card
      sx={{
        width: { xs: "90%", sm: "40%", md: "30%" },
        borderRadius: 5,
        overflow: "hidden",
        boxShadow: 3,
        transition: "all .3s ease",
        flexWrap: "wrap",

        "&:hover": {
          boxShadow: 10,
          transform: "translateY(-8px)",
        },

        "&:hover .overlay": {
          opacity: 1,
        },

        "&:hover .product-image": {
          transform: "scale(1.08)",
        },
      }}
    >
      {/* Image */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",

          "&:hover .overlay": {
            opacity: 1,
          },

          "&:hover img": {
            transform: "scale(1.05)",
          },
        }}
      >
        <CardMedia
          component="img"
          image={image || core}
          alt="shoes"
          sx={{
            height: 320,
            transition: ".3s",
          }}
        />

        {/* Overlay */}
        <Box
          className="overlay"
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(255,255,255,.55)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: 0,
            transition: ".3s",
          }}
        >
          <Button
            startIcon={<VisibilityOutlinedIcon />}
            variant="contained"
            sx={{
              fontSize: 12,
              fontWeight: 600,
              bgcolor: "#F9A602",
              color: "#000",
              borderRadius: "30px",
              px: 4,
              // py: 1,

              "&:hover": {
                bgcolor: "#F59E0B",
              },
            }}
          >
            Quick View
          </Button>
        </Box>
      </Box>

      {/* Content */}
      <CardContent>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "600",
            textTransform: "uppercase",
            "&:hover": {
              color: "#F59E0B",
            },
          }}
        >
          {name}
        </Typography>

        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "700",
          }}
          mt={1}
        >
          {price}
        </Typography>
        <Button
          fullWidth
          startIcon={<ShoppingCartOutlinedIcon />}
          variant="contained"
          onClick={addToCart}
          disabled={stock <= 0 || isInCart}
          sx={{
            mt: 1,
            bgcolor: stock <= 0 ? "#bdbdbd" : isInCart? "success.main" : "#F9A602",

            color: stock <= 0 ? "#666" :isInCart ? "#fff" : "#000",

            borderRadius: "40px",
            fontSize: 14,
            fontWeight: 600,
            textTransform: "none",

            "&:hover": {
              bgcolor: stock <= 0 ? "#bdbdbd" : "#F59E0B",
            },
          }}
        >
          {stock <= 0
            ? "Out of Stock"
            : isInCart
              ? "Added to Cart"
              : "Add to Cart"}
        </Button>
      </CardContent>
    </Card>
  );
}
