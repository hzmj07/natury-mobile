import { StyleSheet, Text, View } from 'react-native'
import React , {useEffect} from 'react'
import { Slot ,  Redirect } from 'expo-router';
import { useAuth } from '../context/Authcontext';  
import Loading from "./loading"
function AuthGate() {
    const { user, isLoading } = useAuth();
  // Kullanıcı durumunu alıyoruz
  console.log(isLoading );
  
    if (isLoading) {
      return <Loading />; // Yükleniyor durumunda Loading bileşenini render et
    }else{
        <Slot/>
        if (user) {
            return <Redirect href="/(hans)/index" />; // Kullanıcı giriş yapmışsa main grubuna yönlendir
          }
        
          return <Redirect href="/(auth)/login" />; 
    }
  
   
}

export default AuthGate

