import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import nike from "../../../public/Airflex.avif";
import RemoveIcon from "@mui/icons-material/Remove";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../lib/Firebase";

function Rough({ item, deleteItem }) {
  const increase = async () => {
    try {
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
          alignItems: "center",
          justifyContent: "space-between",
          py: 3,
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: {xs:'18px',sm:"25px"} }}>
          <Box
            component="img"
            src={item.image}
            sx={{
              width: {xs:80,sm:90},
              height:{xs:80,sm:90},
              objectFit: "cover",
              borderRadius: 3,
            }}
          />

          <Box sx={{ alignSelf: "end" }}>
            <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
              {item.name}
            </Typography>
            <Typography sx={{ color: "#6b7280" }}>{item.price} each</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ddd",
                borderRadius: 10,
                width: {xs:100,sm:130},
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <IconButton onClick={() => decrease(item.id)}>
                <RemoveIcon fontSize="small" />
              </IconButton>

              <Typography fontSize={22} fontWeight={600}>
                {item.quantity}
              </Typography>

              <IconButton onClick={increase}>
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            gap: "20px",
          }}
        >
          <Box
            onClick={() => deleteItem(item.cartId)}
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
            <DeleteOutlineOutlinedIcon />
          </Box>
          <Typography sx={{ fontSize: "18px", fontWeight: "700" }}>
            ${totalPrice.toFixed(2)}
          </Typography>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
}

export default Rough;
