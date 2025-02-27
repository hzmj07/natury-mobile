import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import * as SecureStore from "expo-secure-store";
// import { refreshAuthToken } from "../api/auth";

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const intervalRef = useRef(null);

  // const checkTokenValidity = (tokens, expiryTime) => {
  //   const check = () => {
  //     const currentTime = new Date().getTime();
  //     const tokenTime = new Date(tokens.accessTime).getTime();
  //     const expiration = tokenTime + expiryTime * 1000;

  //     if (expiration - currentTime > 120000) {
  //       console.log("Token is valid");
  //     } else {
  //       console.log("Token expired, refreshing...");
  //       refreshAuthToken(tokens.refreshToken, setToken);
  //     }
  //   };

  //   check();
  //   intervalRef.current = setInterval(check, 60000);
  // };

 
  const getUserData = async () => {
    const storedUser = await SecureStore.getItemAsync("user");
    const storedToken = await SecureStore.getItemAsync("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(JSON.parse(storedToken));
    //  checkTokenValidity(JSON.parse(storedToken), 3600);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    getUserData();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const loginContext = async (userData, tokenData) => {
    
    await SecureStore.setItemAsync("user", JSON.stringify(userData));
    await SecureStore.setItemAsync("token", JSON.stringify(tokenData));
    setUser(userData);
    setToken(tokenData);
   // checkTokenValidity(tokenData, 3600);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("user");
    await SecureStore.deleteItemAsync("token");
    setUser(null);
    setToken(null);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, loginContext, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
