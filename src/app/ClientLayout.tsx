'use client';

import ChatMessages from '@/components/chats/ChatMessages';
import Modal from '@/components/common/modal/Modal';
import FloatingButton from '@/components/common/button/FloatingButton';
import ChatRooms from '@/components/chats/ChatRooms';
import { useChatStore } from '@/store/useChatStore';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

const ClientLayout = () => {
  const view = useChatStore(state => state.view);
  const isChatOpen = useChatStore(state => state.isOpen);
  const selectedRoomId = useChatStore(state => state.selectedRoomId);
  const openModal = useChatStore(state => state.openModal);
  const closeModal = useChatStore(state => state.closeModal);

  const router = useRouter();
  const user = useAuthStore(state => state.user);

  const handleOpen = () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    openModal();
  };

  return (
    <>
      {isChatOpen ? (
        <Modal onClose={closeModal}>
          {view === 'list' && <ChatRooms />}
          {view === 'room' && selectedRoomId && (
            <ChatMessages room_id={selectedRoomId} />
          )}
        </Modal>
      ) : (
        <FloatingButton handleOpen={handleOpen} />
      )}
    </>
  );
};

export default ClientLayout;
