import { create } from "zustand"

type TransactionStore = {
  step: number
  setStep: (step: number) => void
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  step: 1,
  setStep: (step) => set({ step }),
}))
