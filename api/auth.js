import axios from "axios";
import { showMessage, hideMessage } from "react-native-flash-message";
import {globelError} from "./globelError"
const ipAdrees = "192.168.1.118";

export const deleteUser = async (userId , logOuth) => {
  try {
    await axios.post(`http://${ipAdrees}:5055/auth/deleteAccount`, {
      id : userId 
    });
    console.log("Kullanıcı silindi!");
    logOuth();
  } catch (error) {
    globelError(e);  }
};

export const UserLogin = async (email, password, loginContext) => {
  console.log(email);
  console.log(password);

  try {
    const response = await axios.post(`http://${ipAdrees}:5055/auth/login`, {
      "email": email,
      "password": password
    });
    const userName = response.data.user.username
    console.log(response.data.user.username);
    console.log( "tokeeennnnsss" , response.data.TokenS);
    loginContext(response.data.user, response.data.TokenS)

    showMessage({
      message: `Hoşgeldiniz ${userName} `,
      type: "success",
      hideStatusBar : true,
      icon:"auto"
    });

    // Gelen veriyi state'e at
  } catch (e) {
   globelError(e);


  }

}



export const userRegistar = async (email, password, name) => {
  console.log(email);
  console.log(password);
  console.log(name);
  try {
    const response = await axios.post(`http://${ipAdrees}:5055/auth/register`, {
      "username": name,
      "email": email,
      "password": password
    });
    console.log(response.data.user.username);
    const userName = response.data.user.username 
    ; 

    showMessage({
      message: `Hoşgeldiniz ${userName} `,
      hideStatusBar : true,
      type: "success",
      icon:"auto"
    });


  } catch (e) {
    globelError(e);

   
  }

}


export const refrashToken = async (refrashToken , setToken) => {
  console.log(`refreshhtokenn` , refrashToken);
  
  try {
    const response = await axios.post(`http://${ipAdrees}:5055/auth/refresh-token`, {
       "refreshToken": refrashToken
    });
    console.log( "dataaaa" , response.data);
   setToken(response.data)
    
  } catch (error) {
    console.error(error);
    
  }
};
