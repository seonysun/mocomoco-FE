import { create } from 'zustand';

type ModalState = {
  isOpen: boolean;
  id: number | null;
  open: (id: number) => void;
  close: () => void;
};

export const useModalStore = create<ModalState>(set => ({
  isOpen: false,
  id: null,
  open: id => set({ isOpen: true, id }),
  close: () => set({ isOpen: false, id: null }),
}));
