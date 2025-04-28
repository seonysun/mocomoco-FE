'use client';
import Banner from '@images/Banner.png';
import { Bell, CircleUserRound, Menu, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const token = useState(false);
  return (
    <header className="sticky top-0 z-30 w-full bg-main-light p-4 px-10">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Image src={Banner} width={200} height={80} alt="헤더 이미지" />
        </Link>
        {token ? (
          <div className="flex gap-7">
            <MessageSquare size={35} color="#a0b092" />
            <Bell size={35} color="#a0b092" />
            <CircleUserRound size={35} color="#a0b092" />
            <div className="pl-7">
              <Menu size={36} color="#a0b092" />
            </div>
          </div>
        ) : (
          <div className="font-bold text-main-header">LOGIN</div>
        )}
      </nav>
    </header>
  );
};

export default Header;
