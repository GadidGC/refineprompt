import { optimizeRouter } from "@/server/api/routers/optimize";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  optimize: optimizeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
