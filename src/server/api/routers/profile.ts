import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { clerkClient } from "@clerk/nextjs/server";

import { TRPCError } from "@trpc/server";

export const profileRouter = createTRPCRouter({
  getUserById: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      console.log("from ctx", ctx.userId);

      const user = await clerkClient.users.getUser(input.userId);

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "user not found",
        });
      }

      return user;
    }),
});
