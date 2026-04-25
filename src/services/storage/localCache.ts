import AsyncStorage from "@react-native-async-storage/async-storage";
import type { FeedPost } from "../../types";

const KEYS = {
  FEED_CACHE: "cc-feed-cache",
  DRAFT_POST: "cc-draft-post",
  DRAFT_GRIEVANCE: "cc-draft-grievance"
};

export const localCache = {
  async cacheFeed(posts: FeedPost[]): Promise<void> {
    await AsyncStorage.setItem(KEYS.FEED_CACHE, JSON.stringify(posts));
  },
  async getCachedFeed(): Promise<FeedPost[]> {
    const value = await AsyncStorage.getItem(KEYS.FEED_CACHE);
    return value ? (JSON.parse(value) as FeedPost[]) : [];
  },
  async saveDraftPost(value: string): Promise<void> {
    await AsyncStorage.setItem(KEYS.DRAFT_POST, value);
  },
  async getDraftPost(): Promise<string> {
    return (await AsyncStorage.getItem(KEYS.DRAFT_POST)) ?? "";
  },
  async saveDraftGrievance(value: string): Promise<void> {
    await AsyncStorage.setItem(KEYS.DRAFT_GRIEVANCE, value);
  },
  async getDraftGrievance(): Promise<string> {
    return (await AsyncStorage.getItem(KEYS.DRAFT_GRIEVANCE)) ?? "";
  },
  async clearDrafts(): Promise<void> {
    await AsyncStorage.multiRemove([KEYS.DRAFT_POST, KEYS.DRAFT_GRIEVANCE]);
  }
};
