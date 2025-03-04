import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../api/usersData";
import { useAuth } from "../../context/Authcontext"; // AuthContext'i içe aktar

const Home = () => {
  const backgroundColor = useThemeColor({ light: "white", dark: "#1E1E1E" });
  const { token } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(token.accessToken),
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch(); // Yeniden veri çek
    setRefreshing(false);
  };

  return (
    <View className="flex-1">
      {/* Header */}
      <View className="h-44 w-full items-end justify-start pt-5 pl-20 flex-row">
        <Image
          className="h-16 w-[52px]"
          source={require("../../assets/logo.png")}
        />
        <Text className="color-primre font-bold text-5xl ml-6">Natury</Text>
      </View>

      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {isError && <Text>{error.message}</Text>}
    <View className="flex-1  pl-3  pr-3 mt-3" >
      {data && (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing}  onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            
     
          item.userData.totalPoints > 0 && <View
          style={[{ backgroundColor }]}
          className="h-16 border border-primre rounded-2xl flex-row items-center justify-start pl-7 pr-7 mt-3"
        >
          <Text className="text-2xl color-primre font-bold">{item.rank}.</Text>
          <Text className="text-2xl color-primre font-bold flex-1 ml-6">
            {item.username}
          </Text>
          <Text className="text-2xl color-primre font-bold">
            {item.userData.totalPoints}
          </Text>
        </View>
         
          )}
        />
      )}
      </View>
    </View>
  );
};

export default Home;
