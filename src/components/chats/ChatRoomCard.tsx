import Image from 'next/image';
import Logo from '@images/Logo.png';
import { ChatRoom } from '@/types/chat';

type chatRoomProps = {
  chatRoom: ChatRoom;
};

const ChatRoomCard = ({ chatRoom }: chatRoomProps) => {
  return (
    <div className="relative grid grid-cols-[4fr_1fr] rounded-2xl bg-[#FFFCFC] p-3 hover:brightness-95">
      {chatRoom.unreadCount > 0 && (
        <span className="absolute right-0 top-0 z-40 size-3 rounded-full bg-red-500" />
      )}
      <div className="flex items-center">
        <Image
          src={Logo}
          className="size-12 rounded-full"
          alt="채팅방 이미지"
        />
        <div className="ml-3">
          <p className="line-clamp-1 text-sm font-bold text-black">
            {chatRoom.postTitle}
          </p>
          <p className="mt-[2px] line-clamp-1 text-sm text-gray-600">
            {chatRoom.latestMessage}
          </p>
        </div>
      </div>
      <div className="mt-1 text-xs text-gray-400">{chatRoom.latestTime}</div>
    </div>
  );
};

export default ChatRoomCard;
