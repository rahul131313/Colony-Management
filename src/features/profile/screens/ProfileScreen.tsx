import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Screen } from "../../../components/Screen";
import { secureStorage } from "../../../services/storage/secureStorage";
import { useSessionStore } from "../../../state/sessionStore";
import { stopOfflineSync } from "../../../offline/syncManager";
import { socketService } from "../../../services/realtime/socketService";

export function ProfileScreen() {
  const user = useSessionStore((state) => state.user);
  const clearSession = useSessionStore((state) => state.clearSession);

  const logout = async () => {
    stopOfflineSync();
    socketService.disconnect();
    await secureStorage.clearToken();
    clearSession();
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.item}>{user?.fullName}</Text>
        <Text style={styles.item}>{user?.phone}</Text>
        <Text style={styles.item}>Role: {user?.role}</Text>
        <Pressable style={styles.button} onPress={() => void logout()}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10
  },
  title: {
    fontSize: 22,
    fontWeight: "700"
  },
  item: {
    color: "#334155"
  },
  button: {
    marginTop: 10,
    backgroundColor: "#B91C1C",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center"
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700"
  }
});
