'use client';

import Image from 'next/image';
import Logo from '@images/Logo.png';
import CardShell from '@/components/common/card/CardShell';
import { ChatRoom } from '@/types/chat';

type ChatRoomProps = {
  chatRoom: ChatRoom;
};

const ChatRoomCard = ({ chatRoom }: ChatRoomProps) => {
  return (
    <CardShell
      unread={chatRoom.unreadCount > 0}
      imageSlot={
        <Image
          src={Logo}
          className="size-12 rounded-full"
          alt="채팅방 이미지"
        />
      }
      titleSlot={chatRoom.postTitle}
      contentSlot={chatRoom.latestMessage}
      timeSlot={chatRoom.latestTime}
    />
  );
};

export default ChatRoomCard;
