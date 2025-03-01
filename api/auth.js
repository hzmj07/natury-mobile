import axios from "axios";
import { showMessage, hideMessage } from "react-native-flash-message";
import {globelError} from "./globelError"
const ipAdrees = "192.168.1.118";



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
    console.log(response.data.TokenS);
    loginContext(response.data.user, response.data.TokenS)

    showMessage({
      message: `Hoşgeldiniz ${userName} `,
      type: "success",
      hideStatusBar : true,
      icon:"auto"
    });

    // Gelen veriyi state'e at
  } catch (e) {
    const error = globelError(e);

    showMessage({
      message: `${error}`,
      type: "danger",
      hideStatusBar : true,
      icon:"auto"
    });

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
    const error = globelError(e);

    showMessage({
      message: `${error}`,
      type: "danger",
      hideStatusBar : true,
      icon:"auto"
    });
  }

}