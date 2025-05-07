'use client';

import { useEffect, useRef, useState } from 'react';

type DropdownProps = {
  selected: string;
  onSelect: (value: string) => void;
  placeholder?: string; // string 타입으로 제한
  className?: string;
  categories: string[];
  align?: 'left' | 'center';
};

export default function Dropdown({
  onSelect,
  selected,
  placeholder,
  className = '',
  categories,
  align,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dropMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClose = (e: { target: any }) => {
      // useRef current에 담긴 엘리먼트 바깥(외부)을 클릭 시 드롭다운 메뉴 닫힘
      if (isOpen && !dropMenuRef.current?.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleOutsideClose);

    return () => document.removeEventListener('click', handleOutsideClose);
  }, [isOpen]);

  return (
    <div className="relative w-full" ref={dropMenuRef}>
      <div
        className="flex cursor-pointer items-center justify-between gap-[20px] border-b-[1px] border-main-base py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`w-full font-gmarket text-[15px] text-gray-400 ${
            align === 'center' ? 'text-center' : 'text-left'
          } ${className}`}
        >
          {selected || placeholder || '선택하세요.'}
        </span>
        <span className="text-xl text-main-base">▼</span>
      </div>
      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full rounded-md border border-gray-200 bg-white shadow-md">
          {categories.map((category, index) => (
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
