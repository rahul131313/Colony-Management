import React, { PropsWithChildren } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

export function Screen({ children }: PropsWithChildren) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F7FA"
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12
  }
});
