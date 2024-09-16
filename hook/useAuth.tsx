import { useEffect, useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import checkIfSignedIn from "../utils/auth"; // Assurez-vous du chemin correct
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { useIsAuth } from "@/ProviderAuthContext";
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
      const user = await GoogleSignin.signIn();
      const userId = user?.data?.user?.id;
      if (userId) {
        await SecureStore.setItemAsync("token", userId);
        setAuthState({
          isSignedIn: true,
          userInfo: userId,
          error: null,
          loading: false,
        });
        setIsAuth(userId);
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
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await SecureStore.deleteItemAsync("token");
      setIsAuth(null);

      setAuthState({
        isSignedIn: false,
        userInfo: null,
        error: null,
        loading: false,
      });
      // await router.push("/");
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
