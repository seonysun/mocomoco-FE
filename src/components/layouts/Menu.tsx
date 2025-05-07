'use client';

import ToggleButton from '@/components/common/button/ToggleButton';
import { MENU_MOGAK_LIST, MENU_NOTI_LIST } from '@/constants/config';
import { useNotificationStore } from '@/store/useNotificationStore';
import { BellRing, UsersRound } from 'lucide-react';
import Link from 'next/link';

type MenuProps = {
  onClose: () => void;
};

const Menu = ({ onClose }: MenuProps) => {
  const { values, setValue } = useNotificationStore();

  return (
    <>
      <p className="text-main-dark">MENU</p>
      <section className="my-2 rounded-xl border border-main-base p-4">
        <div className="mb-2 flex items-center gap-2 text-gray-500">
          <BellRing size={20} />
          <span className="text-sm font-semibold">알림 설정</span>
        </div>
        <ul className="mt-2 space-y-1 text-main-dark">
          {MENU_NOTI_LIST.map(item => (
            <li
              key={item.key}
              className="flex items-center justify-between text-sm"
            >
              <span>{item.label}</span>
              <ToggleButton
                color="bg-main-dark"
                isOn={values[item.key]}
                handleToggle={next => setValue(item.key, next)}
              />
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-xl border border-main-base p-4">
        <div className="mb-2 flex items-center gap-2 text-gray-500">
          <UsersRound size={20} />
          <span className="text-sm font-semibold">모각코 메뉴</span>
        </div>
        <ul className="mt-2 space-y-1 text-main-dark">
          {MENU_MOGAK_LIST.map(item => (
            <li
              key={item.label}
              className="flex items-center justify-between text-sm"
            >
              <span>{item.label}</span>
              <Link href={item.href}>
                <button
                  onClick={onClose}
                  className="flex items-center justify-center rounded bg-main-dark px-2 py-1 text-white"
                >
                  <item.icon size={16} />
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Menu;
