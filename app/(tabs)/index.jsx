import { Image, Text, View , TouchableOpacity , TouchableWithoutFeedback } from 'react-native'
import React , {useState} from 'react'
import Header from '../../components/header'
import Foundation from '@expo/vector-icons/Foundation';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useThemeColor } from '@/hooks/useThemeColor';



const home = () => {
  const backgroundColor = useThemeColor({ light: "white", dark: "#1E1E1E" });
  const [addModal, setaddModal] = useState(false);
  return (
    <View className="flex-1 items-center justify-start" >
      <View className=" h-44  w-full  items-end justify-start pt-5 pl-20 flex-row">
      <Image
            className="h-16 w-[52px]"
            source={require("../../assets/logo.png")}
          />
           <Text className="color-primre font-bold  text-5xl ml-6" >Natury</Text>
         </View>
    
    <View className=" w-full flex-1 pt-12 justify-center " ><Text className=" color-primre text-3xl  pl-10 font-bold w-4/6" >Merhaba , 
      Bu gün Doğayı korumak için ne yapıcaksın ?</Text>
      
      <View className=" h-80 w-full flex-row items-center justify-center" >

        <View  className=" items-center m-2" >
        <TouchableOpacity onPress={()=>{setaddModal(true)}} style={{backgroundColor}} className="w-40 h-40 rounded-xl border-[4px] border-primre justify-center items-center " >
        <Foundation name="trees" size={64} color="#00A627" />
        </TouchableOpacity>
        <Text className=" color-primre text-2xl  font-bold pt-3" >Ağaç Ek</Text>
        </View>
        <View className=" items-center m-2" >
        <TouchableOpacity  style={{backgroundColor}} className="w-40 h-40  rounded-xl border-[4px] border-primre justify-center items-center " >
        <FontAwesome6 name="recycle" size={64} color="#00A627" />
        </TouchableOpacity>
        <Text  className=" color-primre text-2xl  font-bold pt-3" >Geri Dömüşüm Yap</Text>
        </View>
      </View>

      
      </View>
    

{addModal&& 

<TouchableWithoutFeedback  onPress={()=>{setaddModal(false)}}  >
    <View className="absolute bg-black/40 w-full h-full  flex-1 items-center justify-center" >
      <TouchableOpacity  style={{backgroundColor}} activeOpacity={1} className=" w-4/6  rounded-2xl border border-primre" >
        <View className="w-full h-40  p-6 justify-center items-center  " >
          <Text className="color-primre text-3xl font-bold w-full mb-3" >Tür</Text>
          <TouchableOpacity className=" h-12 bg-[#DBDBDB] rounded-xl items-center justify-center flex-row pl-6 pr-4" >
            <Text className="font-bold text-2xl color-primre " >Cam</Text>
            <MaterialIcons className="ml-4" name="expand-more" size={28} color="#00A627" />
          </TouchableOpacity>
        </View>

        <View className="w-full  h-40  p-6 justify-center items-center " >
          <Text className="color-primre text-3xl font-bold w-full mb-3" >Ortalama ağırlık (g) </Text>
          <TouchableOpacity className="w-4/6 h-12 bg-slate-500 rounded-xl items-center justify-center" >
            <Text>Cam</Text>
          </TouchableOpacity>
        </View>

        <View className="w-full h-24  p-6 justify-center items-center flex-row " >
          <TouchableOpacity onPress={()=>{setaddModal(false)}}  className="w-24 h-12 border border-primre rounded-xl items-center justify-center" >
          <MaterialIcons name="cancel" size={24} color="red" />
          </TouchableOpacity>
          <TouchableOpacity className="w-24 ml-4 h-12 border border-primre rounded-xl items-center justify-center" >
          <AntDesign name="checkcircle" size={24} color="#00A627" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      
    </View>
</TouchableWithoutFeedback >}
    
    </View>
  )
}

export default home

