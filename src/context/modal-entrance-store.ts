import { create } from "zustand";

type ModalEntranceStore = {
  showModalEntrance: boolean;
  setShowModalEntrance: (showModalEntrance: boolean) => void;
};

export const useModalEntranceStore = create<ModalEntranceStore>((set) => ({
  showModalEntrance: false,
  setShowModalEntrance: (showModalEntrance) => set({ showModalEntrance }),
}));
