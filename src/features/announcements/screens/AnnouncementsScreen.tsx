import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Screen } from "../../../components/Screen";
import { useSessionStore } from "../../../state/sessionStore";

const data = [
  { id: "1", title: "Water maintenance", body: "Supply paused from 2PM to 4PM", read: false },
  { id: "2", title: "Sunday event", body: "Community badminton at 7AM", read: true }
];

export function AnnouncementsScreen() {
  const role = useSessionStore((state) => state.user?.role);
  const canBroadcast = role === "colony_admin" || role === "supervisor";

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Announcements</Text>
        {canBroadcast ? (
          <Pressable style={styles.broadcastBtn}>
            <Text style={styles.broadcastText}>Broadcast</Text>
          </Pressable>
        ) : null}
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardBody}>{item.body}</Text>
            <Text style={styles.meta}>{item.read ? "Read" : "Unread"} • RSVP Enabled</Text>
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
  broadcastBtn: {
    backgroundColor: "#0369A1",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  broadcastText: {
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
  cardBody: {
    color: "#334155",
    marginTop: 4
  },
  meta: {
    color: "#64748B",
    marginTop: 6
  }
});
