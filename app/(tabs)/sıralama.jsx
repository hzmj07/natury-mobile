import { View, Text, Image, Dimensions , ScrollView , ActivityIndicator } from 'react-native';
import React from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../../api/usersData';
import { useAuth } from "../../context/Authcontext"; // AuthContext'i içe aktar

const Home = () => {
  const backgroundColor = useThemeColor({ light: "white", dark: "#1E1E1E" });
  const { token } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn:() => getAllUsers(token.accessToken),
  });
  console.log(data);
 
  
  
  const rank = [
    { "name": "Aaliyah", "rank": 1, "points": 400 },
    { "name": "Zeynep", "rank": 2, "points": 392 },
    { "name": "Liam", "rank": 3, "points": 384 },
    { "name": "Maya", "rank": 4, "points": 376 },
    { "name": "Kaan", "rank": 5, "points": 368 },
    { "name": "Fatma", "rank": 6, "points": 360 },
    { "name": "Omar", "rank": 7, "points": 352 },
    { "name": "Elif", "rank": 8, "points": 344 },
    { "name": "Zara", "rank": 9, "points": 336 },
    { "name": "Yusuf", "rank": 10, "points": 328 },
    { "name": "Layla", "rank": 11, "points": 320 },
    { "name": "Emin", "rank": 12, "points": 312 },
    { "name": "Sara", "rank": 13, "points": 304 },
    { "name": "Ali", "rank": 14, "points": 296 },
    { "name": "Aisha", "rank": 15, "points": 288 },
    { "name": "Mert", "rank": 16, "points": 280 },
    { "name": "Noah", "rank": 17, "points": 272 },
    { "name": "Hana", "rank": 18, "points": 264 },
    { "name": "Emre", "rank": 19, "points": 256 },
    { "name": "Amira", "rank": 20, "points": 248 },
    { "name": "Zain", "rank": 21, "points": 240 },
    { "name": "Sofia", "rank": 22, "points": 232 },
    { "name": "Hüseyin", "rank": 23, "points": 224 },
    { "name": "Nadia", "rank": 24, "points": 216 },
    { "name": "Yasin", "rank": 25, "points": 208 },
    { "name": "Alya", "rank": 26, "points": 200 },
    { "name": "Burak", "rank": 27, "points": 192 },
    { "name": "Rami", "rank": 28, "points": 184 },
    { "name": "Derya", "rank": 29, "points": 176 },
    { "name": "Mira", "rank": 30, "points": 168 },
    { "name": "Sami", "rank": 31, "points": 160 },
    { "name": "Tuna", "rank": 32, "points": 152 },
    { "name": "Nura", "rank": 33, "points": 144 },
    { "name": "Jasmine", "rank": 34, "points": 136 },
    { "name": "Emine", "rank": 35, "points": 128 },
    { "name": "Zeydan", "rank": 36, "points": 120 },
    { "name": "Selin", "rank": 37, "points": 112 },
    { "name": "Khalid", "rank": 38, "points": 104 },
    { "name": "Dila", "rank": 39, "points": 96 },
    { "name": "Sadi", "rank": 40, "points": 88 },
    { "name": "Aylin", "rank": 41, "points": 80 },
    { "name": "Tariq", "rank": 42, "points": 72 },
    { "name": "Elena", "rank": 43, "points": 64 },
    { "name": "Bilal", "rank": 44, "points": 56 },
    { "name": "Ines", "rank": 45, "points": 48 },
    { "name": "Hazem", "rank": 46, "points": 40 },
    { "name": "Shirin", "rank": 47, "points": 32 },
    { "name": "Ege", "rank": 48, "points": 24 },
    { "name": "Nesrin", "rank": 49, "points": 16 },
    { "name": "Suleiman", "rank": 50, "points": 8 },
  ];
  
  return (
    <View className="flex-1 ">
      {/* Header */}
      <View className=" h-44  w-full  items-end justify-start pt-5 pl-20 flex-row">
      <Image
            className="h-16 w-[52px]"
            source={require("../../assets/logo.png")}
          />
           <Text className="color-primre font-bold  text-5xl ml-6" >Natury</Text>
         </View>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {isError && <Text>{error.message}</Text>}
      {data && <View className="flex-1 items-center pt-6 ">
            <ScrollView contentContainerStyle={{alignItems:"center" , justifyContent:"center"}} className='h-full w-full  '  >

          {data.map((item)=>{
            return(
            <View key={item._id} style={[{width:"93%"},{backgroundColor}]} className=' h-16 border border-primre rounded-2xl flex-row items-center justify-start pl-7 pr-7 mt-3 ' >
                <Text className='text-2xl color-primre font-bold ' >{item.rank}.</Text>
                <Text className='text-2xl color-primre font-bold flex-1 ml-6' >{item.username}</Text>
                <Text className='text-2xl color-primre font-bold ' >{item.userData.totalPoints }</Text>
              </View>)
          })}
              
            </ScrollView>
      </View>}

      {/* Chart Container */}
     
    </View>
  );
};

export default Home;
