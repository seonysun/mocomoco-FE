'use client';

import { useState } from 'react';
import ChatMessages from '@/components/chats/ChatMessages';
import Modal from '@/components/common/modal/Modal';
import FloatingButton from '@/components/common/button/FloatingButton';
import ChatRooms from '@/components/chats/ChatRooms';
import { useChatStore } from '@/store/useChatStore';
import { useModalStore } from '@/store/useModalStore';
import ConfirmModal from '@/components/common/modal/ConfirmModal';

const ClientLayout = () => {
  const [isAlarm] = useState(false);

  const {
    view,
    isOpen: isChatOpen,
    selectedRoomId,
    openModal,
    closeModal,
  } = useChatStore();
  const { isOpen: isConfirmOpen } = useModalStore();

  return (
    <>
      {isConfirmOpen && <ConfirmModal />}
      {isChatOpen ? (
        <Modal onClose={closeModal}>
          {view === 'list' && <ChatRooms />}
          {view === 'room' && selectedRoomId && (
            <ChatMessages roomId={selectedRoomId} />
          )}
        </Modal>
      ) : (
        <FloatingButton alarm={isAlarm} handleOpen={openModal} />
      )}
    </>
  );
};

export default ClientLayout;
