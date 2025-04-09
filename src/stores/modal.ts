import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const useWordleGameResultModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));
