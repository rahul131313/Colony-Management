import React, { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppTextInput } from "../../../components/AppTextInput";
import { Screen } from "../../../components/Screen";
import { authApi } from "../../../services/api/modules/authApi";
import { useSessionStore } from "../../../state/sessionStore";
import type { AuthStackParamList } from "../../../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "LoginOtp">;

export function LoginOtpScreen({ navigation }: Props) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const setPendingOtp = useSessionStore((state) => state.setPendingOtp);

  const requestOtp = async () => {
    if (!phone.trim()) {
      return;
    }
    setLoading(true);
    try {
      const result = await authApi.requestOtp({ phone });
      setPendingOtp(phone, result.txnId);
      navigation.navigate("VerifyOtp");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Colony Connect</Text>
        <Text style={styles.subtitle}>Login with OTP to continue</Text>
        <AppTextInput
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="+91 90000 00000"
        />
        <Pressable onPress={requestOtp} style={styles.button}>
          {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Send OTP</Text>}
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
    fontSize: 28,
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
