import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { clerkClient } from "@clerk/nextjs/server";
import type { User } from "@clerk/nextjs/api";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    email: user.emailAddresses,
    imageUrl: user.imageUrl,
    firstName: user.firstName,
  };
};

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({ take: 100 });

    const users = await clerkClient.users.getUserList({
      limit: 100,
      userId: posts.map((post) => post.authorId),
    });

    const filteredUsersForClient = users.map(filterUserForClient);

    return posts.map((post) => ({
      post,
      author: filteredUsersForClient.find((user) => post.authorId === user.id),
    }));
  }),
});
