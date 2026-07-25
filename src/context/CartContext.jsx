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

    const addToCart = async () => {
      try {
        const productRef = doc(db, "products", String(id));

        const productSnap = await getDoc(productRef);

        if (!productSnap.exists()) {
          alert("Product not found");
          return;
        }

        const product = productSnap.data();

        if (product.stock <= 0) {
          alert("This product is out of stock.");
          return;
        }

        const q = query(
          collection(db, "cart"),
          where("userId", "==", currentUser),
          where("productId", "==", String(id)),
        );

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const cartDoc = snapshot.docs[0];

          const cartData = cartDoc.data();

          if (cartData.quantity >= product.stock) {
            alert("Out of stock");
            return;
          }

          await updateDoc(cartDoc.ref, {
            quantity: increment(1),
          });
        } else {
          await addDoc(collection(db, "cart"), {
            userId: currentUser,
            productId: String(id),
            quantity: 1,
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
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
              productId: cartData.productId,
              quantity: cartData.quantity,
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
