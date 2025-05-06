'use client';

import ChatRoomCard from '@/components/chats/ChatRoomCard';
import Button from '@/components/common/button/Button';
import { User, Users } from 'lucide-react';
import { chats } from '@/mockup/chat';
import { useChatStore } from '@/store/useChatStore';

type ChatProps = {
  // chatType?: 'private' | 'group';
  // setChatType?: React.Dispatch<React.SetStateAction<'private' | 'group'>>;
};

const ChatRooms = () =>
  // { chatType = 'private', setChatType }: ChatProps
  {
    const tabClass =
      'mr-0.5 rounded-t-xl border border-b-0 border-main-base px-3 py-1 mb-2';

    const { chatType, setChatType, enterRoom } = useChatStore();
    const chatRoomList = chats;

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
        {chatRoomList.length > 0 ? (
          <div className="flex-1 space-y-1 overflow-y-auto scroll-smooth">
            {chatRoomList.map(room => (
              <button
                key={room.roomId}
                onClick={() => enterRoom(room.roomId)}
                className="w-full text-start"
              >
                <ChatRoomCard chatRoom={room} />
              </button>
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
