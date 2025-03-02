import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import Header from "../../components/header";
import Foundation from "@expo/vector-icons/Foundation";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useThemeColor } from "@/hooks/useThemeColor";
import CustomTextInput from "../../components/costumInput";
import { addPoint, getUserData, addTree } from "../../api/processes";
import { useAuth } from "../../context/Authcontext"; // AuthContext'i içe aktar
import { showMessage, hideMessage } from "react-native-flash-message";
import Ionicons from "@expo/vector-icons/Ionicons";
const scoreCalculation = (item, gram) => {
  const scoreMap = {
    Plastik: 0.3,
    Cam: 0.5,
    Kağıt: 0.8,
  };

  return gram * (scoreMap[item] || 0);
};

const calculateEnergy = (material, weightInGrams) => {
  const energyData = {
    Plastik: 3, // 500 gram plastik = 3 kWh enerji tasarrufu
    Kağıt: 2, // 500 gram kağıt = 2 kWh enerji tasarrufu
    Cam: 1, // 500 gram cam = 1 kWh enerji tasarrufu
  };

  // 500 gram için belirlenen enerji tasarrufunu kullanarak hesaplama yapalım
  const energySavedPer500g = energyData[material];

  // 500 gram için belirlenen enerji tasarrufunu kullanarak istenen gram için enerji tasarrufunu hesapla
  const energySaved = (weightInGrams / 500) * energySavedPer500g;

  return energySaved;
};

//500 g plastik = 3 kWh
// 500 g kağıt = 2 kWh
// 500 g cam = 1 kwH

const Home = () => {
  const backgroundColor = useThemeColor({ light: "white", dark: "#1E1E1E" });
  const [addModal, setAddModal] = useState(false);
  const [typeModal, setTypeModal] = useState(false);
  const [selectedType, setSelectedType] = useState("Cam");
  const [gram, setgram] = useState();
  const [trees, settrees] = useState(1);
  const [treeModal, settreeModal] = useState(false);
  const { token, refreshUserData } = useAuth();

  const addTrees = async () => {
    console.log("addTree working");

    try {
      const result = await addTree(token.accessToken, trees);
      await getUserData(token.accessToken, refreshUserData);

      console.log(result);
      settreeModal(false);
      showMessage({
        message: ` Tebrikler ${trees} Ağaç Ektiniz !!`,
        type: "success",
        hideStatusBar: true,
        icon: "auto",
      });
      settrees(1);
    } catch (error) {
      showMessage({
        message: error,
        type: "danger",
        hideStatusBar: true,
        icon: "auto",
      });
    }
  };

  const add = async () => {
    const point = scoreCalculation(selectedType, gram);
    if (!gram) {
      console.log("gram giriniz!");
      showMessage({
        message: "gram giriniz!",
        type: "warning",
        hideStatusBar: true,
        icon: "auto",
      });
      return;
    }
    try {
      const energy = await calculateEnergy(selectedType, gram);
      const response = await addPoint(token.accessToken, point, energy);
      await getUserData(token.accessToken, refreshUserData);
      console.log("energy ", energy);

      console.log(`responese`, response);
      setAddModal(false);
      setgram();
      showMessage({
        message: ` Tebrikler ${point} puan kazandınız`,
        type: "success",
        hideStatusBar: true,
        icon: "auto",
      });
    } catch (error) {
      console.error(error);
      showMessage({
        message: error,
        type: "danger",
        hideStatusBar: true,
        icon: "auto",
      });
    }
  };

  return (
    <View className="flex-1 items-center justify-start">
      {/* Header */}
      <View className="h-44 w-full items-end justify-start pt-5 pl-20 flex-row">
        <Image
          className="h-16 w-[52px]"
          source={require("../../assets/logo.png")}
        />
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
              onPress={() => {
                settreeModal(true);
              }}
              style={{ backgroundColor }}
              className="w-40 h-40 rounded-xl border-[4px] border-primre justify-center items-center"
            >
              <Foundation name="trees" size={64} color="#00A627" />
            </TouchableOpacity>
            <Text className="color-primre text-2xl font-bold pt-3">
              Ağaç Ek
            </Text>
          </View>
          <View className="items-center m-2">
            <TouchableOpacity
              style={{ backgroundColor }}
              onPress={() => setAddModal(true)}
              className="w-40 h-40 rounded-xl border-[4px] border-primre justify-center items-center"
            >
              <FontAwesome6 name="recycle" size={64} color="#00A627" />
            </TouchableOpacity>
            <Text className="color-primre text-2xl font-bold pt-3">
              Geri Dönüşüm Yap
            </Text>
          </View>
        </View>
      </View>

      {/* Add Modal */}
      <Modal visible={addModal} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setAddModal(false)}>
          <View className="flex-1 bg-black/40 justify-center items-center">
            <TouchableWithoutFeedback>
              <View
                style={{ backgroundColor }}
                className="w-4/6 rounded-2xl border border-primre p-6"
              >
                <Text className="color-primre text-3xl font-bold mb-5">
                  Geri Dönüşüm Yap
                </Text>
                <TouchableOpacity
                  onPress={() => setTypeModal(true)}
                  style={{ backgroundColor }}
                  className="h-12 rounded-xl flex-row items-center justify-between px-4 border border-primre"
                >
                  <Text className="font-bold text-2xl color-primre">
                    {selectedType}
                  </Text>
                  <MaterialIcons name="expand-more" size={28} color="#00A627" />
                </TouchableOpacity>

                <Text className="color-primre text-3xl font-bold mt-6 mb-3">
                  Ortalama ağırlık (g)
                </Text>
                <CustomTextInput
                  onChange={setgram}
                  type="numeric"
                  placeholder="Ağırlık Girin"
                />

                {/* Buttons */}
                <View className="flex-row justify-center mt-6">
                  <TouchableOpacity
                    onPress={() => setAddModal(false)}
                    className="w-24 h-12 border border-primre rounded-xl items-center justify-center"
                  >
                    <MaterialIcons name="cancel" size={24} color="red" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      add();
                    }}
                    className="w-24 ml-4 h-12 border border-primre rounded-xl items-center justify-center"
                  >
                    <AntDesign name="checkcircle" size={24} color="#00A627" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal visible={treeModal} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => settreeModal(false)}>
          <View className="flex-1 bg-black/40 justify-center items-center">
            <TouchableWithoutFeedback>
              <View
                style={{ backgroundColor }}
                className="w-4/6 rounded-2xl border border-primre p-6"
              >
                <Text className="color-primre text-3xl font-bold ">
                  Ağaç sayısı
                </Text>

                <View className="flex-row justify-center items-center mt-6">
                  <TouchableOpacity
                    onPress={() => {
                      trees == 1 ? null : settrees(trees - 1);
                    }}
                    className="w-24 h-12 rounded-xl items-center justify-center"
                  >
                    <AntDesign name="minuscircle" size={24} color="red" />
                  </TouchableOpacity>
                  <Text className="color-primre text-3xl font-bold ">
                    {trees}
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      {
                        trees == 5
                          ? showMessage({
                              message: "Tek seferde En fazla 5 ağaç eklenir",
                              type: "warning",
                              hideStatusBar: true,
                              icon: "auto",
                            })
                          : settrees(trees + 1);
                      }
                    }}
                    className="w-24 ml-4 h-12  rounded-xl items-center justify-center"
                  >
                    <Ionicons
                      name="add-circle-sharp"
                      size={31}
                      color="#00A627"
                    />
                  </TouchableOpacity>
                </View>

                {/* Buttons */}
                <View className="flex-row justify-center mt-6">
                  <TouchableOpacity
                    onPress={() => settreeModal(false)}
                    className="w-24 h-12 border border-primre rounded-xl items-center justify-center"
                  >
                    <MaterialIcons name="cancel" size={24} color="red" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      addTrees();
                    }}
                    className="w-24 ml-4 h-12 border border-primre rounded-xl items-center justify-center"
                  >
                    <AntDesign name="checkcircle" size={24} color="#00A627" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* Type Selection Modal */}

      <Modal visible={typeModal} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setTypeModal(false)}>
          <View className="flex-1 bg-black/40 justify-center items-center">
            <TouchableWithoutFeedback>
              <View
                style={{ backgroundColor }}
                className="w-4/6 rounded-2xl p-6 border border-primre"
              >
                <Text className="text-3xl font-bold color-primre mb-4">
                  Tür Seç
                </Text>
                {["Kağıt", "Cam", "Plastik"].map((type) => (
                  <TouchableOpacity
                    key={type}
                    className="p-2 border rounded-lg m-2  border-primre items-center"
                    onPress={() => {
                      setSelectedType(type);
                      setTypeModal(false);
                    }}
                  >
                    <Text className="text-2xl font-bold color-primre">
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default Home;
