// 各スキーマのインポート
import { createScheduleSchema } from '../.././../schema/schedule';
import { authedProcedure, t } from "../trpc";

// Routerの作成

export const ScheduleRouter = t.router({
  // 各プロシージャの作成
  createSchedule: authedProcedure.input(createScheduleSchema)
    .mutation(async ({ ctx, input }) => {
      const schedule = await ctx.prisma.schedule.create({
        data: {
          ...input,
          user: {
            connect: {
              id: ctx.session?.user?.id,
            }
          }
        }
      })
      return schedule
    }),

  getSchedules: t.procedure.query(({ ctx }) => {
    return ctx.prisma.schedule.findMany({
      where: {
        userId: ctx.session?.user?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  }),
})