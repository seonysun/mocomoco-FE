'use client';

import { CATEGORY_LIST } from '@/constants/config';
import { useState } from 'react';

type DropdownProps = {
  selected: string;
  onSelect: (value: string) => void;
  placeholder: string; // string 타입으로 제한
};

export default function Dropdown({
  onSelect,
  selected,
  placeholder,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <div
        className="flex cursor-pointer items-center justify-between gap-[20px] border-b-[2px] border-main-base py-2"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className="font-gmarket text-[15px] font-light text-gray-400">
          {selected || placeholder || '선택하세요.'}
        </span>
        <span className="text-xl text-main-base">▼</span>
      </div>
      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full rounded-md border border-gray-200 bg-white shadow-md">
          {CATEGORY_LIST.map((category, index) => (
            <li
              key={index}
              className="cursor-pointer px-4 py-2 hover:bg-green-100"
              onClick={() => {
                onSelect(category);
                setIsOpen(false);
              }}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
