'use client';

import Modal from '@/components/common/modal/Modal';
import MenuModal from '@/components/common/modal/MenuModal';
import { HEADER_NAV_LIST } from '@/constants/config';
import Banner from '@images/Banner.png';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [token] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-[80px] w-full justify-between bg-main-light py-4">
      <Link href="/">
        <Image src={Banner} width={150} alt="헤더 이미지" />
      </Link>
      <nav className="flex items-center justify-between font-bold text-main-header">
        {token ? (
          <>
            <span className="flex gap-5">
              {HEADER_NAV_LIST.map(menu => (
                <Link key={menu.name} href={`/${menu.to}`}>
                  <menu.src size={35} color="#a0b092" />
                </Link>
              ))}
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
          <MenuModal />
        </Modal>
      )}
    </header>
  );
};

export default Header;
