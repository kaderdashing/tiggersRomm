import * as React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIN from "@/app/pages/signIn";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import MyInputText from "@/src/core/myInputText";
import MyButton from "@/src/core/myButton";
function PhoneScreen({ change }: { change: (value: any) => void }) {
  const [inputValue, setInputValue] = React.useState("");

  const handleInputChange = (text: string) => {
    setInputValue(text);
  };
  return (
    <>
      <View style={{ marginTop: 35, width: "87%" }}>
        <TouchableOpacity onPress={() => change(0)}>
          <Feather name="arrow-left-circle" size={40} color="black" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "90%",
        }}
      >
        <Image
          source={require("../assets/images/Group.png")}
          style={{
            width: 180,
            height: 180,
            alignSelf: "center",
          }}
        />
        <Text style={styles.text}>Enter your phone number</Text>
        <Text>You will receive a 4-digit code for verification</Text>
        <View style={{ width: "80%" }}>
          <MyInputText
            value={inputValue}
            placeholder="Phone number"
            onChangeText={handleInputChange}
            secureTextEntry={false}
            iconName="phone-call"
            keyboardType="phone-pad"
          />
          <MyButton body="sign-in" />
        </View>
      </View>
    </>
  );
}

const Stack = createNativeStackNavigator();

function UnauthenticatedApp() {
  const [ecrans, setEcrans] = React.useState<any>(null);
  return (
    <>
      {ecrans ? (
        <>
          <PhoneScreen change={setEcrans} />
        </>
      ) : (
        <>
          <SignIN change={setEcrans} />
        </>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 10,
  },
  icon: {
    position: "absolute",
    left: 10,
    zIndex: 1,
  },

  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "80%",
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 20,
  },
});
export default UnauthenticatedApp;
