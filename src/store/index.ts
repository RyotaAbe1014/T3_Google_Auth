import create from 'zustand';
import { UpdateScheduleInput } from '../schema/schedule';


// zustandで管理するステートを定義する
type State = {
  editedSchedule: UpdateScheduleInput;
  updateEditedSchedule: (payload: UpdateScheduleInput) => void;
  resetEditedSchedule: () => void;
};

// storeを定義
const useStore = create<State>((set) => ({
  // 初期値を定義
  editedSchedule: { scheduleId: '', title: '', start: new Date, end: new Date },
  // ロジック
  updateEditedSchedule: (payload) =>
    set({
      editedSchedule: payload,
    }),
  resetEditedSchedule: () => set({ editedSchedule: { scheduleId: '', title: '', start: new Date, end: new Date } }),
}))

export default useStore;