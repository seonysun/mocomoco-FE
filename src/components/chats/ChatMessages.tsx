'use client';

import ChatMessage from '@/components/chats/ChatMessage';
import { ChevronLeft, Send } from 'lucide-react';
import { useChatStore } from '@/store/useChatStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { chatOption } from '@/api/options/chatOption';
import { useState } from 'react';
import { chatAPI } from '@/api/functions/chatAPI';

type MsgsProps = {
  room_id: string;
};

const ChatMessages = ({ room_id }: MsgsProps) => {
  const currentUserId = useAuthStore(state => state.user?.id!);
  const { data: messages } = useQuery(chatOption.chatMessages(room_id));

  const { exitRoom } = useChatStore();

  const [inputValue, setInputValue] = useState('');

  const queryClient = useQueryClient();
  const postMessageMutation = useMutation({
    mutationFn: (content: string) => chatAPI.postMessages(room_id, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['chat', 'messages', room_id],
      });
      setInputValue('');
    },
    onError: error => {
      console.error('전송 실패:', error);
    },
  });

  const handleSend = () => {
    if (inputValue.trim() === '') return;
    postMessageMutation.mutate(inputValue);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex h-full flex-col p-1">
      <div className="flex items-center border-b border-main-base py-3">
        <button onClick={exitRoom}>
          <ChevronLeft stroke="gray" />
        </button>
        <span className="ml-1 font-bold">채팅방명</span>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto py-2">
        {messages?.map(msg => (
          <ChatMessage
            key={msg.ChatMessage_id}
            message={msg}
            currentUserId={currentUserId}
          />
        ))}
      </div>
      <div className="flex items-center justify-between gap-2 rounded-xl bg-white p-3">
        <input
          type="text"
          className="flex-1 border-none text-sm text-gray-700 outline-none"
          placeholder="메시지를 입력하세요."
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Send
          stroke="gray"
          size={20}
          onClick={handleSend}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ChatMessages;
