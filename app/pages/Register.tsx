import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";

export default function Register({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("SignIN")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
