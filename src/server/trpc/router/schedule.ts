// 各スキーマのインポート
import { createScheduleSchema, updateScheduleSchema, getSingleScheduleSchema, deleteScheduleSchema } from '../.././../schema/schedule';
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
  // 取得(詳細)
  getSingleSchedule: authedProcedure.input(getSingleScheduleSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.schedule.findUnique({
        where: {
          id: input.scheduleId,
        },
      })
    }),

  // 更新
  updateSchedule: authedProcedure.input(updateScheduleSchema)
    .mutation(async ({ ctx, input }) => {
      const schedule = await ctx.prisma.schedule.update({
        where: {
          id: input.scheduleId,
        },
        data: {
          title: input.title,
          start: input.start,
          end: input.end
        },
      })
      return schedule
    }),
  // 削除
  deleteSchedule: authedProcedure.input(deleteScheduleSchema)
    .mutation(async ({ ctx, input }) => {
      const schedule = await ctx.prisma.schedule.delete({
        where: {
          id: input.scheduleId,
        },
      })
    }),
})