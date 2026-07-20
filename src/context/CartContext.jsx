import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../lib/Firebase";
import UserContext from "./UserContext";

const cartContext = createContext();

function Cart({ children }) {
  const { currentUser } = useContext(UserContext);

  const [id, setId] = useState("");
  const [cartItem, setCartItem] = useState([]);

  // Add item when id changes
  useEffect(() => {
    if (!id || !currentUser) return;

    const addCart = async () => {
      try {
        await addDoc(collection(db, "cart"), {
          productId: id,
          userId: currentUser,
          quantity: 1,
        });
      } catch (error) {
        console.log(error);
      }
    };

    addCart();
  }, [id, currentUser]);

  // Listen for cart changes
  useEffect(() => {
    if (!currentUser) {
      setCartItem([]);
      return;
    }

    const q = query(
      collection(db, "cart"),
      where("userId", "==", currentUser)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCartItem(data);
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

export { Cart, cartContext };