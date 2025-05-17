'use client';

import Modal from '@/components/common/modal/Modal';
import Menus from '@/components/layouts/Menu';
import Banner from '@images/Banner.png';
import { Bell, CircleUserRound, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Notifications from '@/components/notifications/Notifications';
import { useAuthStore } from '@/store/useAuthStore';
import { useModalStore } from '@/store/useModalStore';
import { useLogout } from '@/components/login/useLogout';

const Header = () => {
  const logoutHandler = useLogout();

  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  const { isOpen: isModalOpen, open, close, type } = useModalStore();

  const handleLogout = async () => {
    await logoutHandler();
    alert('로그아웃이 완료되었습니다.');
  };

  return (
    <header className="sticky top-0 z-30 h-[64px] w-full bg-main-light py-4 sm:h-[80px]">
      <div className="relative flex justify-between">
        <Link href="/">
          <Image
            src={Banner}
            alt="헤더 이미지"
            className="h-auto w-[100px] sm:w-[150px]"
          />
        </Link>
        <nav className="font-bold text-main-header">
          <ul className="flex items-center justify-between gap-3 sm:gap-5">
            {isLoggedIn ? (
              <>
                <li>
                  <Link href="/">
                    <div
                      onClick={() => handleLogout()}
                      className="cursor-pointer text-[12px] font-bold hover:underline sm:text-[16px]"
                    >
                      LOGOUT
                    </div>
                  </Link>
                </li>
                <li>
                  <div className="relative">
                    <Bell
                      color="#a0b092"
                      onClick={() => open('noti')}
                      className="size-7 cursor-pointer sm:size-10"
                    />
                  </div>
                </li>
                <li>
                  <Link href="/mypage">
                    <CircleUserRound
                      color="#a0b092"
                      className="size-7 cursor-pointer sm:size-10"
                    />
                  </Link>
                </li>
                <li>
                  <Menu
                    className="ml-1 size-7 cursor-pointer sm:size-10"
                    color="#a0b092"
                    onClick={() => open('menu')}
                  />
                </li>
              </>
            ) : (
              <li>
                <Link href="/auth/login">LOGIN</Link>
              </li>
            )}
          </ul>
        </nav>
        {isModalOpen && type === 'menu' && (
          <Modal variation="menu" onClose={close}>
            <Menus onClose={close} />
          </Modal>
        )}
        {isModalOpen && type === 'noti' && (
          <Modal variation="notification" onClose={close}>
            <Notifications />
          </Modal>
        )}
      </div>
    </header>
  );
};

export default Header;
