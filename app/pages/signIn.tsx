import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import useAuth from "@/hook/useAuth";
import { useIsAuth } from "@/ProviderAuthContext";
import FacebookLogin1 from "@/src/core/FacebookLogin1";

export default function SignIN({ change }: { change: (value: any) => void }) {
  const { isSignedIn, userInfo, error, loading, signin, signout } = useAuth();
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

              justifyContent: "flex-end",
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
              {/* <View
                style={{
                  borderRadius: 70,
                  overflow: "hidden",
                  // borderWidth: 2,
                  // borderColor: "yellow",
                  width: 230,
                  height: 50,
                  alignSelf: "center",
                }}
              >
                <GoogleSigninButton
                  size={GoogleSigninButton.Size.Standard}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={signin}
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                />
              </View> */}
              <TouchableOpacity
                style={{
                  borderRadius: 70,
                  overflow: "hidden",
                  width: 230,
                  height: 50,
                  alignSelf: "center",
                  backgroundColor: "white",
                  position: "relative",
                  justifyContent: "center",
                  borderColor: "black",
                }}
                onPress={signin}
              >
                <Image
                  source={require("../../assets/images/google.png")}
                  style={{
                    position: "absolute",
                    left: 15,
                    width: 26,
                    height: 26,
                    top: 10,
                  }}
                />
                <Text
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    top: "50%",
                    transform: [{ translateY: -12 }],
                    fontSize: 18,
                  }}
                >
                  Google
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FacebookLogin1 />
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
                <TouchableOpacity>
                  <SimpleLineIcons
                    name="screen-smartphone"
                    size={60}
                    color="green"
                    style={{ alignSelf: "center" }}
                    onPress={() => change(1)}
                  />
                </TouchableOpacity>
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
  },
});
