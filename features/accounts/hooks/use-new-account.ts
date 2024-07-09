import { create } from "zustand";

type NewAccountType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewAccount = create<NewAccountType>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
