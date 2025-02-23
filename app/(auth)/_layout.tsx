import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown:false, title: 'Giriş Yap' }} />
      <Stack.Screen name="register" options={{ headerShown:false,  title: 'Kayıt Ol' }} />
    </Stack>
  );
}
