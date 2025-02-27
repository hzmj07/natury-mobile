import { View, Text, Image, Dimensions , ScrollView } from 'react-native';
import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAuth } from "../../context/Authcontext"; // AuthContext'i içe aktar

const Home = () => {
  const backgroundColor = useThemeColor({ light: "white", dark: "#1E1E1E" });
  const { user } = useAuth();
  console.log(user);
   // Auth verilerine eriş
 
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

      {/* Chart Container */}
      <View className="flex-1 items-center pt-6 ">
          <LineChart
            data={{
              labels: ['pzt', 'sal', 'çar', 'per', 'cum', 'cmt' , 'pzr'],
              datasets: [
                {
                  data: [0, 20 , 30 , 20, 50 , 0 ,70 ],
                  color: (opacity = 1) => `rgba(0, 166, 39, ${opacity})`, 
                  strokeWidth: 2,
                },
              ],
            }}
            width={Dimensions.get('window').width * 0.85} 
            height={240}
            yAxisInterval={1}
            chartConfig={{
              backgroundGradientFrom: '#E8F5E9',
              backgroundGradientTo: '#C8E6C9',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 166, 39, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 166, 39, ${opacity})`,
              style: { borderRadius: 2},
              propsForDots: {
                r: '3',
                strokeWidth: '0',
                stroke: '#00A627',
              },
            }}
            bezier
            style={{ marginVertical: 8, borderRadius: 12, borderWidth:1 , borderColor:"#00A627"}}
          />


            <ScrollView contentContainerStyle={{alignItems:"center" , justifyContent:"center"}} className='h-full w-full   pt-11 '  >
              <View  style={{backgroundColor}} className=' w-5/6 h-20 border border-primre rounded-2xl flex-row items-center justify-start pl-7 pr-7 mt-6 ' >
                <Text className='text-2xl color-primre font-bold flex-1' >Ekilen Ağaç Sayısı</Text>
                <Text className='text-2xl color-primre font-bold ' >{user.userData.trees}</Text>
              </View>
              <View style={{backgroundColor}} className=' w-5/6 h-20 border border-primre rounded-2xl flex-row items-center justify-start pl-7 pr-7 mt-6 ' >
                <Text className='text-2xl color-primre font-bold flex-1' >Geri Kazanılan Oksijen</Text>
                <Text className='text-2xl color-primre font-bold ' >12</Text>
              </View>
              <View style={{backgroundColor}} className=' w-5/6 h-20 border border-primre rounded-2xl flex-row items-center justify-start pl-7 pr-7 mt-6 ' >
                <Text className='text-2xl color-primre font-bold flex-1' >Globel Puan</Text>
                <Text className='text-2xl color-primre font-bold ' >{user.userData.totalPoints}</Text>
              </View>
              <View style={{backgroundColor}} className=' w-5/6 h-20 border border-primre rounded-2xl flex-row items-center justify-start pl-7 pr-7 mt-6 ' >
                <Text className='text-2xl color-primre font-bold flex-1' >Globel Sıralaman</Text>
                <Text className='text-2xl color-primre font-bold ' >12</Text>
              </View>
              

              
            </ScrollView>




      </View>
    </View>
  );
};

export default Home;
