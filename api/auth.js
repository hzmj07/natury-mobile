import axios from "axios";

const ipAdrees = "192.168.1.118";



export const UserLogin  = async (email , password , loginContext)=>{
    console.log(email);
    console.log(password);
    
    try {
        const response = await axios.post(`http://${ipAdrees}:5055/auth/login`, {
          "email" : email,
          "password" : password
        });
        console.log(response.data.user);
        console.log(response.data.TokenS);
        
       loginContext(response.data.user , response.data.TokenS )
        
        
        // Gelen veriyi state'e at
      } catch (error) {
        console.log(error);
        
      }
    
}