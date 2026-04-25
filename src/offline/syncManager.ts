import NetInfo from "@react-native-community/netinfo";
import { feedApi } from "../services/api/modules/feedApi";
import { grievanceApi } from "../services/api/modules/grievanceApi";
import { localCache } from "../services/storage/localCache";

let unsubscribe: (() => void) | null = null;

export function startOfflineSync(): void {
  if (unsubscribe) {
    return;
  }
  unsubscribe = NetInfo.addEventListener(async (state) => {
    if (!state.isConnected) {
      return;
    }
    const draftPost = await localCache.getDraftPost();
    if (draftPost.trim()) {
      await feedApi.createPost({ text: draftPost });
    }
    const draftGrievance = await localCache.getDraftGrievance();
    if (draftGrievance.trim()) {
      await grievanceApi.create({ title: "Offline Draft", description: draftGrievance });
    }
    await localCache.clearDrafts();
  });
}

export function stopOfflineSync(): void {
  unsubscribe?.();
  unsubscribe = null;
}
