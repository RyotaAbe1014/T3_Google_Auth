import z from "zod";

// 作成用
export const createScheduleSchema = z.object({
  title: z.string().max(20),
  startDate: z.date(),
  endDate: z.date(),
})

export type CreateScheduleInput = z.TypeOf<typeof createScheduleSchema>