import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppTextInput } from "../../../components/AppTextInput";
import { localCache } from "../../../services/storage/localCache";

interface Props {
  onSubmit: (text: string) => Promise<void>;
}

export function PostComposer({ onSubmit }: Props) {
  const [text, setText] = useState("");

  useEffect(() => {
    void localCache.getDraftPost().then(setText);
  }, []);

  const submit = async () => {
    const value = text.trim();
    if (!value) {
      return;
    }
    await onSubmit(value);
    setText("");
    await localCache.saveDraftPost("");
  };

  return (
    <View style={styles.container}>
      <AppTextInput
        placeholder="Share updates, poll, or service request..."
        value={text}
        onChangeText={(value) => {
          setText(value);
          void localCache.saveDraftPost(value);
        }}
      />
      <View style={styles.actions}>
        <Pressable style={styles.secondary}>
          <Text style={styles.secondaryText}>Add Image/Video</Text>
        </Pressable>
        <Pressable style={styles.primary} onPress={submit}>
          <Text style={styles.primaryText}>Post</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    gap: 10
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  secondary: {
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  secondaryText: {
    color: "#2563EB",
    fontWeight: "600"
  },
  primary: {
    backgroundColor: "#0891B2",
    paddingHorizontal: 16,
    borderRadius: 10,
    justifyContent: "center"
  },
  primaryText: {
    color: "#FFFFFF",
    fontWeight: "700"
  }
});
