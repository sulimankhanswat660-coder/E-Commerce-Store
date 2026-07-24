import {
  Box,
  Paper,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../lib/Firebase";
import UserContext from "../../context/UserContext";

function MyOrders() {
  const { currentUser } = useContext(UserContext);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      if (!currentUser) return;

      const q = query(
        collection(db, "orders"),
        where("userId", "==", currentUser)
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(data);
    };

    getOrders();
  }, [currentUser]);

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        mx: "auto",
        mt: 12,
        p: 3,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
      >
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography>
          No orders found.
        </Typography>
      ) : (
        orders.map((order) => (
          <Paper
            key={order.id}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
            }}
          >
            <Typography fontWeight={700}>
              Order ID
            </Typography>

            <Typography color="gray">
              {order.id}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography>
              Name:
              <b> {order.name}</b>
            </Typography>

            <Typography>
              Email:
              <b> {order.email}</b>
            </Typography>

            <Typography>
              Address:
              <b> {order.address}</b>
            </Typography>

            <Typography>
              Phone:
              <b> {order.phone}</b>
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography
              fontWeight={700}
              mb={2}
            >
              Products
            </Typography>

            {order.items.map((item) => (
              <Stack
                key={item.productId}
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 1 }}
              >
                <Typography>
                  {item.title}
                </Typography>

                <Typography>
                  {item.quantity} × ${item.price}
                </Typography>
              </Stack>
            ))}

            <Divider sx={{ my: 2 }} />

            <Typography
              fontWeight="bold"
              fontSize={18}
            >
              Total: ${order.total.toFixed(2)}
            </Typography>
          </Paper>
        ))
      )}
    </Box>
  );
}

export default MyOrders;