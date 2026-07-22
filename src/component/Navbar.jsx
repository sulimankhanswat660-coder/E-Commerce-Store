// import {
//   AppBar,
//   Badge,
//   Box,
//   Button,
//   Container,
//   IconButton,
//   InputBase,
//   Toolbar,
//   Typography,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Avatar,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { Menu, Search, ShoppingCartOutlined } from "@mui/icons-material";
// import LogoutIcon from "@mui/icons-material/Logout";
// import { Link, useNavigate } from "react-router-dom";
// import { useContext, useState } from "react";
// import { getAuth, signOut } from "firebase/auth";
// import { auth } from "../lib/Firebase";
// import UserContext from "../context/UserContext";
// import { cartContext } from "../context/CartContext";
// const Navbar = () => {
//   const context = useContext(UserContext);
//   const { cartItem } = useContext(cartContext);

//   const { counter } = context;
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false);
//   const totalItem = cartItem.reduce((total, item) => {
//     return total + item.quantity;
//   }, 0);

//   const handleLogout = async () => {
//     await signOut(auth);
//     setOpenDialog(false);
//   };

//   return (
//     <>
//       <AppBar
//         position="fixed"
//         elevation={1}
//         sx={{
//           width: "100%",
//           bgcolor: "#fff",
//           color: "#000",
//         }}
//       >
//         <Container maxWidth="xl">
//           <Toolbar
//             disableGutters
//             sx={{
//               justifyContent: "space-between",
//               py: 1,
//               mx: {xs:'10px',sm:"30px"},
//             }}
//           >
//             {/* Logo */}
//             <Link
//               to="/"
//               style={{
//                 textDecoration: "none",
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <Typography
//                   component="span"
//                   sx={{
//                     color: "#2F3B52",
//                     fontSize: { xs: "1.5rem", sm: "2rem" },
//                     fontWeight: "500",
//                   }}
//                 >
//                   BLOOM
//                 </Typography>

//                 <Typography
//                   component="span"
//                   sx={{
//                     color: "#F59E0B",
//                     fontSize: { xs: "1.5rem", sm: "2rem" },

//                     fontWeight: "500",
//                   }}
//                 >
//                   SHOP
//                 </Typography>
//               </Box>
//             </Link>
//             {/* Desktop Menu */}
//             <Box
//               sx={{
//                 display: {
//                   xs: "none",
//                   md: "flex",
//                 },
//                 alignItems: "center",
//                 gap: 5,
//                 ml: 1,
//               }}
//             >
//               <Typography
//                 sx={{
//                   fontWeight: 600,
//                   cursor: "pointer",
//                 }}
//               >
//                 Contact
//               </Typography>
//             </Box>

//             {/* Search */}
//             <Box
//               sx={{
//                 display: {
//                   xs: "none",
//                   md: "flex",
//                 },
//                 alignItems: "center",
//                 bgcolor: "#fff",
//                 border: "1px solid #ddd",
//                 borderRadius: "40px",
//                 px: 2,
//                 width: "40%",
//               }}
//             >
//               <Search
//                 sx={{
//                   color: "gray",
//                 }}
//               />

//               <InputBase
//                 placeholder="Search products..."
//                 sx={{
//                   ml: 1,
//                   width: "100%",
//                 }}
//               />
//             </Box>

//             {/* Desktop Right */}
//             <Box
//               sx={{
//                 display: {
//                   xs: "none",
//                   md: "flex",
//                 },
//                 alignItems: "center",
//                 gap: 3,
//               }}
//             >
//               <IconButton onClick={() => navigate("addtocart")}>
//                 <Badge badgeContent={totalItem} color="warning">
//                   <ShoppingCartOutlined />
//                 </Badge>
//               </IconButton>
//               <Avatar
//                 sx={{ cursor: "pointer" }}
//                 onClick={() => setOpenDialog(true)}
//               />

//               <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//                 <DialogTitle>Sign Out</DialogTitle>

//                 <DialogContent>
//                   Are you sure you want to sign out?
//                 </DialogContent>

//                 <DialogActions>
//                   <Button onClick={() => setOpenDialog(false)}>Cancel</Button>

//                   <Button
//                     variant="contained"
//                     onClick={handleLogout}
//                     sx={{
//                       bgcolor: "#F9A602",
//                       color: "#000",
//                       px: 4,
//                       py: 1.2,
//                       borderRadius: "40px",
//                       textTransform: "none",
//                       fontSize: 18,
//                       boxShadow: 3,

//                       "&:hover": {
//                         bgcolor: "#f59e0b",
//                       },
//                     }}
//                   >
//                     Sign Out
//                   </Button>
//                 </DialogActions>
//               </Dialog>
//             </Box>

//             {/* Mobile Menu */}
//             <Box
//               sx={{
//                 display: {
//                   xs: "flex",
//                   md: "none",
//                 },
//               }}
//             >
//               <IconButton onClick={() => setOpen(true)}>
//                 <Menu />
//               </IconButton>
//             </Box>
//           </Toolbar>
//           <Box
//             sx={{
//               display: {
//                 xs: "none",
//               },
//               alignItems: "center",
//               border: "1px solid #ddd",
//               borderRadius: "40px",
//               px: 2,
//               mb: 2,
//             }}
//           >
//             <Search />

//             <InputBase
//               placeholder="Search products..."
//               sx={{
//                 ml: 1,
//                 width: "100%",
//               }}
//             />
//           </Box>
//         </Container>
//       </AppBar>

//       {/* Drawer */}

//       <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
//         <Box sx={{ width: 260 }}>
//           <List>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemText primary="Contact" />
//               </ListItemButton>
//             </ListItem>

//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemText primary="Sign Up" />
//               </ListItemButton>
//             </ListItem>

//             <ListItemButton onClick={handleLogout}>
//               <LogoutIcon />
//               <ListItemText primary="Logout" />
//             </ListItemButton>
//             {/* </ListItem> */}
//           </List>
//         </Box>
//       </Drawer>
//     </>
//   );
// };

// export default Navbar;

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import { Menu, Search, ShoppingCartOutlined } from "@mui/icons-material";

import LogoutIcon from "@mui/icons-material/Logout";

import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { signOut } from "firebase/auth";

import { auth } from "../lib/Firebase";
import UserContext from "../context/UserContext";
import { cartContext } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { cartItem } = useContext(cartContext);

  const totalItem = cartItem.reduce((total, item) => total + item.quantity, 0);

  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    setOpenDialog(false);
    setOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          bgcolor: "#fff",
          color: "#000",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              justifyContent: "space-between",
              py: 1,
            }}
          >
            {/* Logo */}
            <Link to="/" style={{ textDecoration: "none" }}>
              <Box display="flex">
                <Typography
                  component="span"
                  sx={{
                    color: "#2F3B52",
                    fontWeight: 500,
                    fontSize: {
                      xs: "1.5rem",
                      sm: "2rem",
                    },
                  }}
                >
                  BLOOM
                </Typography>

                <Typography
                  component="span"
                  sx={{
                    color: "#F59E0B",
                    fontWeight: 500,
                    fontSize: {
                      xs: "1.5rem",
                      sm: "2rem",
                    },
                  }}
                >
                  SHOP
                </Typography>
              </Box>
            </Link>

            {/* Desktop Menu */}
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
                // gap: 2,
              }}
            >
              <Typography
                onClick={() => navigate("/contactus")}
                sx={{
                  cursor: "pointer",
                  fontSize: "1rem",
                  width: "fit-content",
                  py:1,
                  mr:8,
                  px:2,

                  fontWeight: "500",
                  "&:hover": {
                    bgcolor: "#e9e9e9",
                    borderRadius: "30px",
                    color: "#000",
                  },
                }}
              >
                Contact
              </Typography>
            </Box>

            {/* Desktop Search */}
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
                alignItems: "center",
                border: "1px solid #ddd",
                borderRadius: "40px",
                px: 2,
                width: "40%",
              }}
            >
              <Search />

              <InputBase
                placeholder="Search products..."
                sx={{
                  ml: 1,
                  width: "100%",
                }}
              />
            </Box>

            {/* Desktop Right */}
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
                alignItems: "center",
                gap: 2,
              }}
            >
              <IconButton onClick={() => navigate("/addtocart")}>
                <Badge badgeContent={totalItem} color="warning">
                  <ShoppingCartOutlined />
                </Badge>
              </IconButton>

              <Avatar
                sx={{ cursor: "pointer" }}
                onClick={() => setOpenDialog(true)}
              />
            </Box>

            {/* Mobile Right */}
            <Box
              sx={{
                display: {
                  xs: "flex",
                  md: "none",
                },
                alignItems: "center",
                // gap: 1,
              }}
            >
              {/* Cart */}
              <IconButton onClick={() => navigate("/addtocart")}>
                <Badge badgeContent={totalItem} color="warning">
                  <ShoppingCartOutlined />
                </Badge>
              </IconButton>

              {/* Menu */}
              <IconButton onClick={() => setOpen(true)}>
                <Menu sx={{fontSize:'30px'}} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 300 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate("/contactus")}>
                <ListItemText primary="Contact" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Sign Up" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 2 }} />
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Logout Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Sign Out</DialogTitle>

        <DialogContent>Are you sure you want to sign out?</DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>

          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{
              bgcolor: "#F9A602",
              color: "#000",
              "&:hover": {
                bgcolor: "#F59E0B",
              },
            }}
          >
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;
