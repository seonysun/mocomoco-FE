'use client';

import ChatRoomCard from '@/components/chats/ChatRoomCard';
import { User, Users } from 'lucide-react';
import { useChatStore } from '@/store/useChatStore';
import { useQuery } from '@tanstack/react-query';
import { chatOption } from '@/api/options/chatOption';

const ChatRooms = () => {
  const tabClass =
    'rounded-t-xl border border-b-0 border-main-base px-3 py-1 mb-2';

  const { data: chatRoomList } = useQuery(chatOption.chatRoomList());
  const chatRooms = chatRoomList ?? [];

  const { chatType, setChatType, enterRoom } = useChatStore();

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
      {chatRooms.length > 0 ? (
        <div className="flex-1 space-y-1 overflow-y-auto scroll-smooth">
          {chatRooms.map(room => (
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
