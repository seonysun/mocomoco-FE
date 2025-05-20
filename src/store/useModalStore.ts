import { create } from 'zustand';

type ModalType = 'confirm' | 'noti' | 'menu' | 'detail' | null;

type ModalState = {
  isOpen: boolean;
  type: ModalType;
  modalData?: any;
  open: (type: ModalType, modalData?: any) => void;
  close: () => void;
};

export const useModalStore = create<ModalState>(set => ({
  isOpen: false,
  type: null,
  modalData: undefined,
  open: (type, modalData) => set({ isOpen: true, type, modalData }),
  close: () => set({ isOpen: false, type: null, modalData: undefined }),
}));
