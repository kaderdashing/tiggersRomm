import axios from "axios";
import * as SecureStore from "expo-secure-store";

// Fonction 1 : checkIfSignedIn : test si un user est Auth
export default checkIfSignedIn = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");
    return token
      ? { isSignedIn: true, userInfo: token }
      : { isSignedIn: false, userInfo: null };
  } catch (error) {
    throw new Error("Failed to check sign-in status");
  }
};
