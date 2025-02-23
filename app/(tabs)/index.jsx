import { Image, Text, View , TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../../components/header'
import Foundation from '@expo/vector-icons/Foundation';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
const home = () => {
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

        <View className=" items-center m-2" >
        <TouchableOpacity className="w-40 h-40 bg-white rounded-xl border-[4px] border-primre justify-center items-center " >
        <Foundation name="trees" size={64} color="#00A627" />
        </TouchableOpacity>
        <Text className=" color-primre text-2xl  font-bold pt-3" >Ağaç Ek</Text>
        </View>
        <View className=" items-center m-2" >
        <TouchableOpacity className="w-40 h-40 bg-white rounded-xl border-[4px] border-primre justify-center items-center " >
        <FontAwesome6 name="recycle" size={64} color="#00A627" />
        </TouchableOpacity>
        <Text  className=" color-primre text-2xl  font-bold pt-3" >Geri Dömüşüm Yap</Text>
        </View>
      </View>
      </View>
    </View>
  )
}

export default home

