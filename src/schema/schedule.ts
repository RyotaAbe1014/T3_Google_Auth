import z from "zod";

const title = z.string().max(20);
const start = z.date();
const end = z.date();
const scheduleId = z.string().cuid()
// 作成用
export const createScheduleSchema = z.object({
  title,
  start,
  end,
});

export type CreateScheduleInput = z.TypeOf<typeof createScheduleSchema>;


// 更新用
export const updateScheduleSchema = z.object({
  scheduleId,
  title,
  start,
  end,
})

export type UpdateScheduleInput = z.TypeOf<typeof updateScheduleSchema>


// 取得用
export const getSingleScheduleSchema = z.object({
  scheduleId
})


// 削除用
export const deleteScheduleSchema = z.object({
  scheduleId
})
