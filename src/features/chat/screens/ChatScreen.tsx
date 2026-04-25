import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AppTextInput } from "../../../components/AppTextInput";
import { Screen } from "../../../components/Screen";
import { chatApi } from "../../../services/api/modules/chatApi";
import { socketService } from "../../../services/realtime/socketService";
import { useSessionStore } from "../../../state/sessionStore";
import type { RootStackParamList } from "../../../navigation/types";
import type { ChatMessage } from "../../../types";

type Props = NativeStackScreenProps<RootStackParamList, "Chat">;

export function ChatScreen({ route }: Props) {
  const { chatId } = route.params;
  const user = useSessionStore((state) => state.user);
  const token = useSessionStore((state) => state.token);
  const queryClient = useQueryClient();
  const [input, setInput] = useState("");
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  const messagesQuery = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () => chatApi.getMessages(chatId)
  });

  const sendMessage = useMutation({
    mutationFn: () => chatApi.sendMessage(chatId, { type: "text", content: input }),
    onSuccess: async () => {
      setInput("");
      await queryClient.invalidateQueries({ queryKey: ["chat", chatId] });
    }
  });

  useEffect(() => {
    if (token) {
      socketService.connect(token);
    }

    const onMessage = (message: ChatMessage) => {
      if (message.chatId !== chatId) {
        return;
      }
      void queryClient.setQueryData<ChatMessage[]>(["chat", chatId], (old) => [message, ...(old ?? [])]);
    };

    const onTyping = (payload: { chatId: string; userId: string; typing: boolean }) => {
      if (payload.chatId !== chatId || payload.userId === user?.id) {
        return;
      }
      setTypingUsers((old) => {
        const next = new Set(old);
        if (payload.typing) {
          next.add(payload.userId);
        } else {
          next.delete(payload.userId);
        }
        return [...next];
      });
    };

    socketService.on("chat:message", onMessage);
    socketService.on("chat:typing", onTyping);
    return () => {
      socketService.off("chat:message", onMessage);
      socketService.off("chat:typing", onTyping);
    };
  }, [chatId, queryClient, token, user?.id]);

  const messages = useMemo(() => messagesQuery.data ?? [], [messagesQuery.data]);

  return (
    <Screen>
      <FlatList
        inverted
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isMine = item.senderId === user?.id;
          return (
            <View style={[styles.messageBubble, isMine ? styles.mine : styles.other]}>
              <Text style={isMine ? styles.mineText : styles.otherText}>{item.content}</Text>
              <Text style={styles.readMeta}>{item.readBy.length > 1 ? "Read" : "Sent"}</Text>
            </View>
          );
        }}
      />
      {typingUsers.length > 0 ? <Text style={styles.typing}>Typing...</Text> : null}
      <View style={styles.inputRow}>
        <AppTextInput
          value={input}
          placeholder="Type a message"
          onFocus={() => socketService.emitTyping(chatId, true)}
          onBlur={() => socketService.emitTyping(chatId, false)}
          onChangeText={setInput}
        />
        <Pressable
          style={styles.sendButton}
          onPress={() => {
            if (input.trim()) {
              sendMessage.mutate();
            }
          }}
        >
          <Text style={styles.sendText}>Send</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  messageBubble: {
    maxWidth: "80%",
    marginBottom: 8,
    borderRadius: 12,
    padding: 10
  },
  mine: {
    alignSelf: "flex-end",
    backgroundColor: "#0369A1"
  },
  other: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF"
  },
  mineText: {
    color: "#FFFFFF"
  },
  otherText: {
    color: "#0F172A"
  },
  readMeta: {
    marginTop: 4,
    color: "#94A3B8",
    fontSize: 11
  },
  typing: {
    color: "#475569",
    marginBottom: 8
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6
  },
  sendButton: {
    backgroundColor: "#0891B2",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10
  },
  sendText: {
    color: "#FFFFFF",
    fontWeight: "700"
  }
});
