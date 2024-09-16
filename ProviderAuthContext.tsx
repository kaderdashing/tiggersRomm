import React, { createContext, useState, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import checkIfSignedIn from "./hook/useAuth";

// Create the context
const AuthContext = createContext<{
  isAuth: string | null;
  setIsAuth: (value: string | null) => void;
}>({
  isAuth: null,
  setIsAuth: () => {},
});

// Create the provider component
export const ProviderAuthContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuth, setIsAuth] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = await SecureStore.getItemAsync("token");
      setIsAuth(token);
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the context
export const useIsAuth = () => useContext(AuthContext);
