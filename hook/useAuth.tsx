import { useEffect, useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import checkIfSignedIn from "../utils/auth";
import * as SecureStore from "expo-secure-store";
import sendToken from "@/utils/sendToken";
import { LoginManager } from "react-native-fbsdk-next";
import { useIsAuth } from "@/Context/ProviderAuthContext";
interface AuthState {
  isSignedIn: boolean;
  userInfo: any | null;
  error: Error | null;
  loading: boolean;
}

const useAuth = () => {
  const { isAuth, setIsAuth } = useIsAuth();

  const [authState, setAuthState] = useState<AuthState>({
    isSignedIn: false,
    userInfo: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    GoogleSignin.configure({
      offlineAccess: true,
      webClientId:
        "42880877051-q4i6tfllkl3hdq0dou88i361r4mstctf.apps.googleusercontent.com",
    });
    const initializeAuth = async () => {
      const { isSignedIn, userInfo } = await checkIfSignedIn();
      setAuthState({
        isSignedIn,
        userInfo,
        error: null,
        loading: false,
      });
    };
    initializeAuth();
  }, []);

  const signin = async () => {
    try {
      setAuthState((prevState) => ({ ...prevState, loading: true }));
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      const tok = await GoogleSignin.getTokens();

      const accessToken = tok.accessToken;
      console.log({ tok });
      if (accessToken) {
        await SecureStore.setItemAsync("token", accessToken);
        await SecureStore.setItemAsync("authWith", "google");
        await sendToken("google");

        setAuthState({
          isSignedIn: true,
          userInfo: accessToken,
          error: null,
          loading: false,
        });
        setIsAuth(accessToken);
      }
    } catch (error) {
      setAuthState((prevState) => ({
        ...prevState,
        error:
          error instanceof Error ? error : new Error("Unknown error occurred"),
        loading: false,
      }));
    }
  };

  const signout = async () => {
    try {
      // console.log("yoooooyoyoyoyoyoyoyo");
      const authWith = await SecureStore.getItem("authWith");
      if (authWith === "google") {
        console.log("google");
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        await SecureStore.deleteItemAsync("token");
        await setIsAuth(null);
      } else if (authWith === "facebook") {
        console.log("facebook");
        await LoginManager.logOut();
        await SecureStore.deleteItemAsync("token");
        await setIsAuth(null);
      }
      setAuthState({
        isSignedIn: false,
        userInfo: null,
        error: null,
        loading: false,
      });
    } catch (error) {
      setAuthState((prevState) => ({
        ...prevState,
        error:
          error instanceof Error ? error : new Error("Unknown error occurred"),
      }));
    }
  };

  return {
    ...authState,
    signin,
    signout,
  };
};

export default useAuth;
