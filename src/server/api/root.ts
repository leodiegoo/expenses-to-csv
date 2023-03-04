import { createTRPCRouter } from "~/server/api/trpc";
import { categoryRouter } from "~/server/api/routers/category";

export const appRouter = createTRPCRouter({
  categories: categoryRouter,
});

export type AppRouter = typeof appRouter;
