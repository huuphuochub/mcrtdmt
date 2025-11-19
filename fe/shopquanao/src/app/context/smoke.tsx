import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SmokeState {
  isOn: boolean;
  setIsOn: (value: boolean) => void;
}

export const useSmokeStore = create<SmokeState>()(
  persist(
    (set) => ({
      isOn: true,
      setIsOn: (value) => set({ isOn: value }),
    }),
    {
      name: "smoke-storage", // key lưu trong localStorage
    }
  )
);
