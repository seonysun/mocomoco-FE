'use client';

import { useState } from 'react';
import ChatMessages from '@/components/chats/ChatMessages';
import Modal from '@/components/common/modal/Modal';
import FloatingButton from '@/components/common/button/FloatingButton';
import ChatRooms from '@/components/chats/ChatRooms';
import { useChatStore } from '@/store/useChatStore';
import { useModalStore } from '@/store/useModalStore';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { myMoimOption } from '@/api/options/myMoimOption';

const ClientLayout = () => {
  const [isAlarm] = useState(false);

  const view = useChatStore(state => state.view);
  const isChatOpen = useChatStore(state => state.isOpen);
  const selectedRoomId = useChatStore(state => state.selectedRoomId);
  const openModal = useChatStore(state => state.openModal);
  const closeModal = useChatStore(state => state.closeModal);

  const isConfirmOpen = useModalStore(state => state.isOpen);

  const queryClient = useQueryClient();
  const cancelMyMoimMutation = useMutation(
    myMoimOption.cancelMyMoim(queryClient),
  );

  return (
    <>
      {isConfirmOpen && (
        <ConfirmModal
          input={true}
          content="탈퇴 사유를 작성해주세요"
          onConfirm={id => cancelMyMoimMutation.mutate(id)}
        />
      )}
      {isChatOpen ? (
        <Modal onClose={closeModal}>
          {view === 'list' && <ChatRooms />}
          {view === 'room' && selectedRoomId && (
            <ChatMessages room_id={selectedRoomId} />
          )}
        </Modal>
      ) : (
        <FloatingButton alarm={isAlarm} handleOpen={openModal} />
      )}
    </>
  );
};

export default ClientLayout;
