import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

export const expenseRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        description: z.string(),
        amount: z.number(),
        date: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const triggers = await ctx.prisma.trigger.findMany({});

      const triggersMatched = triggers.filter((trigger) => {
        if (!trigger.regularExpression && !trigger.description) return false;
        if (!trigger.regularExpression && trigger.description) {
          const descriptionToMatch = trigger.description?.toLowerCase();
          const description = input.description.toLowerCase();
          return description.includes(descriptionToMatch);
        }
        if (trigger.regularExpression) {
          const regex = new RegExp(trigger.regularExpression);
          return regex.test(input.description.toLowerCase());
        }
      });

      if (triggersMatched.length > 1) {
        console.log(
          "Multiple triggers matched",
          triggersMatched.map((t) => t.name)
        );
        throw new Error("Multiple triggers matched");
      }

      if (triggersMatched.length === 0) {
        console.log("No triggers matched");
        throw new Error("No triggers matched");
      }

      const trigger = triggersMatched[0];
      if (!trigger) throw new Error("No trigger found");
      const categoryId = trigger.categoryId;

      return ctx.prisma.expense.create({
        data: {
          description: input.description,
          amount: input.amount,
          date: new Date(input.date),
          userId: ctx.session.user.id,
          categoryId: categoryId,
          subcategoryId: trigger.subcategoryId,
          type: "EXPENSE",
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.expense.findMany();
  }),
});
