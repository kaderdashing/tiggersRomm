import * as SecureStore from "expo-secure-store";
import axios from "axios";

const sendToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");

    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.post(
      "https://proud-liberation-production.up.railway.app/api/v1/auth/google",
      { access_token: token }, // Le corps de la requête
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error: ", error.response?.data || error.message);
    } else {
      console.error("An error occurred: ", error.message);
    }
    throw error;
  }
};

export default sendToken;
