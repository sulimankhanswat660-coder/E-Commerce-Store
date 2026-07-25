// import { Box, Stack, Typography } from "@mui/material";
// import ProductCard from "./ProductCard";
// import Footer from "../../component/Footer";

// import { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../lib/Firebase";

// function Home() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const getProducts = async () => {
//       try {
//         const snapshot = await getDocs(collection(db, "products"));

//         const data = snapshot.docs.map((doc) => ({
//           ...doc.data(),
//         }));

//         setProducts(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getProducts();
//   }, []);

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         maxWidth: "1400px",
//         mx: "auto",
//         mt: 15,
//       }}
//     >
//       <Stack sx={{ my: 10, mt: 0 }}>
//         <Typography
//           sx={{
//             textAlign: "center",
//             fontSize: "2rem",
//             fontWeight: "700",
//             color: "#f59e0b",
//           }}
//         >
//           Step by Style
//         </Typography>

//         <Typography
//           sx={{
//             textAlign: "center",
//             fontSize: { xs: "1rem", md: "1.3rem" },
//             lineHeight: 1.5,
//             fontWeight: 400,
//             color: "#262626",
//           }}
//         >
//           Discover our latest collection of premium sneakers
//           <br />
//           — comfort, design, and performance in every pair.
//         </Typography>
//       </Stack>

//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           gap: 3,
//           justifyContent: "center",
//           mt: 4,
//           width: "100%",
//         }}
//       >
//         {products.map((product) => (
//           <ProductCard
//             key={product.id}
//             id={product.id}
//             name={product.name}
//             price={product.price}
//             image={product.image}
//             stock={product.stock}
//           />
//         ))}
//       </Box>

//       <Footer />
//     </Box>
//   );
// }

// export default Home;

import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/Firebase";
import ProductCard from "./ProductCard";
import Footer from "../../component/Footer";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1400px",
        mx: "auto",
        mt: 15,
      }}
    >
      <Stack sx={{ my: 10, mt: 0 }}>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: 700,
            color: "#F59E0B",
          }}
        >
          Step by Style
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            fontSize: {
              xs: "1rem",
              md: "1.2rem",
            },
          }}
        >
          Discover our latest collection of premium sneakers
          <br />— comfort, design, and performance in every pair.
        </Typography>
      </Stack>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            stock={product.stock}
          />
        ))}
      </Box>

      <Footer />
    </Box>
  );
}

export default Home;

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
