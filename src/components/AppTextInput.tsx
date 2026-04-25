import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export function AppTextInput(props: TextInputProps) {
  return <TextInput placeholderTextColor="#6B7280" style={styles.input} {...props} />;
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#111827"
  }
});
