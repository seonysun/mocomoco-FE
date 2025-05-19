'use client';

import Button from '@/components/common/button/Button';
import CommonInput from '@/components/common/input/Input';
import useClickOutside from '@/hooks/useClickOutside';
import { useModalStore } from '@/store/useModalStore';
import { useRef } from 'react';

type ConfirmProps = {
  title?: string;
  content?: string;
  input?: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: (id: number) => void;
  className?: string;
  children?: React.ReactNode;
};

const ConfirmModal = ({
  title = '모임을 나가시겠습니까?',
  content,
  input = false,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  className,
  children,
}: ConfirmProps) => {
  const id = useModalStore(state => state.modalData.id);
  const close = useModalStore(state => state.close);

  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, close);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div
        ref={modalRef}
        className={`w-[320px] rounded-xl border border-main-medium bg-white p-4 ${className}`}
      >
        <p className="mb-1 text-center text-lg">{title}</p>
        {content && (
          <p className="text-center text-sm text-gray-400">{content}</p>
        )}
        {input && <CommonInput box="textarea" />}
        {children && <div className="text-center text-sm">{children}</div>}
        <div className="mt-3 flex w-full justify-center gap-2">
          <Button color="outline" onClick={close} className="w-1/2">
            {cancelText}
          </Button>
          <Button
            onClick={() => {
              if (typeof id === 'number') onConfirm?.(id);
            }}
            className="w-1/2"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
