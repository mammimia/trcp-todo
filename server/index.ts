import { publicProcedure, router } from './trcp';

export const appRouter = router({
  helloWorld: publicProcedure.query(async () => {
    return 'Hello, World!';
  }),
  getTodos: publicProcedure.query(async () => {
    return [
      { id: 1, text: 'Buy milk' },
      { id: 2, text: 'Buy eggs' },
      { id: 3, text: 'Buy bread' }
    ];
  })
});

export type AppRouter = typeof appRouter;
