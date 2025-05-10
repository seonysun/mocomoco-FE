'use client';

import Modal from '@/components/common/modal/Modal';
import Menus from '@/components/layouts/Menu';
import Banner from '@images/Banner.png';
import { Bell, CircleUserRound, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Notifications from '@/components/notifications/Notifications';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

const Header = () => {
  const router = useRouter();

  const user = useAuthStore(state => state.user);
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const logout = useAuthStore(state => state.logout);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotiOpen, setIsNotiOpen] = useState(false);

  const handleLogout = () => {
    logout();
    alert('로그아웃이 완료되었습니다.');
    router.push('/'); // 홈 또는 로그인 페이지로 이동
  };

  return (
    <header className="sticky top-0 z-30 flex h-[80px] w-full justify-between bg-main-light py-4">
      <Link href="/">
        <Image src={Banner} width={150} alt="헤더 이미지" />
      </Link>
      <nav className="font-bold text-main-header">
        <ul className="flex items-center justify-between gap-5">
          {isLoggedIn ? (
            <>
              <li>
                <Link href="/">
                  <div
                    onClick={() => handleLogout()}
                    className="font-bold hover:underline"
                  >
                    로그아웃
                  </div>
                </Link>
              </li>
              <li>
                <Bell
                  size={35}
                  color="#a0b092"
                  onClick={() => setIsNotiOpen(true)}
                  className="cursor-pointer"
                />
              </li>
              <li>
                <Link href="/mypage">
                  <CircleUserRound
                    size={35}
                    color="#a0b092"
                    className="cursor-pointer"
                  />
                </Link>
              </li>
              <li>
                <Menu
                  className="ml-1 cursor-pointer"
                  size={35}
                  color="#a0b092"
                  onClick={() => setIsMenuOpen(true)}
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
      {isMenuOpen && (
        <Modal variation="menu" onClose={() => setIsMenuOpen(false)}>
          <Menus onClose={() => setIsMenuOpen(false)} />
        </Modal>
      )}
      {isNotiOpen && (
        <Modal variation="notification" onClose={() => setIsNotiOpen(false)}>
          <Notifications onClose={() => setIsNotiOpen(false)} />
        </Modal>
      )}
    </header>
  );
};

export default Header;
