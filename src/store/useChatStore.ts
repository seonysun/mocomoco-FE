import { create } from 'zustand';

type ChatView = 'list' | 'room';

type ChatState = {
  isOpen: boolean;
  view: ChatView;
  chatType?: 'private' | 'group';
  setChatType?: (type: 'private' | 'group') => void;
  selectedRoomId?: string | null;
  selectedRoomTitle?: string | null;
  openModal: () => void;
  closeModal: () => void;
  enterRoom: (roomId: string, roomTitle: string) => void;
  exitRoom: () => void;
};

export const useChatStore = create<ChatState>(set => ({
  isOpen: false,
  view: 'list',
  chatType: 'private',
  setChatType: type => set({ chatType: type }),
  selectedRoomId: null,
  selectedRoomTitle: null,
  openModal: () => set({ isOpen: true, view: 'list' }),
  closeModal: () =>
    set({
      isOpen: false,
      view: 'list',
      selectedRoomId: null,
      selectedRoomTitle: null,
    }),
  enterRoom: (roomId, roomTitle) =>
    set({ view: 'room', selectedRoomId: roomId, selectedRoomTitle: roomTitle }),
  exitRoom: () =>
    set({ view: 'list', selectedRoomId: null, selectedRoomTitle: null }),
}));
