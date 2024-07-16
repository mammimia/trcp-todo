import { PrismaClient, Todos } from '@prisma/client';
import { publicProcedure, router } from './trcp';
import { z } from 'zod';

const prisma = new PrismaClient();

export const appRouter = router({
  helloWorld: publicProcedure.query(async () => {
    return 'Hello, World!';
  }),
  getTodos: publicProcedure.query(async () => {
    return await prisma.todos.findMany();
  }),
  addTodo: publicProcedure.input(z.string()).mutation(async (opts) => {
    console.log(opts);
    if (!opts.input || opts.input === '' || opts.input?.trim() === '') {
      throw new Error('Input is required');
    }
    return await prisma.todos.create({
      data: {
        content: opts.input
      }
    });
  })
});

export type AppRouter = typeof appRouter;
