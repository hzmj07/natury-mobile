import { Link } from "expo-router";
import { View, Text, TextInput, Button, Image , TouchableOpacity  , ActivityIndicator} from "react-native";
import { useAuth } from "../../context/Authcontext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import CustomTextInput from "../../components/costumInput";
import {userRegistar} from "../../api/auth";
import { globelError } from "@/api/globelError";

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();


  // TextInput odak durumlarını takip etmek için state'ler
  const [Email, setIsEmail] = useState();
  const [Name, setisName] = useState()
  const [Password, setIsPassword] = useState();
  const [isLoading, setisLoading] = useState(false);
  const reg = async ()=>{
    setisLoading(true);
    try {
        await userRegistar(Email , Password , Name);
        setIsEmail();
        setIsPassword();
        setisName();
        setisLoading(false);
    } catch (error) {
      globelError(error);
      setisLoading(false);
    }
  }

  return (
    <View className="flex-1 items-center justify-start">
      {/* Logo ve Başlık */}
      <View className="h-80 w-full items-end justify-center flex-row">
        <Image
          className="h-16 w-[52px]"
          source={require("../../assets/logo.png")}
        />
        <Text className="text-primary font-bold text-6xl ml-6 color-primre">Natury</Text>
      </View>

      <View className="flex-1 justify-center w-full items-center">
        <View className="w-4/6">
 
          <CustomTextInput onChange={setIsEmail} placeholder={"Email"} type={"email"} />
          <CustomTextInput onChange={setisName} placeholder={"Name"} />
          <CustomTextInput onChange={setIsPassword} placeholder={"Password"} />
        </View>


        <TouchableOpacity onPress={()=>reg()} className="bg-primre p-4 mt-6  rounded-2xl flex-row" >
     {isLoading ? <ActivityIndicator color={"white"}/> : <Text className="color-white text-xl font-bold " >Hesap Oluştur</Text> }   
      </TouchableOpacity>


        
      </View>
    </View>
  );
}