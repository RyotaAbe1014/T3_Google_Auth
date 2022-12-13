import { trpc } from '../utils/trpc'
import useStore from '../store'


export const useMutateSchedule = () => {
  // キャッシュにアクセスする必要があるのでrpc.useContext()を使用してアクセスできるようにする
  const utils = trpc.useContext();
  const reset = useStore((state) => state.resetEditedSchedule);

  const createScheduleMutation = trpc.schedule.createSchedule.useMutation({
    // 成功した時の後処理
    // resはcreateScheduleの返り値を受け取ってキャッシュの配列に追加したいので
    onSuccess: (res) => {
      // キャッシュを取得
      const previousSchedules = utils.schedule.getSchedules.getData();
      if (previousSchedules) {
        // キャッシュに追加したデータを追加
        utils.schedule.getSchedules.setData({ res, ...previousSchedules });
        window.location.reload();
      }
      reset();
    },
  });
  return { createScheduleMutation }
}
