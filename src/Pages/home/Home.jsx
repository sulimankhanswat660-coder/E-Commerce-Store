import { Box, Container, Stack, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import airflex from "../../../public/Airflex.avif";
import urban from "../../../public/Urban.avif";
import classic from "../../../public/Classic.avif";
import volt from "../../../public/Volt.avif";
import zenith from "../../../public/Zenith.avif";
import street from "../../../public/Street.avif";
import nova from "../../../public/Nova.avif";
import pulse from "../../../public/Pulse.avif";
import core from "../../../public/Core.avif";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/Firebase";

function Home() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1400px",
          mx: "auto",
          my:15
          // px: 2,
        }}
      >
        <Stack sx={{ my: 10, mt: 0 }}>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "2rem",
              fontWeight: "700",
              color: "#f59e0b",
            }}
          >
            Step by Style
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: { xs: "1rem", md: "1.3rem" },
              lineHeight: 1.5,
              fontWeight: 400,
              color: "#262626",
            }}
          >
            Discover our latest collection of premium sneakers <br /> — comfort,
            design, and performance in every pair.
          </Typography>
        </Stack>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
            mt: 4,
            width: "100%",
          }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </Box>
      </Box>
      {/* </Container> */}
    </>
  );
}

export default Home;

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
