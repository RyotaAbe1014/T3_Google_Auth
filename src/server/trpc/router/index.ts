// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { ScheduleRouter } from './schedule'
export const appRouter = t.router({
  // auth: authRouter,
  schedule: ScheduleRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
