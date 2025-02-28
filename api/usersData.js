import axios from "axios";

const ipAdrees = "192.168.1.118";



export const getAllUsers = async (token) => {


  try {
    const response = await axios.get(`http://${ipAdrees}:5055/data/getAllUsersTotalPoints`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("result", response.data.data.users);

    return response.data.data.users

    // Gelen veriyi state'e at
  } catch (error) {
    console.log(error);

  }

}