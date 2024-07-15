import { publicProcedure, router } from "./trcp";

export const appRouter = router({
    helloWorld: publicProcedure.query(async () => {
        return "Hello, World!";
    })
})

export type AppRouter = typeof appRouter;