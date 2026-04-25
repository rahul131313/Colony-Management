import { apiClient } from "../client";
import type { ApiResponse, FeedPost } from "../../../types";

interface FeedPage {
  items: FeedPost[];
  nextCursor: string | null;
}

export const feedApi = {
  async getFeed(cursor?: string): Promise<FeedPage> {
    const response = await apiClient.get<ApiResponse<FeedPage>>("/feed", {
      params: { cursor, limit: 20 }
    });
    return response.data.data;
  },
  async createPost(payload: {
    text: string;
    mediaUrls?: string[];
    mediaType?: "image" | "video";
    poll?: { question: string; options: string[] };
    isServiceRequest?: boolean;
  }): Promise<FeedPost> {
    const response = await apiClient.post<ApiResponse<FeedPost>>("/feed", payload);
    return response.data.data;
  },
  async reactToPost(postId: string, reaction: string): Promise<void> {
    await apiClient.post(`/feed/${postId}/reactions`, { reaction });
  }
};
