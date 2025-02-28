import { Link } from "expo-router";
import { View, Text, TextInput, Button, Image , TouchableOpacity } from "react-native";
import { useAuth } from "../../context/Authcontext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import CustomTextInput from "../../components/costumInput";
import {userRegistar} from "../../api/auth"

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();

  // TextInput odak durumlarını takip etmek için state'ler
  const [Email, setIsEmail] = useState(false);
  const [Name, setisName] = useState(false)
  const [Password, setIsPassword] = useState(false);

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
          <CustomTextInput onChange={setIsEmail} placeholder={"Email"} type={"email"} />
          <CustomTextInput onChange={setisName} placeholder={"Name"} />
          <CustomTextInput onChange={setIsPassword} placeholder={"Password"} />
        </View>

        {/* Giriş Yap Butonu */}
        <TouchableOpacity onPress={()=>userRegistar(Email , Password , Name)} className="bg-primre p-4 mt-6  rounded-2xl flex-row" >
        <Text className="color-white text-xl font-bold " >Hesap Oluştur</Text>
      </TouchableOpacity>

        {/* Kayıt Ol Linki */}
        
      </View>
    </View>
  );
}