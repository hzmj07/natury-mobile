import axios from "axios";
import {globelError} from "./globelError"
const ipAdrees = "192.168.1.118";



export const addPoint = async (token , value , energy) => {

    console.log( token , value);
    
  try {
    const response = await axios.post(`http://${ipAdrees}:5055/data/addPoint`,
      {
        "value" : value,
        "energy" : energy
      },
        {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("result", response.data);

    return response.data

    // Gelen veriyi state'e at
  } catch (error) {
    console.error(error);

  }

}


export const addTree = async (token , value ) => {

  console.log( token , value);
  
try {
  const response = await axios.post(`http://${ipAdrees}:5055/data/addTree`,
    {
      "value" : value,
    },
      {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("result", response.data);

  return response.data

  // Gelen veriyi state'e at
} catch (error) {
  globelError(error)

}

}



export const getUserData = async (token , saveContext) => {


    try {
      const response = await axios.get(`http://${ipAdrees}:5055/data/getUserData`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("result", response.data.data.userData);
      saveContext( response.data.data.userData)
      return response.data
  
      // Gelen veriyi state'e at
    } catch (error) {
    globelError(error);
  
    }
  
  }