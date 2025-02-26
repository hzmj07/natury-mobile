import { StyleSheet, Text, View } from 'react-native'
import React , {useState} from 'react'

const AddModal = ({status})=>{
    console.log(status);
    
    const [addModal, setaddModal] = useState(status);

    {addModal&& 

    <View onPress={()=>{setaddModal(!status)}}  style={{position:"absolute", backgroundColor:"red" , flex:1}}                                        >

    </View>}
  
}


export default AddModal

