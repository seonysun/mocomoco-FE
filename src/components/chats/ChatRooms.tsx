'use client';

import ChatRoomCard from '@/components/chats/ChatRoomCard';
import Button from '@/components/common/button/Button';
import { ChatRoom } from '@/types/chat';
import { User, Users } from 'lucide-react';

type chatProps = {
  chatRoomList: ChatRoom[];
  chatType?: 'private' | 'group';
  setChatType?: React.Dispatch<React.SetStateAction<'private' | 'group'>>;
};

const ChatRooms = ({
  chatRoomList,
  chatType = 'private',
  setChatType,
}: chatProps) => {
  const tabClass =
    'mr-0.5 rounded-t-xl border border-b-0 border-main-base px-3 py-1';

  return (
    <>
      <div>
        <button
          className={`${tabClass} ${chatType === 'private' ? 'bg-main-base' : ''}`}
          onClick={() => setChatType?.('private')}
        >
          <User stroke="gray" />
        </button>
        <button
          className={`${tabClass} ${chatType === 'group' ? 'bg-main-base' : ''}`}
          onClick={() => setChatType?.('group')}
        >
          <Users stroke="gray" />
        </button>
      </div>
      {chatRoomList && chatRoomList.length > 0 ? (
        <div className="flex-1 space-y-1 overflow-y-scroll scroll-smooth pr-0.5">
          {chatRoomList.map(room => (
            <ChatRoomCard key={room.roomId} chatRoom={room} />
          ))}
        </div>
      ) : (
        <>
          <p className="text-main-soft text-center text-sm">
            채팅 내역이 없어요
          </p>
          <Button>채팅 시작하기</Button>
        </>
      )}
    </>
  );
};

export default ChatRooms;
