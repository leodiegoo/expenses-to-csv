import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

export const categoryRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.category.create({
        data: {
          name: input.name,
          type: "EXPENSE",
          status: "ACTIVE",
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany();
  }),
  getAllWithSubcategories: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany({
      include: {
        Subcategory: true,
      },
    });
  }),
});
