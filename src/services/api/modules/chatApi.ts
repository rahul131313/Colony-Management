import { apiClient } from "../client";
import type { ApiResponse, ChatMessage } from "../../../types";

export const chatApi = {
  async getMessages(chatId: string): Promise<ChatMessage[]> {
    const response = await apiClient.get<ApiResponse<ChatMessage[]>>(`/chats/${chatId}/messages`);
    return response.data.data;
  },
  async sendMessage(chatId: string, payload: { type: "text" | "image"; content: string }): Promise<ChatMessage> {
    const response = await apiClient.post<ApiResponse<ChatMessage>>(
      `/chats/${chatId}/messages`,
      payload
    );
    return response.data.data;
  },
  async markRead(chatId: string, messageId: string): Promise<void> {
    await apiClient.post(`/chats/${chatId}/messages/${messageId}/read`);
  }
};
