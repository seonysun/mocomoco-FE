'use client';

import Image from 'next/image';
import Logo from '@images/Logo.png';
import CardShell from '@/components/common/card/CardShell';
import { Notification } from '@/types/modal';

type NotiProps = {
  notification: Notification;
};

const NotificationCard = ({ notification }: NotiProps) => {
  return (
    <CardShell
      unread={!notification.is_read}
      imageSlot={
        <Image
          src={Logo}
          className="size-12 rounded-full"
          alt="채팅방 이미지"
        />
      }
      titleSlot={notification.type}
      contentSlot={notification.content}
      timeSlot={notification.created_at}
      className="border p-1"
    />
  );
};

export default NotificationCard;
