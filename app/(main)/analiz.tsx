import { View, Text, Image, Dimensions , ScrollView } from 'react-native';
import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAuth } from "../../context/Authcontext"; // AuthContext'i içe aktar

const Home = () => {
  const backgroundColor = useThemeColor({ light: "white", dark: "#1E1E1E" });
  const { userData } = useAuth();
  userData.weeks && console.log("week content" , userData.weeks)
 ;


  function getYearWeek(isoDate) {
    const date = new Date(isoDate); // UTC formatından Date objesine çevir
    
    // Haftanın ilk gününü (Pazartesi) belirleyerek UTC'ye çevir
    const firstDayOfYear = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    
    // Geçen gün sayısını hesapla
    const pastDays = Math.floor((date - firstDayOfYear) / (1000 * 60 * 60 * 24));
    
    // Haftayı hesapla (1 Ocak = 1. hafta)
    const weekNumber = Math.ceil((pastDays + firstDayOfYear.getUTCDay() + 1) / 7);

    return `${date.getUTCFullYear()}-${String(weekNumber).padStart(2, "0")}`;
}
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
        {userData.weeks.length > 0 && <ScrollView horizontal={true} contentContainerStyle={{flexGrow:1 , height:480, paddingLeft:20 , paddingRight:20 , flexDirection: 'row-reverse'}} >
    { 
      userData.weeks.map(
        (week , index)=>(

          <View className='pl-2' key={index} >

    <Text className="color-primre font-bold w-5/6 text-3xl ml-6" >{getYearWeek(week.start)}</Text>
          <LineChart
            data={{
              labels: week.data.map((lablele)=>lablele.day ),
              datasets: [
                {
                  data:  week.data.map((value)=>value.value ),
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
            style={{ marginVertical: 8, borderRadius: 16, borderWidth:1 , borderColor:"#00A627"}}
          />

    </View>
        )
      )
    }
    </ScrollView>}
  

            <ScrollView contentContainerStyle={{alignItems:"center" , justifyContent:"center"}} className='h-full w-full   pt-11 '  >
              <View  style={{backgroundColor}} className=' w-5/6 h-20 border border-primre rounded-2xl flex-row items-center justify-start pl-7 pr-7 mt-6 ' >
                <Text className='text-2xl color-primre font-bold flex-1' >Ekilen Ağaç Sayısı</Text>
                <Text className='text-2xl color-primre font-bold ' >{userData.trees}</Text>
              </View>
              <View style={{backgroundColor}} className=' w-5/6 h-20 border border-primre rounded-2xl flex-row items-center justify-start pl-7 pr-7 mt-6 ' >
                <Text className='text-2xl color-primre font-bold flex-1' >Geri Kazanılan Enerji (kwH)</Text>
                <Text className='text-2xl color-primre font-bold ' >{userData.recoveredEnergy}</Text>
              </View>
              <View style={{backgroundColor}} className=' w-5/6 h-20 border border-primre rounded-2xl flex-row items-center justify-start pl-7 pr-7 mt-6 ' >
                <Text className='text-2xl color-primre font-bold flex-1' >Globel Puan</Text>
                <Text className='text-2xl color-primre font-bold ' >{userData.totalPoints}</Text>
              </View>
             
              

              
            </ScrollView>




      </View>
    </View>
  );
};

export default Home;
