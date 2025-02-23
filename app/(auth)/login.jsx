import { Link } from "expo-router";
import { View, Text, TextInput, Button, Image , TouchableOpacity } from "react-native";
import { useAuth } from "../../context/Authcontext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();

  // TextInput odak durumlarını takip etmek için state'ler
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  return (
    <View className="flex-1 items-center justify-start">
      {/* Logo ve Başlık */}
      <View className="h-80 w-full items-end justify-center flex-row">
        <Image
          className="h-16 w-[52px]"
          source={require("../../assets/logo.png")}
        />
        <Text className="text-primary font-bold text-5xl ml-6 color-primre">Natury</Text>
      </View>

      {/* Giriş Formu */}
      <View className="flex-1 justify-center w-full items-center">
        <View className="w-4/6">
          {/* Email Input */}
          <TextInput
            className={`bg-white pl-5 text-2xl rounded-2xl border ${
              isEmailFocused ? "border-primre" : "border-gray-300"
            }`}
            placeholder="Email"
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
          />

          {/* Şifre Input */}
          <TextInput
            className={`bg-white pl-5 text-2xl rounded-2xl border mt-4 ${
              isPasswordFocused ? "border-primre" : "border-gray-300"
            }`}
            placeholder="Şifre"
            secureTextEntry
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />
        </View>

        {/* Giriş Yap Butonu */}
        <TouchableOpacity onPress={()=>login()} className="bg-primre p-4 mt-6  rounded-xl flex-row" >
        <Text className="color-white text-xl font-bold mr-3" >Giriş Yap</Text>
        <MaterialIcons name="login" size={24} color="white" />
      </TouchableOpacity>

        {/* Kayıt Ol Linki */}
        <Text
          className="mt-4 text-blue-500 underline"
          onPress={() => {
            router.push("/register");
          }}
        >
          Kayıt Ol
        </Text>
      </View>
    </View>
  );
}