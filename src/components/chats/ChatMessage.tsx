'use client';

import { Chats } from '@/types/chat';
import Image from 'next/image';
import Logo from '@images/Logo.png';
import { Trash } from 'lucide-react';

type MsgProps = {
  message: Chats;
  currentUserId: number;
  handleDelete: (id: number) => void;
};

const ChatMessage = ({ message, currentUserId, handleDelete }: MsgProps) => {
  const isMine = message.chat_user_id === currentUserId;

  return (
    <div className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
      {!isMine && (
        <div className="mr-1 flex flex-col items-center">
          <Image src={Logo} className="size-8 rounded-full" alt="유저 이미지" />
          <p className="text-xs font-semibold text-gray-500">
            {message.nickname}
          </p>
        </div>
      )}
      <div
        className={`group relative max-w-[75%] rounded-xl px-3 py-2 text-sm ${
          isMine
            ? 'rounded-br-none bg-main-base text-white'
            : 'rounded-bl-none border bg-white text-black'
        }`}
      >
        <p>{message.content}</p>
        {isMine && (
          <button
            className="absolute -right-5 top-0 hidden p-1 group-hover:block"
            onClick={() => handleDelete(message.ChatMessage_id)}
          >
            <Trash size={14} className="text-gray-400 hover:text-red-500" />
          </button>
        )}
      </div>
      <p className="ml-1 self-end text-[10px] text-gray-400">
        {new Date(message.created_at).toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
    </div>
  );
};

export default ChatMessage;
