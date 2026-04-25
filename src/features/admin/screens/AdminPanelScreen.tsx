import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "../../../components/Screen";

export function AdminPanelScreen() {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Admin Panel</Text>
        <Text style={styles.item}>Post moderation queue</Text>
        <Text style={styles.item}>Broadcast announcements</Text>
        <Text style={styles.item}>Assign grievances to supervisors/workers</Text>
        <Text style={styles.item}>Review SLA breaches</Text>
        <Text style={styles.note}>Super admin capabilities are recommended for web console only.</Text>
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
    color: "#0F172A"
  },
  note: {
    marginTop: 8,
    color: "#64748B"
  }
});
