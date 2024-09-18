import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React from "react";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
// import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import GoogleButton from "@/core/GoogleButton";
export default function index() {
  return (
    <View style={{ height: "100%" }}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View
            style={{
              height: "95%",

              justifyContent: "flex-end", // Aligner verticalement au centre
            }}
          >
            <View
              style={{
                height: "80%",
                justifyContent: "space-between",
              }}
            >
              <Image
                source={require("../../assets/images/Group.png")}
                style={{
                  width: 130,
                  height: 130,
                  alignSelf: "center",
                  marginTop: 100,
                }}
              />
              {/* <GoogleSigninButton
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={() => {
                    // initiate sign in
                  }}
                  // disabled={isInProgress}
                /> */}
              <View
                style={{
                  width: "80%",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GoogleButton />
              </View>
              <View
                style={{
                  alignSelf: "center",
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SimpleLineIcons
                  name="screen-smartphone"
                  size={60}
                  color="green"
                  style={{ alignSelf: "center" }}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
      <Text
        style={{
          textAlign: "center",
          paddingHorizontal: 40,
          paddingTop: 5,
        }}
      >
        By signing you Agree to our Terms of service and privacy policy
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    top: 0,
    // justifyContent: "center",
    // transform: [{ scaleY: 0.9 }], // Ici, on "dézoome" uniquement verticalement
    // transform: [{ scaleY: 0.8 }],
  },
});
