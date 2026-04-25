import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginOtpScreen } from "../features/auth/screens/LoginOtpScreen";
import { VerifyOtpScreen } from "../features/auth/screens/VerifyOtpScreen";
import type { AuthStackParamList } from "./types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginOtp" component={LoginOtpScreen} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
    </Stack.Navigator>
  );
}
