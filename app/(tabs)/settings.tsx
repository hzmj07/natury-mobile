import { View, Text, Image, Dimensions , ScrollView , TouchableOpacity} from 'react-native';
import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAuth } from '../../context/Authcontext'; 
import Entypo from '@expo/vector-icons/Entypo';
const Home = () => {
  const { logout } = useAuth()
  return (
    <View className="flex-1 ">

      <View className=" h-44  w-full  items-end justify-start pt-5 pl-20 flex-row">
      <Image
            className="h-16 w-[52px]"
            source={require("../../assets/logo.png")}
          />
           <Text className="color-primre font-bold  text-5xl ml-6" >Natury</Text>
         </View>


      <View className="flex-1  items-center justify-center pt-6 ">      
      <TouchableOpacity className='bg-white w-5/6 h-16 border border-primre rounded-2xl flex-row items-center justify-start pl-7 pr-7 mt-4 ' >
              <Ionicons name="moon" size={24} color="#00A627" />
                <Text className='text-2xl color-primre font-bold flex-1 ml-8' >Tema</Text>
              </TouchableOpacity>

              <TouchableOpacity className='bg-white w-5/6 h-16 border border-primre rounded-2xl flex-row items-center justify-start pl-7 pr-7 mt-4' >
              <MaterialIcons name="account-circle" size={24} color="#00A627" />
                <Text className='text-2xl color-primre font-bold flex-1 ml-8' >Profil Detayları</Text>
              </TouchableOpacity>

              <TouchableOpacity className='bg-white w-5/6 h-16 border border-primre rounded-2xl flex-row items-center justify-start pl-7 pr-7 mt-4' >
              <Entypo name="info-with-circle" size={24} color="#00A627" />
                <Text className='text-2xl color-primre font-bold flex-1 ml-8' >Hakkında</Text>
              </TouchableOpacity>
      </View>
      <View className='items-center ' >
      <TouchableOpacity onPress={()=>logout()} className='bg-white w-5/6 h-16 border border-[#DC0004] rounded-2xl flex-row items-center justify-start pl-7 pr-7 mt-6  mb-6' >
              <Feather name="log-out" size={24} color="#DC0004" />
                <Text className='text-2xl color-[#DC0004] font-bold flex-1 ml-8' >Log-Out</Text>
              </TouchableOpacity>
              </View>
    </View>
  );
};

export default Home;
