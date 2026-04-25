import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { Screen } from "../../../components/Screen";
import { grievanceApi } from "../../../services/api/modules/grievanceApi";
import type { RootStackParamList } from "../../../navigation/types";

function statusColor(status: string): string {
  if (status === "open") {
    return "#B91C1C";
  }
  if (status === "in_progress") {
    return "#D97706";
  }
  if (status === "resolved") {
    return "#047857";
  }
  return "#334155";
}

export function GrievanceDashboardScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const grievancesQuery = useQuery({
    queryKey: ["grievances"],
    queryFn: grievanceApi.list
  });

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Grievances</Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate("CreateGrievance")}>
          <Text style={styles.buttonText}>Create</Text>
        </Pressable>
      </View>
      <FlatList
        data={grievancesQuery.data ?? []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={[styles.status, { color: statusColor(item.status) }]}>{item.status}</Text>
            <Text style={styles.sla}>SLA: {new Date(item.slaDeadline).toLocaleString()}</Text>
            <Pressable onPress={() => navigation.navigate("Chat", { chatId: item.id, contextType: "grievance" })}>
              <Text style={styles.chatLink}>Open grievance chat</Text>
            </Pressable>
          </View>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  title: {
    fontSize: 22,
    fontWeight: "700"
  },
  button: {
    backgroundColor: "#0891B2",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700"
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10
  },
  cardTitle: {
    fontWeight: "700",
    color: "#0F172A"
  },
  status: {
    marginTop: 4,
    fontWeight: "600",
    textTransform: "capitalize"
  },
  sla: {
    color: "#475569",
    marginTop: 4
  },
  chatLink: {
    color: "#1D4ED8",
    marginTop: 8,
    fontWeight: "600"
  }
});
