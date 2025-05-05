'use client';

import ChatMessage from '@/components/chats/ChatMessage';
import { Chats } from '@/types/chat';
import { ChevronLeft, Send } from 'lucide-react';

type MsgsProps = {
  chats: Chats[];
  onBack?: () => void;
};

const ChatMessages = ({ chats, onBack }: MsgsProps) => {
  const currentUserId = 2;

  return (
    <div className="flex h-full flex-col p-1">
      <div className="flex items-center border-b border-main-base py-3">
        <ChevronLeft stroke="gray" />
        <span className="ml-1 font-bold">채팅방명</span>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto py-2">
        {chats.map(chat => (
          <ChatMessage
            key={chat.messageId}
            message={chat}
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
