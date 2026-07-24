import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../lib/Firebase";
import UserContext from "./UserContext";

export const cartContext = createContext();

function Cart({ children }) {
  const { currentUser } = useContext(UserContext);

  const [id, setId] = useState("");
  const [cartItem, setCartItem] = useState([]);

  // Add product to cart
  useEffect(() => {
    if (!id || !currentUser) return;

    const addCart = async () => {
      try {
        await addDoc(collection(db, "cart"), {
          userId: currentUser,
          productId: id,
          quantity: 1,
        });

        setId("");
      } catch (error) {
        console.log(error);
      }
    };

    addCart();
  }, [id, currentUser]);

  // Read cart and merge with product details
  useEffect(() => {
    if (!currentUser) {
      setCartItem([]);
      return;
    }

    const q = query(collection(db, "cart"), where("userId", "==", currentUser));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      try {
        const items = await Promise.all(
          snapshot.docs.map(async (cartDoc) => {
            const cartData = cartDoc.data();

            // Product document
            const productRef = doc(db, "products", String(cartData.productId));

            const productSnap = await getDoc(productRef);

            if (!productSnap.exists()) {
              console.log("Product not found:", cartData.productId);
              return null;
            }
            return {
              cartId: cartDoc.id,

              userId: cartData.userId,
              productId: cartData.productId,
              quantity: cartData.quantity,

              // Product details
              ...productSnap.data(),
            };
          }),
        );

        setCartItem(items.filter(Boolean));
      } catch (error) {
        console.log(error);
      }
    });

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <cartContext.Provider
      value={{
        cartItem,
        setCartItem,
        setId,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export { Cart };
