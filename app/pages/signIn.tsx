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

              <GoogleSigninButton
                size={GoogleSigninButton.Size.Standard}
                color={GoogleSigninButton.Color.Dark}
                onPress={signin}
                style={{ alignSelf: "center" }}
              />

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
