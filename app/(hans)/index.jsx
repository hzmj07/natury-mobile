import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import Header from "../../components/header";
import Foundation from "@expo/vector-icons/Foundation";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useThemeColor } from "@/hooks/useThemeColor";
import CustomTextInput from "../../components/costumInput";
import { addPoint , getUserData } from "../../api/processes";
import { useAuth } from "../../context/Authcontext"; // AuthContext'i içe aktar


const scoreCalculation = (item , gram) =>{
  if(item == "Plastik"){return( gram*3)/10}
  if (item == "Cam" ) {
    return (gram*5)/10
  } if (item == "Kağıt" ) {
    return( gram*8) /10
  }
}



const Home = () => {
  const backgroundColor = useThemeColor({ light: "white", dark: "#1E1E1E" });
  const [addModal, setAddModal] = useState(false);
  const [typeModal, setTypeModal] = useState(false);
  const [selectedType, setSelectedType] = useState("Cam");
   const [gram, setgram] = useState(); 
   const { token  , refreshUserData} = useAuth();

  
  const add = async ()=>{
      const point = scoreCalculation(selectedType ,gram);
      if (!gram) {
        console.log("gram giriniz!");
        return;
        
      }
      try {

        const response = await addPoint(token.accessToken , point);
        await getUserData(token.accessToken , refreshUserData);
        console.log( `responese` , response.data);
        setAddModal(false)
        
      } catch (error) {
        console.error(error);
        
      }
    }

  return (
    <View className="flex-1 items-center justify-start">
      {/* Header */}
      <View className="h-44 w-full items-end justify-start pt-5 pl-20 flex-row">
        <Image className="h-16 w-[52px]" source={require("../../assets/logo.png")} />
        <Text className="color-primre font-bold text-5xl ml-6">Natury</Text>
      </View>

      {/* Main Content */}
      <View className="w-full flex-1 pt-12 justify-center">
        <Text className="color-primre text-3xl pl-10 font-bold w-4/6">
          Merhaba, bugün doğayı korumak için ne yapacaksın?
        </Text>

        <View className="h-80 w-full flex-row items-center justify-center">
          <View className="items-center m-2">
            <TouchableOpacity
              style={{ backgroundColor }}
              className="w-40 h-40 rounded-xl border-[4px] border-primre justify-center items-center"
            >
              <Foundation name="trees" size={64} color="#00A627" />
            </TouchableOpacity>
            <Text className="color-primre text-2xl font-bold pt-3">Ağaç Ek</Text>
          </View>
          <View className="items-center m-2">
            <TouchableOpacity
              style={{ backgroundColor }}
              onPress={() => setAddModal(true)}
              className="w-40 h-40 rounded-xl border-[4px] border-primre justify-center items-center"
            >
              <FontAwesome6 name="recycle" size={64} color="#00A627" />
            </TouchableOpacity>
            <Text className="color-primre text-2xl font-bold pt-3">Geri Dönüşüm Yap</Text>
          </View>
        </View>
      </View>

      {/* Add Modal */}
      <Modal visible={addModal} transparent animationType="fade">
        <View className="flex-1 bg-black/40 justify-center items-center">
          <View style={{ backgroundColor }} className="w-4/6 rounded-2xl border border-primre p-6">
            <Text className="color-primre text-3xl font-bold mb-5">Geri Dönüşüm Yap</Text>
            <TouchableOpacity
              onPress={() => setTypeModal(true)}
              style={{backgroundColor}}
              className="h-12  rounded-xl flex-row items-center justify-between px-4 border border-primre"
            >
              <Text className="font-bold text-2xl color-primre">{selectedType}</Text>
              <MaterialIcons name="expand-more" size={28} color="#00A627" />
            </TouchableOpacity>

            <Text className="color-primre text-3xl font-bold mt-6 mb-3">Ortalama ağırlık (g)</Text>
            <CustomTextInput onChange={setgram} type="numeric" placeholder="Ağırlık Girin" />

            {/* Buttons */}
            <View className="flex-row justify-center mt-6">
              <TouchableOpacity onPress={() => setAddModal(false)} className="w-24 h-12 border border-primre rounded-xl items-center justify-center">
                <MaterialIcons name="cancel" size={24} color="red" />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{add()}} className="w-24 ml-4 h-12 border border-primre rounded-xl items-center justify-center">
                <AntDesign name="checkcircle" size={24} color="#00A627" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Type Selection Modal */}
      <Modal visible={typeModal} transparent animationType="fade">
        <View className="flex-1 bg-black/40 justify-center items-center">
          <View style={{backgroundColor}} className="w-4/6  rounded-2xl p-6 border border-primre">
            <Text className="text-3xl font-bold color-primre mb-4">Tür Seç</Text>
            {["Kağıt", "Cam", "Plastik"].map((type) => (
              <TouchableOpacity
                key={type}
                className="p-4 border-b border-gray-300 items-center"
                onPress={() => {
                  setSelectedType(type);
                  setTypeModal(false);
                }}
              >
                <Text className="text-2xl font-bold color-primre">{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;
