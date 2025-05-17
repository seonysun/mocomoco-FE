'use client';

import Image from 'next/image';
import UserProfile from '@images/UserProfile.png';
import CardShell from '@/components/common/card/CardShell';
import { ChatRoom } from '@/types/chat';

type ChatRoomProps = {
  chatRoom: ChatRoom;
};

const ChatRoomCard = ({ chatRoom }: ChatRoomProps) => {
  return (
    <CardShell
      unread={chatRoom.unread_count > 0}
      imageSlot={
        <Image
          src={UserProfile}
          alt="채팅방"
          width={50}
          height={50}
          className="scale-125 object-cover"
        />
      }
      titleSlot={chatRoom.title || '채팅방'}
      contentSlot={chatRoom.latest_message}
      timeSlot={chatRoom.latest_time}
    />
  );
};

export default ChatRoomCard;
