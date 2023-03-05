import { createTRPCRouter } from "~/server/api/trpc";
import { categoryRouter } from "~/server/api/routers/category";
import { exampleRouter } from "./routers/example";
import { triggerRouter } from "./routers/trigger";
import { expenseRouter } from "./routers/expense";

export const appRouter = createTRPCRouter({
  categories: categoryRouter,
  example: exampleRouter,
  triggers: triggerRouter,
  expenses: expenseRouter,
});

export type AppRouter = typeof appRouter;
