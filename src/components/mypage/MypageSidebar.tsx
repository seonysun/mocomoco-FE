'use client';

import { MYPAGE_MENU_LIST } from '@/constants/config';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MypageSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[200px] rounded-xl border border-main-default p-5 pb-8">
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
  );
};

export default MypageSidebar;
