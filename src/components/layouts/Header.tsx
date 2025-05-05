'use client';

import Modal from '@/components/common/modal/Modal';
import Menus from '@/components/layouts/Menu';
import Banner from '@images/Banner.png';
import { Bell, CircleUserRound, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Notifications from '@/components/notifications/Notifications';

const Header = () => {
  const [token] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotiOpen, setIsNotiOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-[80px] w-full justify-between bg-main-light py-4">
      <Link href="/">
        <Image src={Banner} width={150} alt="헤더 이미지" />
      </Link>
      <nav className="flex items-center justify-between font-bold text-main-header">
        {token ? (
          <>
            <span className="flex gap-5">
              <Bell
                size={35}
                color="#a0b092"
                onClick={() => setIsNotiOpen(true)}
              />
              <Link href="/mypage">
                <CircleUserRound size={35} color="#a0b092" />
              </Link>
            </span>
            <Menu
              className="ml-6"
              size={35}
              color="#a0b092"
              onClick={() => setIsMenuOpen(true)}
            />
          </>
        ) : (
          <Link href="/auth/login">LOGIN</Link>
        )}
      </nav>
      {isMenuOpen && (
        <Modal variation="menu" onClose={() => setIsMenuOpen(false)}>
          <Menus />
        </Modal>
      )}
      {isNotiOpen && (
        <Modal variation="notification" onClose={() => setIsNotiOpen(false)}>
          <Notifications
            notiList={[
              {
                Notification_id: 12,
                type: '신청',
                content: '새로운 모임 신청이 도착했어요!',
                is_read: false,
                url: '/posts/21/',
                created_at: '2025-04-25T22:01:00',
              },
              {
                Notification_id: 13,
                type: '채팅',
                content: '지안님이 메시지를 보냈어요.',
                is_read: true,
                url: '/chat/a1b2c3/',
                created_at: '2025-04-25T21:55:00',
              },
            ]}
          />
        </Modal>
      )}
    </header>
  );
};

export default Header;
