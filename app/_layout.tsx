import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import '../global.css';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider, useAuth } from '../context/Authcontext';  
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { View, ActivityIndicator} from "react-native";
import AuthNavi from "../components/userNavigator"

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();
  
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
       
        <AuthNavi />
      </AuthProvider>
    </ThemeProvider>
    </QueryClientProvider>
  );
}

// Yönlendirmeyi basit bir şekilde yapıyoruz

