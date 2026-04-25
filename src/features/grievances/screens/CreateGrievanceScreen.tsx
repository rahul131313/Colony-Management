import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppTextInput } from "../../../components/AppTextInput";
import { Screen } from "../../../components/Screen";
import { grievanceApi } from "../../../services/api/modules/grievanceApi";
import { localCache } from "../../../services/storage/localCache";

export function CreateGrievanceScreen() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    void localCache.getDraftGrievance().then(setDescription);
  }, []);

  const create = useMutation({
    mutationFn: () =>
      grievanceApi.create({
        title,
        description
      }),
    onSuccess: async () => {
      setTitle("");
      setDescription("");
      await localCache.saveDraftGrievance("");
      await queryClient.invalidateQueries({ queryKey: ["grievances"] });
    }
  });

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Create Grievance</Text>
        <AppTextInput value={title} onChangeText={setTitle} placeholder="Issue title" />
        <AppTextInput
          value={description}
          onChangeText={(value) => {
            setDescription(value);
            void localCache.saveDraftGrievance(value);
          }}
          placeholder="Describe issue and attach media"
          multiline
          style={[styles.description]}
        />
        <Pressable
          style={styles.button}
          onPress={() => {
            if (title.trim() && description.trim()) {
              create.mutate();
            }
          }}
        >
          <Text style={styles.buttonText}>Submit Grievance</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12
  },
  title: {
    fontSize: 22,
    fontWeight: "700"
  },
  description: {
    minHeight: 120,
    textAlignVertical: "top"
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
