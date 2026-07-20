import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";


import Navbar from "./component/Navbar";
import Home from "./Pages/home/Home";
import SignUp from "./Pages/Sign Up/SingUp";
import Signin from "./Pages/Sign Up/Singin";
import About from "./Pages/About";
import UserContext from "./context/UserContext";
import AddToCart from "./Pages/add to Cart/AddToCart";

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
      {user && <Navbar /> }

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
        <Route path="/about" element={<About />} />
        <Route path = "/addtocart" element={<AddToCart/>}/>

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


