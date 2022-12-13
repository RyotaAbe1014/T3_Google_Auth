import create from 'zustand';

// zustandで管理するステートを定義する
type State = {
  editedTask: UpdateTaskInput;
  updateEditedTask: (payload: UpdateTaskInput) => void;
  resetEditedTask: () => void;
};

// storeを定義
const useStore = create<State>((set) => ({
  // 初期値を定義
  editedTask: { taskId: '', title: '', body: '' },
  // ロジック
  updateEditedTask: (payload) =>
    set({
      editedTask: payload,
    }),
  resetEditedTask: () => set({ editedTask: { taskId: '', title: '', body: '' } }),
}))

// Reactから使用できるように
export default useStore;