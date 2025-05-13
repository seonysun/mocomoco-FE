'use client';

import { MYPAGE_MENU_LIST } from '@/constants/config';
import { User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MypageSidebar = () => {
  const pathname = usePathname();

  return (
    <>
      {/* 화면 sm 이상 */}
      <aside className="hidden w-[200px] rounded-xl border border-main-default bg-white bg-opacity-40 p-5 pb-8 sm:block">
        <p className="mb-5 text-center font-semibold">마이페이지</p>
        <nav>
          <ul className="flex flex-col gap-5">
            {MYPAGE_MENU_LIST.map(menu => (
              <li key={menu.href}>
                <Link
                  href={menu.href}
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    pathname === menu.href ? 'font-semibold' : 'text-gray-600'
                  }`}
                >
                  <menu.icon size={20} />
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* 화면 sm 미만 */}
      <aside className="justify-left flex h-[50px] max-w-[600px] items-center gap-[20px] rounded-xl border border-main-default border-opacity-25 bg-white bg-opacity-40 p-1 pl-5 sm:hidden">
        <User size={30} className="mb-5 pt-[10px] text-center" />
        <nav>
          <ul className="flex">
            {MYPAGE_MENU_LIST.map((menu, index) => (
              <li className="flex" key={menu.href}>
                <Link
                  href={menu.href}
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    pathname === menu.href ? 'font-semibold' : 'text-gray-600'
                  }`}
                >
                  {/* <menu.icon size={20} /> */}
                  {menu.name}
                </Link>
                <p className="p-3 text-gray-600">
                  {index !== MYPAGE_MENU_LIST.length - 1 && '|'}
                </p>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default MypageSidebar;
