'use client';

import ChatMessage from '@/components/chats/ChatMessage';
import { ChevronLeft, Send } from 'lucide-react';
import { useChatStore } from '@/store/useChatStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { chatOption } from '@/api/options/chatOption';
import { useCallback, useMemo, useRef } from 'react';
import { useSocket } from '@/hooks/useSocket';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';

type MsgsProps = {
  room_id: string;
};

const ChatMessages = ({ room_id }: MsgsProps) => {
  const access = useAuthStore(state => state.access);
  const currentUserId = useAuthStore(state => state.user?.id!);

  const { selectedRoomTitle, exitRoom } = useChatStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const virtuosoRef = useRef<VirtuosoHandle>(null);

  const { newMessage, sendMessage } = useSocket(room_id, access);
  const { data: oldMessages = [] } = useQuery(chatOption.chatMessages(room_id));
  const allMessages = [...oldMessages, ...newMessage];

  const { otherId, otherImage } = useMemo(() => {
    const otherMsg = allMessages.find(
      msg => msg.chat_user_id !== currentUserId,
    );

    return {
      otherId: otherMsg?.chat_user_id,
      otherImage: otherMsg?.profile_image,
    };
  }, [allMessages, currentUserId]);
  const { data: otherProfile } = useQuery(chatOption.chatUser(otherId));
  const userProfileImage = otherProfile?.profile_image || otherImage || null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();

    const inputMessage = inputRef.current?.value.trim() || '';
    const success = sendMessage(inputMessage);
    if (success && inputRef.current) inputRef.current.value = '';

    setTimeout(() => {
      virtuosoRef.current?.scrollToIndex({
        index: allMessages.length - 1,
        align: 'end',
        behavior: 'smooth',
      });
    }, 50);
  };

  const queryClient = useQueryClient();
  const deleteMessageMutation = useMutation(
    chatOption.deleteMessage(room_id, queryClient),
  );
  const handleDelete = useCallback(
    (msgId: number) => {
      deleteMessageMutation.mutate(msgId);
    },
    [deleteMessageMutation],
  );

  return (
    <div className="flex h-full flex-col p-1">
      <div className="flex items-center border-b border-main-base py-3">
        <button onClick={exitRoom}>
          <ChevronLeft stroke="gray" />
        </button>
        <span className="ml-1 font-bold">{selectedRoomTitle || '채팅방'}</span>
      </div>
      <div className="flex-1 space-y-2.5 overflow-y-auto py-2 pr-1">
        <Virtuoso
          style={{ height: '100%' }}
          ref={virtuosoRef}
          data={allMessages}
          initialTopMostItemIndex={allMessages.length - 1}
          followOutput="auto"
          alignToBottom
          itemContent={(index, msg) => (
            <div className="py-1">
              <ChatMessage
                message={msg}
                currentUserId={currentUserId}
                profileImage={userProfileImage}
                handleDelete={handleDelete}
              />
            </div>
          )}
        />
      </div>
      <form
        onSubmit={handleSend}
        className="flex items-center justify-between gap-2 rounded-xl bg-white p-3"
      >
        <input
          type="text"
          ref={inputRef}
          className="flex-1 border-none text-sm text-gray-700 outline-none"
          placeholder="메시지를 입력하세요."
        />
        <button type="submit">
          <Send stroke="gray" size={20} className="cursor-pointer" />
        </button>
      </form>
    </div>
  );
};

export default ChatMessages;
