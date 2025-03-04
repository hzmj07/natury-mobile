import { View, Text, Image, Dimensions , ScrollView , TouchableOpacity , Modal , TouchableWithoutFeedback} from 'react-native';
import React , {useState} from 'react';
import { LineChart } from 'react-native-chart-kit';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAuth } from '../../context/Authcontext'; 
import Entypo from '@expo/vector-icons/Entypo';
import { useThemeColor } from '@/hooks/useThemeColor';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { deleteUser } from '@/api/auth';
const Home = () => {
  const backgroundColor = useThemeColor({ light: "white", dark: "#1E1E1E" });
  const [typeModal, setTypeModal] = useState(false);

  const { logout , user} = useAuth()
  
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

              <TouchableOpacity onPress={()=>{setTypeModal(true)}} style={{backgroundColor}} className=' w-5/6 h-16 border border-primre rounded-2xl flex-row items-center justify-start pl-7 pr-7 mt-4' >
              <MaterialIcons name="account-circle" size={24} color="#00A627" />
                <Text className='text-2xl color-primre font-bold flex-1 ml-8' >Profil Detayları</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{backgroundColor}} className=' w-5/6 h-16 border border-primre rounded-2xl flex-row items-center justify-start pl-7 pr-7 mt-4' >
              <Entypo name="info-with-circle" size={24} color="#00A627" />
                <Text className='text-2xl color-primre font-bold flex-1 ml-8' >Hakkında</Text>
              </TouchableOpacity>
      </View>
      <View className='items-center ' >
      <TouchableOpacity onPress={()=>logout()} style={{backgroundColor}} className=' w-5/6 h-16 border border-[#DC0004] rounded-2xl flex-row items-center justify-start pl-7 pr-7 mt-6  mb-6' >
              <Feather name="log-out" size={24} color="#DC0004" />
                <Text className='text-2xl color-[#DC0004] font-bold flex-1 ml-8' >Log-Out</Text>
              </TouchableOpacity>
              </View>

              <Modal visible={typeModal} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setTypeModal(false)}>
          <View className="flex-1 bg-black/40 justify-center items-center">
            <TouchableWithoutFeedback>
              <View
                style={{ backgroundColor }}
                className="w-5/6 rounded-2xl p-6 border border-primre"
              >
                <Text className="text-3xl font-bold color-primre mb-4">
                 Profile Detayları
                </Text>

                <Text className="text-xl font-bold color-primre mb-4">
                 Name :  {user?.username }
                </Text>

                <Text className="text-xl font-bold color-primre mb-4">
                Email :  {user?.email}
                </Text>

                <Text className="text-xl font-bold color-primre mb-4">
                 Point :  {user?.userData.totalPoints }
                </Text>


                <TouchableOpacity onPress={()=>deleteUser(user._id , logout)} style={{backgroundColor}} className='  h-12 border border-[#DC0004] rounded-xl flex-row items-center justify-start pl-7 pr-7 mt-6  mb-6' >
              <MaterialCommunityIcons name="delete" size={24} color="#DC0004" />
                <Text className='text-xl color-[#DC0004] font-bold flex-1 ml-8' >Hesabı Sil</Text>
              </TouchableOpacity>
              
              </View>


            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default Home;
