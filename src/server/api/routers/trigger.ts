import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

export const triggerRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        regularExpression: z.string().optional(),
        description: z.string().optional(),
        category: z.string(),
        subCategory: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.trigger.create({
        data: {
          name: input.name,
          regularExpression: input.regularExpression,
          description: input.description,
          userId: ctx.session.user.id,
          categoryId: input.category,
          ...(input.subCategory
            ? {
                subcategoryId: input.subCategory,
              }
            : {}),
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.trigger.findMany();
  }),
});
