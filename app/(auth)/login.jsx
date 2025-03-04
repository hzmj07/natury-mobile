import { Link } from "expo-router";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { useAuth } from "../../context/Authcontext"; // AuthContext'i içe aktar

import { useRouter } from "expo-router";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomTextInput from "../../components/costumInput";
import { UserLogin } from "../../api/auth";
export default function LoginScreen() {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [isLoading, setisLoading] = useState(false);

  const { loginContext } = useAuth(); // Auth verilerine eriş
  const router = useRouter();

  const log = async () => {
    setisLoading(true);
    try {
      await UserLogin(email, password, loginContext);
      setemail();
      setpassword();
      setisLoading(false);
    } catch (error) {
      globelError(error);
      setisLoading(false);
    }
  };
  // TextInput odak durumlarını takip etmek için state'ler

  return (
    <View className="flex-1 items-center justify-start">
      {/* Logo ve Başlık */}
      <View className="h-80 w-full items-end justify-center flex-row">
        <Image
          className="h-16 w-[52px]"
          source={require("../../assets/logo.png")}
        />
        <Text className="text-primary font-bold text-6xl ml-6 color-primre">
          Natury
        </Text>
      </View>

      {/* Giriş Formu */}
      <View className="flex-1 justify-center w-full items-center">
        <View className="w-4/6">
          {/* Email Input */}
          <CustomTextInput
            onChange={setemail}
            value={email}
            placeholder={"Email"}
          />
          <CustomTextInput
            onChange={setpassword}
            value={password}
            placeholder={"Password"}
          />
        </View>

        {/* Giriş Yap Butonu */}
        <TouchableOpacity
          onPress={() => log()}
          className="bg-primre p-4 mt-6  rounded-xl flex-row"
        >
          {isLoading ? (
            <ActivityIndicator color={"white"} />
          ) : (
            <>
              <Text className="color-white text-xl font-bold mr-3">
                Giriş Yap
              </Text>
              <MaterialIcons name="login" size={24} color="white" />
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            router.push("/register");
          }}
          className=" p-3 mt-6 border border-primre rounded-xl flex-row"
        >
          <Text className="color-primre text-lg font-bold ">Hesap oluştur</Text>
        </TouchableOpacity>
        {/* Kayıt Ol Linki */}
      </View>
    </View>
  );
}
