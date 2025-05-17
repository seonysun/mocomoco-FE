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
    <header className="sticky top-0 z-30 h-[80px] w-full bg-main-light py-4">
      <div className="relative flex justify-between">
        <Link href="/">
          <Image src={Banner} width={150} alt="헤더 이미지" />
        </Link>
        <nav className="font-bold text-main-header">
          <ul className="flex items-center justify-between gap-3 sm:gap-5">
            {isLoggedIn ? (
              <>
                <li>
                  <Link href="/">
                    <div
                      onClick={() => handleLogout()}
                      className="cursor-pointer text-[10px] font-bold hover:underline sm:text-[15px]"
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
                      className="h-[20px] w-[20px] cursor-pointer sm:h-[40px] sm:w-[40px]"
                    />
                  </div>
                </li>
                <li>
                  <Link href="/mypage">
                    <CircleUserRound
                      size={35}
                      color="#a0b092"
                      className="h-[20px] w-[20px] cursor-pointer sm:h-[40px] sm:w-[40px]"
                    />
                  </Link>
                </li>
                <li>
                  <Menu
                    className="ml-1 h-[20px] w-[20px] cursor-pointer sm:h-[40px] sm:w-[40px]"
                    size={35}
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
