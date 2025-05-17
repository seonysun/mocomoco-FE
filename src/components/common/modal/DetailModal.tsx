'use client';

import useClickOutside from '@/hooks/useClickOutside';
import { useModalStore } from '@/store/useModalStore';
import { useRef } from 'react';

type Props = {
  children: React.ReactNode;
  title: string;
  className?: string;
};

const DetailModal = ({ children, title, className }: Props) => {
  const close = useModalStore().close;

  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, close);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div
        ref={modalRef}
        className={`w-[300px] rounded-xl border border-main-medium bg-white p-4 ${className}`}
      >
        <p className="mb-3 text-center text-lg font-semibold">{title}</p>
        {children}
      </div>
    </div>
  );
};

export default DetailModal;
