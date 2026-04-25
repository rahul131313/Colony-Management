import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Screen } from "../../../components/Screen";

const items = [
  { id: "n1", title: "High priority: water leakage reported", priority: "high" },
  { id: "n2", title: "Your grievance moved to In Progress", priority: "medium" },
  { id: "n3", title: "Sunday market event reminder", priority: "low" }
];

function colorFor(priority: string): string {
  if (priority === "high") {
    return "#DC2626";
  }
  if (priority === "medium") {
    return "#D97706";
  }
  return "#2563EB";
}

export function NotificationsScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Notification Center</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.message}>{item.title}</Text>
            <Text style={[styles.priority, { color: colorFor(item.priority) }]}>{item.priority}</Text>
          </View>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10
  },
  message: {
    color: "#0F172A"
  },
  priority: {
    marginTop: 6,
    fontWeight: "700",
    textTransform: "capitalize"
  }
});
