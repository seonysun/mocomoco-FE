'use client';

import { MYPAGE_MENU_LIST } from '@/constants/config';
import { User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MypageSidebar = () => {
  const pathname = usePathname();

  return (
    <>
      <aside className="max-h-[230px] w-full rounded-xl border border-main-default border-opacity-30 bg-white bg-opacity-40 p-3 px-5 sm:block md:w-[200px] md:p-5">
        <p className="mb-5 hidden text-center font-semibold md:block">
          마이페이지
        </p>
        <nav>
          <ul className="flex w-full items-center gap-5 md:flex-col md:items-start md:justify-start">
            <User className="md:hidden" />
            {MYPAGE_MENU_LIST.map((menu, index) => (
              <li key={menu.href}>
                <Link
                  href={menu.href}
                  className={`flex items-center gap-2 text-sm duration-200 hover:scale-110 ${
                    pathname === menu.href ? 'font-semibold' : 'text-gray-600'
                  }`}
                >
                  <span className="hidden md:block">
                    <menu.icon size={20} />
                  </span>
                  {menu.name}
                  <p className="pl-3 text-gray-600 transition-transform duration-200 hover:scale-110 md:hidden">
                    {index !== MYPAGE_MENU_LIST.length - 1 && '|'}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default MypageSidebar;
