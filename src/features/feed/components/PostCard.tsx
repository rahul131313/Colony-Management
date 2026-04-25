import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { FeedPost } from "../../../types";

interface Props {
  post: FeedPost;
  onReact: (reaction: string) => void;
}

export function PostCard({ post, onReact }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.meta}>
        {post.authorName} ({post.authorRole})
      </Text>
      <Text style={styles.text}>{post.text}</Text>
      {post.poll ? (
        <View style={styles.poll}>
          <Text style={styles.pollQ}>{post.poll.question}</Text>
          {post.poll.options.map((opt) => (
            <Text key={opt.id} style={styles.pollOpt}>
              {opt.label} • {opt.votes}
            </Text>
          ))}
        </View>
      ) : null}
      <View style={styles.row}>
        <Pressable onPress={() => onReact("like")}>
          <Text style={styles.action}>Like ({post.likes})</Text>
        </Pressable>
        <Text style={styles.action}>Comments ({post.comments})</Text>
        <Pressable onPress={() => onReact("support")}>
          <Text style={styles.action}>Support</Text>
        </Pressable>
      </View>
      {post.isServiceRequest ? <Text style={styles.tag}>Service Request</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10
  },
  meta: {
    color: "#334155",
    marginBottom: 6,
    fontWeight: "600"
  },
  text: {
    color: "#0F172A",
    marginBottom: 10
  },
  poll: {
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    padding: 8,
    marginBottom: 10
  },
  pollQ: {
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 6
  },
  pollOpt: {
    color: "#334155"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  action: {
    color: "#1D4ED8",
    fontWeight: "600"
  },
  tag: {
    marginTop: 8,
    alignSelf: "flex-start",
    backgroundColor: "#E0F2FE",
    color: "#075985",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999
  }
});
