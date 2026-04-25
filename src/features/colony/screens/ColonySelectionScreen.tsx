import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Screen } from "../../../components/Screen";
import { useSessionStore } from "../../../state/sessionStore";

export function ColonySelectionScreen() {
  const user = useSessionStore((state) => state.user);
  const setSelectedColony = useSessionStore((state) => state.setSelectedColony);

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Select Colony</Text>
        <Text style={styles.subtitle}>Choose workspace to continue</Text>
      </View>
      <FlatList
        data={user?.colonies ?? []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.item} onPress={() => setSelectedColony(item)}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.itemMeta}>{item.city}</Text>
          </Pressable>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 12
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A"
  },
  subtitle: {
    color: "#475569"
  },
  item: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10
  },
  itemTitle: {
    fontWeight: "700",
    color: "#0F172A"
  },
  itemMeta: {
    color: "#64748B"
  }
});
