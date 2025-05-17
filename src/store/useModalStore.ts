import { User } from '@/types/moim';
import { create } from 'zustand';

type ModalType = 'confirm' | 'noti' | 'menu' | 'detail' | null;

type ModalState = {
  isOpen: boolean;
  type: ModalType;
  id?: number | null;
  participants: User[];
  open: (type: ModalType, id?: number | null, participants?: User[]) => void;
  close: () => void;
};

export const useModalStore = create<ModalState>(set => ({
  isOpen: false,
  type: null,
  id: null,
  participants: [],
  open: (type = null, id = null, participants = []) =>
    set({ isOpen: true, type, id, participants }),
  close: () => set({ isOpen: false, type: null, id: null, participants: [] }),
}));
