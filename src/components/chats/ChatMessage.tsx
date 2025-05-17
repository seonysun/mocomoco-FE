'use client';

import { Chats } from '@/types/chat';
import Image from 'next/image';
import UserProfile from '@images/UserProfile.png';
import { Trash } from 'lucide-react';

type MsgProps = {
  message: Chats;
  currentUserId: number;
  handleDelete: (id: number) => void;
};

const ChatMessage = ({ message, currentUserId, handleDelete }: MsgProps) => {
  const isMine = message.chat_user_id === currentUserId;

  return (
    <div className={`group flex ${isMine ? 'justify-end' : 'justify-start'}`}>
      {!isMine && (
        <Image
          src={message.profile_image || UserProfile}
          alt={message.nickname || '유저'}
          width={40}
          height={40}
          className="-ml-0.5 mr-0.5 h-fit scale-125"
        />
      )}
      <div className="flex max-w-[75%] flex-col gap-0.5">
        {!isMine && (
          <p
            title={message.nickname}
            className="truncate text-xs font-semibold text-gray-500"
          >
            {message.nickname}
          </p>
        )}
        <div className="relative flex gap-1">
          <p
            className={`rounded-xl px-2.5 py-1.5 text-sm ${
              isMine
                ? 'rounded-br-none bg-main-base text-white'
                : 'rounded-bl-none border bg-white text-black'
            }`}
          >
            {message.content}
          </p>

          <p className="self-end text-[10px] text-gray-400">
            {new Date(message.created_at).toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          {isMine && (
            <button
              className="absolute -top-1 right-0 hidden p-1 group-hover:block"
              onClick={() => handleDelete(message.ChatMessage_id)}
            >
              <Trash size={14} className="text-gray-400 hover:text-red-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
