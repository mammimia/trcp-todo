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
    if (!opts.input || opts.input === '' || opts.input?.trim() === '') {
      throw new Error('Input is required');
    }

    return await prisma.todos.create({
      data: {
        content: opts.input
      }
    });
  }),
  removeTodo: publicProcedure.input(z.number()).mutation(async (opts) => {
    const todo = await prisma.todos.findUnique({
      where: {
        id: opts.input
      }
    });

    if (!todo) {
      throw new Error('Todo not found');
    }

    return await prisma.todos.delete({
      where: {
        id: opts.input
      }
    });
  }),
  doneTodo: publicProcedure.input(z.number()).mutation(async (opts) => {
    const todo = await prisma.todos.findUnique({
      where: {
        id: opts.input
      }
    });

    if (!todo) {
      throw new Error('Todo not found');
    }

    return await prisma.todos.update({
      where: {
        id: opts.input
      },
      data: {
        isDone: !todo.isDone
      }
    });
  })
});

export type AppRouter = typeof appRouter;
