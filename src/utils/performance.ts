import { InteractionManager } from "react-native";

export function runAfterInteractions(task: () => void): void {
  InteractionManager.runAfterInteractions(task);
}

export const flatListPerfProps = {
  initialNumToRender: 8,
  maxToRenderPerBatch: 8,
  windowSize: 9,
  removeClippedSubviews: true
};
