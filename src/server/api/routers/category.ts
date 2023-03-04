import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const categoryRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.category.create({
        data: {
          name: input.name,
          type: "EXPENSE",
          status: "ACTIVE",
          user: {
            connectOrCreate: {
              where: {
                id: 1,
              },
              create: {
                name: "Test User",
                email: "email@email.com.br",
                password: "123",
              },
            },
          },
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany();
  }),
});
