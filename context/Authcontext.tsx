import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import * as SecureStore from "expo-secure-store";
import { refrashToken } from "../api/auth";

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
  const [userData , setUserData] = useState (null); 
  const [token, setToken] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const intervalRef = useRef(null);

  const checkTokenValidity = (tokens, expiryTime) => {
    console.log(tokens);
    
    if (!tokens?.acsessTime) {
      console.error("❌ Geçersiz token: accessTime eksik!");
      return;
    }
  
    const check = () => {
      const currentTime = Date.now();
      const tokenTime = new Date(tokens.acsessTime).getTime();
      const expiration = tokenTime + expiryTime * 1000;
      const timeLeft = expiration - currentTime;
  
      console.log(" Şu Anki Zaman:", new Date(currentTime).toISOString());
      console.log(" Token Başlangıcı:", new Date(tokenTime).toISOString());
      console.log(" Token Geçerlilik Süresi:", new Date(expiration).toISOString());
      console.log(" Kalan Süre (ms):", timeLeft);
      console.log(" Kalan Süre (dakika):", timeLeft / 60000);
  
      if (timeLeft > 120000) {
        console.log(" Token hala geçerli.");
      } else {
        console.log(" Token süresi doldu, yenileniyor...");
        refrashToken(tokens.refreshToken, setToken);
      }
    };
  
    // İlk kontrolü yap
    check();
  
    // Önceki interval varsa temizle
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  
    // Yeni interval başlat
    intervalRef.current = setInterval(check, 60000);
  };
  
  const getUserData = async () => {
    const storedUserData = await SecureStore.getItemAsync("userData");
    const storedUser = await SecureStore.getItemAsync("user");
    const storedToken = await SecureStore.getItemAsync("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(JSON.parse(storedToken));
      checkTokenValidity(JSON.parse(storedToken), 3600);
    }
    console.log("storedUserData" , storedUserData);
    
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    
  
      setLoading(false);

   
  };

  useEffect(() => {
    getUserData();
  }, []);


  const refreshUserData = async (data) =>{
    await SecureStore.setItemAsync("userdata", JSON.stringify(data));
    setUserData(data);

  }
  
  const loginContext = async (data, tokenData) => {
    console.log( "userData after login" , data.userData);
    
    await SecureStore.setItemAsync("user", JSON.stringify(data));
    await SecureStore.setItemAsync("userData", JSON.stringify(data.userData));
    await SecureStore.setItemAsync("token", JSON.stringify(tokenData));
    setUser(data);
    setUserData(data.userData);
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
      value={{ user, token, isLoading, loginContext, logout , refreshUserData , userData , setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
