import React, { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { AppTextInput } from "../../../components/AppTextInput";
import { Screen } from "../../../components/Screen";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../navigation/types";

const listing = [
  { id: "v1", name: "City Electricians", category: "vendor", rating: 4.6 },
  { id: "w1", name: "Ramesh Plumber", category: "worker", rating: 4.3 },
  { id: "v2", name: "Green Grocer", category: "vendor", rating: 4.8 }
];

export function DirectoryScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => listing.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <Screen>
      <Text style={styles.title}>Local Directory</Text>
      <AppTextInput value={query} onChangeText={setQuery} placeholder="Search vendors or workers" />
      <FlatList
        style={styles.list}
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.meta}>
              {item.category} • {item.rating} stars
            </Text>
            <Pressable onPress={() => navigation.navigate("Chat", { chatId: item.id })}>
              <Text style={styles.chatLink}>Chat</Text>
            </Pressable>
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
  list: {
    marginTop: 12
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10
  },
  cardTitle: {
    color: "#0F172A",
    fontWeight: "700"
  },
  meta: {
    color: "#475569",
    marginTop: 4
  },
  chatLink: {
    color: "#1D4ED8",
    marginTop: 8,
    fontWeight: "600"
  }
});
