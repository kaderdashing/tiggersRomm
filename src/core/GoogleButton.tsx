// import React, { useEffect } from "react";
// import {
//   TouchableOpacity,
//   Text,
//   Image,
//   StyleSheet,
//   View,
//   Platform,
// } from "react-native";
// import { GoogleSignin } from "react-native-google-signin";
// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session";
// import * as AuthSession from "expo-auth-session";
// const webClientId =
//   "201904374943-iarp0c33dujmiln8bont400fvj60f3hn.apps.googleusercontent.com";
// const iosClientId =
//   "201904374943-3rd0kjb28tsbini8vtsgtq6ak4cee249.apps.googleusercontent.com";
// const androidClientId =
//   "201904374943-2dkbmr8kjhk94f07sjt36imb8f2d7di6.apps.googleusercontent.com";

// WebBrowser.maybeCompleteAuthSession();
// const GoogleButton = () => {
//   const clientId = Platform.select({
//     web: webClientId,
//     ios: iosClientId,
//     android: androidClientId,
//   }) as string; // Ensure clientId is always a string

//   const redirectUri = AuthSession.makeRedirectUri({
//     scheme: "myapp",
//   });
//   // GoogleSignin.configure({
//   //   clientID: "YOUR_CLIENT_ID",
//   // });
//   const config = {
//     clientId,
//     redirectUri,
//   };

//   const discovery = {
//     authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
//     tokenEndpoint: "https://oauth2.googleapis.com/token",
//     revocationEndpoint: "https://oauth2.googleapis.com/revoke",
//   };

//   const [request, response, promptAsync] = Google.useAuthRequest(
//     config,
//     discovery
//   );
//   const handleToken = () => {
//     if (response?.type === "success") {
//       const { authentication } = response;
//       const token = authentication?.accessToken;
//       console.log("access token", token);
//     }
//   };
//   useEffect(() => {
//     handleToken();
//   }, [response]);
//   return (
//     <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
//       <View style={styles.content}>
//         <Image
//           source={require("../assets/images/google.png")}
//           style={styles.icon}
//         />
//         <Text style={styles.text}>Sign in with Google</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: "black",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     elevation: 1,
//     alignSelf: "center",
//   },
//   content: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   icon: {
//     width: 40,
//     height: 40,
//     marginRight: 10,
//   },
//   text: {
//     color: "white",
//     fontSize: 16,
//   },
// });

// export default GoogleButton;
import React, { useEffect } from "react";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Button, View } from "react-native";

export default function GoogleLoginScreen() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "201904374943-iarp0c33dujmiln8bont400fvj60f3hn.apps.googleusercontent.com", // Remplacez par votre ID client
    });
  }, []);

  const signIn = async () => {
    try {
      const res = await GoogleSignin.hasPlayServices();
      console.log({ res });
      const userInfo = await GoogleSignin.signIn();
      console.log({ userInfo });
    } catch (error: any) {
      //  catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled the login process");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Sign in is in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play services not available");
      } else {
        console.error(error);
      }
      // }
    }
  };

  return (
    <View>
      <Button title="Sign in with Google" onPress={signIn} />
    </View>
  );
}
