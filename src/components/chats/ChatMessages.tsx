'use client';

import ChatMessage from '@/components/chats/ChatMessage';
import { ChevronLeft, Send } from 'lucide-react';
import { messages } from '@/mockup/messages';
import { useChatStore } from '@/store/useChatStore';

type MsgsProps = {
  roomId: string;
};

const ChatMessages = ({ roomId }: MsgsProps) => {
  const currentUserId = 2;

  const { exitRoom } = useChatStore();

  return (
    <div className="flex h-full flex-col p-1">
      <div className="flex items-center border-b border-main-base py-3">
        <button onClick={exitRoom}>
          <ChevronLeft stroke="gray" />
        </button>
        <span className="ml-1 font-bold">채팅방명</span>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto py-2">
        {messages.map(msg => (
          <ChatMessage
            key={msg.messageId}
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
        />
        <Send stroke="gray" size={20} />
      </div>
    </div>
  );
};

export default ChatMessages;
