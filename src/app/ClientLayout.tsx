'use client';

import { useState } from 'react';
import ChatMessages from '@/components/chats/ChatMessages';
import Modal from '@/components/common/modal/Modal';
import FloatingButton from '@/components/common/button/FloatingButton';
import ChatRooms from '@/components/chats/ChatRooms';
import { useChatStore } from '@/store/useChatStore';

const ClientLayout = () => {
  const [isAlarm] = useState(false);

  const { view, isOpen, selectedRoomId, openModal, closeModal } =
    useChatStore();

  return (
    <>
      {isOpen ? (
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
