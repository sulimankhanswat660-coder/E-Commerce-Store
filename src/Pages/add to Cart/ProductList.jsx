import {
  Box,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../lib/Firebase";

function ProductList({ item, deleteItem }) {
  const increase = async () => {
    try {
      if (item.stock <= 0) {
        alert("This product is out of stock.");
        return;
      }

      if (item.quantity >= item.stock) {
        alert(`Only ${item.stock} item(s) available in stock.`);
        return;
      }

      await updateDoc(doc(db, "cart", item.cartId), {
        quantity: item.quantity + 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const decrease = async () => {
    if (item.quantity === 1) return;

    try {
      await updateDoc(doc(db, "cart", item.cartId), {
        quantity: item.quantity - 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const price = Number(item.price.replace("$", ""));
  const totalPrice = price * item.quantity;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 3,
          flexWrap: "wrap",
        }}
      >
        {/* Left Side */}
        <Box
          sx={{
            display: "flex",
            gap: {xs:2,sm:3},
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={item.image}
            sx={{
              width:{ xs:80,md:100},
              height:{ xs:80,md:100},
              borderRadius: 3,
              objectFit: "cover",
            }}
          />

          <Box>
            <Typography sx={{fontSize:{xs:'14px',sm:'16px'},fontWeight:600,mb:{xs:'0px',sm:'5px'}}}>
              {item.name}
            </Typography>

            <Typography sx={{fontSize:'13px', color: "#6b7280"}}>
              {item.price} each
            </Typography>

            {/* Stock */}
            {item.stock > 0 ? (
              <Typography
                sx={{
                  color: "green",
                  fontSize: 14,
                }}
              >
                Stock: {item.stock}
              </Typography>
            ) : (
              <Typography
                sx={{
                  color: "red",
                  fontSize: 14,
                  mt: 1,
                  fontWeight: 600,
                }}
              >
                Out of Stock
              </Typography>
            )}

            {/* Quantity */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ddd",
                borderRadius: 10,
                width:{ xs:100,sm:130},
                height:30,
                justifyContent: "space-between",
                mt: "10px",
              }}
            >
              <IconButton onClick={decrease}>
                <RemoveIcon fontSize="small" />
              </IconButton>

              <Typography fontWeight={600}>
                {item.quantity}
              </Typography>

              <IconButton
                onClick={increase}
                disabled={
                  item.stock <= 0 ||
                  item.quantity >= item.stock
                }
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Right Side */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 2,
          }}
        >
          <IconButton
            onClick={() => deleteItem(item.cartId)}
            sx={{
              "&:hover": {
                color: "red",
              },
            }}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            ${totalPrice.toFixed(2)}
          </Typography>
        </Box>
      </Box>

      <Divider />
    </Box>
  );
}

export default ProductList;