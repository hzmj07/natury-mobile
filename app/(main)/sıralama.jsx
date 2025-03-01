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
