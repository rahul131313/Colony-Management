import React, { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppTextInput } from "../../../components/AppTextInput";
import { Screen } from "../../../components/Screen";
import { authApi } from "../../../services/api/modules/authApi";
import { secureStorage } from "../../../services/storage/secureStorage";
import { useSessionStore } from "../../../state/sessionStore";
import type { AuthStackParamList } from "../../../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "VerifyOtp">;

export function VerifyOtpScreen({}: Props) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { pendingPhone, otpTxnId, setAuthenticated } = useSessionStore();

  const verifyOtp = async () => {
    if (!pendingPhone || !otpTxnId || otp.length < 4) {
      return;
    }
    setLoading(true);
    try {
      const result = await authApi.verifyOtp({
        phone: pendingPhone,
        otp,
        txnId: otpTxnId
      });
      await secureStorage.setToken(result.accessToken);
      setAuthenticated(result.accessToken, result.profile);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>Enter code sent to {pendingPhone ?? "your phone"}</Text>
        <AppTextInput value={otp} onChangeText={setOtp} keyboardType="number-pad" placeholder="123456" />
        <Pressable onPress={verifyOtp} style={styles.button}>
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Verify & Continue</Text>
          )}
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 12
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A"
  },
  subtitle: {
    color: "#334155",
    marginBottom: 10
  },
  button: {
    backgroundColor: "#0EA5E9",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center"
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700"
  }
});
