'use client';

import ChatMessage from '@/components/chats/ChatMessage';
import { ChevronLeft, Send } from 'lucide-react';
import { useChatStore } from '@/store/useChatStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { chatOption } from '@/api/options/chatOption';
import { useEffect, useRef, useState } from 'react';

type MsgsProps = {
  room_id: string;
};

const ChatMessages = ({ room_id }: MsgsProps) => {
  const currentUserId = useAuthStore(state => state.user?.id!);
  const { selectedRoomTitle, exitRoom } = useChatStore();

  const { data: messages } = useQuery(chatOption.chatMessages(room_id));

  const queryClient = useQueryClient();

  const [inputValue, setInputValue] = useState('');
  const postMessageMutation = useMutation(
    chatOption.postMessage(room_id, queryClient),
  );
  const handleSend = () => {
    if (inputValue.trim() === '') return;
    postMessageMutation.mutate(inputValue);
    setInputValue('');
  };

  const deleteMessageMutation = useMutation(
    chatOption.deleteMessage(room_id, queryClient),
  );
  const handleDelete = (msgId: number) => {
    deleteMessageMutation.mutate(msgId);
  };

  const lastMessageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-full flex-col p-1">
      <div className="flex items-center border-b border-main-base py-3">
        <button onClick={exitRoom}>
          <ChevronLeft stroke="gray" />
        </button>
        <span className="ml-1 font-bold">{selectedRoomTitle}</span>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto py-2">
        {messages?.map((msg, i) => (
          <div
            key={msg.ChatMessage_id}
            ref={i === messages.length - 1 ? lastMessageRef : null}
          >
            <ChatMessage
              message={msg}
              currentUserId={currentUserId}
              handleDelete={() => handleDelete(msg.ChatMessage_id)}
            />
          </div>
        ))}
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center justify-between gap-2 rounded-xl bg-white p-3"
      >
        <input
          type="text"
          value={inputValue}
          className="flex-1 border-none text-sm text-gray-700 outline-none"
          placeholder="메시지를 입력하세요."
          onChange={e => setInputValue(e.target.value)}
        />
        <button type="submit">
          <Send stroke="gray" size={20} className="cursor-pointer" />
        </button>
      </form>
    </div>
  );
};

export default ChatMessages;
