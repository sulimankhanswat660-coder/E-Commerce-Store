import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { auth } from "../lib/Firebase";
const UserContext = createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [counter, setCounter] = useState(0);
  const currentUser = user?.uid || null;
  const value = { user, setUser, counter, setCounter, currentUser };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserContext, UserContextProvider };
export default UserContext;
