import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../lib/Firebase";

import airflex from "../../../public/Airflex.avif";
import urban from "../../../public/Urban.avif";
import classic from "../../../public/Classic.avif";
import volt from "../../../public/Volt.avif";
import zenith from "../../../public/Zenith.avif";
import street from "../../../public/Street.avif";
import nova from "../../../public/Nova.avif";
import pulse from "../../../public/Pulse.avif";
import core from "../../../public/Core.avif";

const products = [
  {
    id: 1,
    name: "AirFlex Runner",
    price: "$89.00",
    image: airflex,
    stock: 20,
  },
  {
    id: 2,
    name: "Urban Street Pro",
    price: "$99.00",
    image: urban,
    stock: 20,
  },
  {
    id: 3,
    name: "Classic Court 90s",
    price: "$79.00",
    image: classic,
    stock: 20,
  },
  {
    id: 4,
    name: "Volt Edge",
    price: "$119.00",
    image: volt,
    stock: 20,
  },
  {
    id: 5,
    name: "Zenith Flow",
    price: "$129.00",
    image: zenith,
    stock: 20,
  },
  {
    id: 6,
    name: "Street Vibe Low",
    price: "$69.00",
    image: street,
    stock: 20,
  },
  {
    id: 7,
    name: "Nova Horizon",
    price: "$109.00",
    image: nova,
    stock: 20,
  },
  {
    id: 8,
    name: "Pulse Runner",
    price: "$109.00",
    image: pulse,
    stock: 20,
  },
  {
    id: 9,
    name: "Core Classic",
    price: "$109.00",
    image: core,
    stock: 20,
  },
];

export default function UploadProducts() {
  const uploadProducts = async () => {
    try {
      for (const product of products) {
        await setDoc(
          doc(db, "products", String(product.id)),
          product
        );
      }

      alert("Products Uploaded Successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container sx={{ mt: 10, textAlign: "center" }}>
      <Typography variant="h4" mb={4}>
        Upload Products
      </Typography>

      <Button
        variant="contained"
        onClick={uploadProducts}
      >
        Upload Products
      </Button>
    </Container>
  );
}