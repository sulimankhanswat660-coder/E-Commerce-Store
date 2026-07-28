

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../lib/Firebase";
import UserContext from "../../context/UserContext";

function OrderHistory() {
  const { currentUser } = useContext(UserContext);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "orders"),
      where("userId", "==", currentUser),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(data);
    });

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <Container maxWidth="md" sx={{ mt: 15, mb: 8 }}>
      <Typography variant="h4" fontWeight={700} textAlign="center" mb={5}>
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography textAlign="center">No Orders Found</Typography>
      ) : (
        orders.map((order) => (
          <Card
            key={order.id}
            sx={{
              mb: 4,
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <CardContent>
              {/* Header */}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mx: "auto",
                }}
              >
                <Box>
                  <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
                    Order #{order.id.slice(0, 8)}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {order.createdAt?.toDate().toLocaleDateString()}
                  </Typography>
                </Box>

                <Chip
                  label={order.status}
                  color={
                    order.status === "Pending"
                      ? "warning"
                      : order.status === "Delivered"
                        ? "success"
                        : "primary"
                  }
                />
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Customer */}

              <Typography sx={{ fontWeight: 700, fontSize: 20, mb: 2 }}>
                Customer Information
              </Typography>

              <Typography>
                <strong>Name:</strong> {order.customer.name}
              </Typography>

              <Typography>
                <strong>Email:</strong> {order.customer.email}
              </Typography>

              <Typography>
                <strong>Phone:</strong> {order.customer.phone}
              </Typography>

              <Typography>
                <strong>Address:</strong> {order.customer.address}
              </Typography>

              <Typography>
                <strong>City:</strong> {order.customer.city}
              </Typography>

              <Divider sx={{ my: 3 }} />

              {/* Products */}

              <Typography sx={{ fontWeight: 700, fontSize: 20, mb: 2 }}>
                Products
              </Typography>

              {order.items.map((item) => (
                <Box
                  key={item.productId}
                  sx={{
                    display: "flex",
                    gap: { xs: 2, sm: 3 },
                    alignItems: "center",
                    mb: 2,
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "#fafafa",
                  }}
                >
                  <Avatar
                    src={item.image}
                    variant="rounded"
                    sx={{
                      width: 70,
                      height: 70,
                    }}
                  />

                  <Box
                    sx={{
                      width: "90%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography sx={{mb:1}}>{item.name}</Typography>
                        <Typography color="text.secondary">
                          Quantity :
                        </Typography>
                      </Box>
                      <Box >
                        <Typography sx={{ fontWeight: 700 }}>
                          {item.price}
                        </Typography>
                        <Typography sx={{ fontWeight: 700, mt:1}}>
                          {item.quantity}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}

              <Divider sx={{ my: 3 }} />

              {/* Summary */}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: "10px",
                }}
              >
                <Typography sx={{ fontSize: "16px" }}>Total Items</Typography>
                <Typography sx={{ fontSize: "16px" }}>
                  {order.totalItems}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
                  Subtotal
                </Typography>

                <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
                  ${order.subtotal.toFixed(2)}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography>Tax</Typography>

                <Typography>${order.tax.toFixed(2)}</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
                  Total
                </Typography>

                <Typography
                  sx={{ fontSize: 18, fontWeight: 700, color: "#F59E0B" }}
                >
                  ${order.total.toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
}

export default OrderHistory;
