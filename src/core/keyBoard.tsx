import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import React, { ReactNode } from "react";
type FooProps = {
  children: ReactNode;
};
export default function KeyBoard({ children }: FooProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
      }}
    >
      {children}
    </KeyboardAvoidingView>
  );
}
