import { create } from "zustand"

type SidebarStpsStore = {
  step: number
  setStep: (step: number) => void
}

export const useSidebarStpsStore = create<SidebarStpsStore>((set) => ({
  step: 1,
  setStep: (step) => set({ step }),
}))
