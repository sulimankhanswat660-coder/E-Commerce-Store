import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Navbar from "./component/Navbar";
import Home from "./Pages/home/Home";
import SignUp from "./Pages/Sign Up/SingUp";
import Signin from "./Pages/Sign Up/Singin";
import UserContext from "./context/UserContext";
import AddToCart from "./Pages/add to Cart/AddToCart";
import EmptyCart from "./Pages/add to Cart/EmptyCart";
import Contact from "./Pages/contact/Contact";
import Checkout from "./Pages/Checkout/Checkout";
import OrderSuccess from "./Pages/Checkout/OrderSuccess";
import MyOrders from "./Pages/orders/MyOrders";
import UploadProducts from "./Pages/admin/UploadProducts";

function App() {
  const usercontext = useContext(UserContext);
  const user = usercontext.user;

  // Show loading while checking authentication
  if (user === undefined) {
    return (
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </h2>
    );
  }

  return (
    <>
      <BrowserRouter>
        {/* Navbar only for authenticated users */}
        {user && <Navbar />}

        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/signup" replace />}
          />

          {/* Sign Up */}
          <Route
            path="/signup"
            element={!user ? <SignUp /> : <Navigate to="/" replace />}
          />

          {/* Sign In */}
          <Route
            path="/signin"
            element={!user ? <Signin /> : <Navigate to="/" replace />}
          />
          {/* Contact Us */}
          <Route path="/contactus" element={<Contact />} />

          {/* AddToCart */}
          <Route path="/addtocart" element={<AddToCart />} />

          {/* EmptyCart */}
          <Route path="/emptycart" element={<EmptyCart />} />

          {/* Checkout page */}
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/order-success" element={<OrderSuccess />} />

          <Route path="/orders" element={<MyOrders />} />

          <Route path="/upload-products" element={<UploadProducts />} />
          {/* Any other route */}
          <Route
            path="*"
            element={<Navigate to={user ? "/" : "/signup"} replace />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
