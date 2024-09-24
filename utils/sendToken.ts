import * as SecureStore from "expo-secure-store";
import axios from "axios";

const sendToken = async (provider: "google" | "facebook") => {
  try {
    const token = await SecureStore.getItemAsync("token");

    if (!token) {
      throw new Error("No token found");
    }

    const url = `https://proud-liberation-production.up.railway.app/api/v1/auth/${provider}`;

    const response = await axios.post(
      url,
      { access_token: token },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return response;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error: ", error.response?.data || error.message);
    } else {
      console.error("An error occurred: ", error.message);
    }
    throw error;
  }
};

export default sendToken;
