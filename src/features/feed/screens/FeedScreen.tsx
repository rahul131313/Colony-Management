import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Screen } from "../../../components/Screen";
import { feedApi } from "../../../services/api/modules/feedApi";
import { localCache } from "../../../services/storage/localCache";
import { PostCard } from "../components/PostCard";
import { PostComposer } from "../components/PostComposer";

export function FeedScreen() {
  const queryClient = useQueryClient();

  const feedQuery = useInfiniteQuery({
    queryKey: ["feed"],
    queryFn: ({ pageParam }) => feedApi.getFeed(pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor
  });

  const createPost = useMutation({
    mutationFn: async (text: string) => feedApi.createPost({ text }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["feed"] });
    }
  });

  const reactMutation = useMutation({
    mutationFn: async (payload: { postId: string; reaction: string }) =>
      feedApi.reactToPost(payload.postId, payload.reaction),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["feed"] });
    }
  });

  const posts = feedQuery.data?.pages.flatMap((page) => page.items) ?? [];

  React.useEffect(() => {
    if (posts.length > 0) {
      void localCache.cacheFeed(posts);
    }
  }, [posts]);

  return (
    <Screen>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={9}
        removeClippedSubviews
        ListHeaderComponent={<PostComposer onSubmit={async (text) => createPost.mutateAsync(text)} />}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onReact={(reaction) => reactMutation.mutate({ postId: item.id, reaction })}
          />
        )}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (feedQuery.hasNextPage && !feedQuery.isFetchingNextPage) {
            void feedQuery.fetchNextPage();
          }
        }}
        ListFooterComponent={
          feedQuery.isFetchingNextPage ? (
            <ActivityIndicator style={styles.loader} />
          ) : (
            <View style={styles.footer}>
              <Text style={styles.footerText}>You are all caught up.</Text>
            </View>
          )
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  loader: {
    marginVertical: 20
  },
  footer: {
    paddingVertical: 16,
    alignItems: "center"
  },
  footerText: {
    color: "#64748B"
  }
});
