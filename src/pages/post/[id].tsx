import AppLayout from "@/components/AppLayout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PostView } from "@/components/PostView";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import React from "react";

export default function PostPage() {
  const router = useRouter();

  const { data, isLoading } = api.posts.getById.useQuery({
    postId: router.query.id as string,
  });

  if (isLoading) {
    // TODO: Add proper loading UI...
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <AppLayout>
      <PostView author={data?.author} post={data?.post} />
    </AppLayout>
  );
}
