'use client';

import useClickOutside from '@/hooks/useClickOutside';
import { modalStyleMap } from '@/components/common/modal/constants';
import { CircleX } from 'lucide-react';
import { useRef } from 'react';

type ModalProps = {
  children: React.ReactNode;
  variation?: 'chat' | 'menu';
  onClose: () => void;
};

const Modal = ({ children, variation = 'chat', onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  const modalSize = modalStyleMap[variation].size;
  const modalPosition = modalStyleMap[variation].position;
  const modalClass = `fixed ${modalSize} ${modalPosition} z-30 flex flex-col justify-between rounded-3xl bg-main-medium p-5 shadow-xl transition-all duration-300 ease-out`;

  return (
    <div ref={modalRef} className={modalClass} aria-label="modal">
      <CircleX
        stroke="gray"
        className="absolute right-4 top-5 cursor-pointer"
        onClick={onClose}
      />
      {children}
    </div>
  );
};

export default Modal;
