'use client';

import { IconType, iconMap } from '@/components/common/button/constants';
import { ButtonHTMLAttributes } from 'react';

type FloatProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: string;
  alarm?: boolean;
  icon?: Extract<IconType, 'chat' | 'plus'>;
  handleOpen: () => void;
};

const FloatingButton = ({
  color = 'bg-main-base',
  alarm = false,
  icon = 'chat',
  handleOpen,
}: FloatProps) => {
  const floatClass = `${color} fixed bottom-10 right-10 z-40 rounded-[20px] p-3 hover:brightness-95 hover:translate-y-1 transition`;
  const Icon = iconMap[icon];

  return (
    <>
      <button type="button" className={`${floatClass}`} onClick={handleOpen}>
        {alarm && (
          <span className="absolute right-0 top-0 z-50 size-3 rounded-full bg-red-500" />
        )}
        <Icon color="white" />
      </button>
    </>
  );
};

export default FloatingButton;
