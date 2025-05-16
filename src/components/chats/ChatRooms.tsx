'use client';

import ChatRoomCard from '@/components/chats/ChatRoomCard';
import { User, Users } from 'lucide-react';
import { useChatStore } from '@/store/useChatStore';
import { useQuery } from '@tanstack/react-query';
import { chatOption } from '@/api/options/chatOption';
import LoadingSpinner from '@/components/common/loadingSpinner/LoadingSpinner';
import { useMemo } from 'react';

const ChatRooms = () => {
  const { chatType, setChatType, enterRoom } = useChatStore();

  const tabClass =
    'rounded-t-xl border border-b-0 border-main-base px-3 py-1 mb-2';

  const { data, isLoading } = useQuery(chatOption.chatRoomList());
  const chatRooms = data ?? [];

  const privateChats = chatRooms.filter(chats => chats.participants.length < 3);
  const groupChats = chatRooms.filter(chats => chats.participants.length > 2);
  const filteredRooms = useMemo(
    () => (chatType === 'private' ? privateChats : groupChats),
    [chatType, privateChats, groupChats],
  );

  if (isLoading || !data) return <LoadingSpinner />;
  return (
    <>
      <div className="p-1">
        <button className={tabClass} onClick={() => setChatType?.('private')}>
          <User
            stroke={`${chatType === 'private' ? 'gray' : '#C4C5C7'}`}
            fill={`${chatType === 'private' ? 'gray' : 'none'}`}
          />
        </button>
        <button className={tabClass} onClick={() => setChatType?.('group')}>
          <Users
            stroke={`${chatType === 'group' ? 'gray' : '#C4C5C7'}`}
            fill={`${chatType === 'group' ? 'gray' : 'none'}`}
          />
        </button>
      </div>
      {filteredRooms.length > 0 ? (
        <div className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden">
          {filteredRooms.map(room => (
            <button
              key={room.room_id}
              onClick={() => enterRoom(room.room_id, room.title)}
              className="w-full text-start"
            >
              <ChatRoomCard chatRoom={room} />
            </button>
          ))}
        </div>
      ) : (
        <div className="my-auto">
          <p className="text-center text-sm">채팅 내역이 없어요</p>
        </div>
      )}
    </>
  );
};

export default ChatRooms;
