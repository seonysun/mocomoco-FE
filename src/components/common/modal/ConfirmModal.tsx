'use client';

import Button from '@/components/common/button/Button';
import CommonInput from '@/components/common/input/Input';

type ConfirmProps = {
  title?: string;
  content?: string;
  input?: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  className?: string;
};

const ConfirmModal = ({
  title = '모임을 나가시겠습니까?',
  content,
  input = false,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  className,
}: ConfirmProps) => {
  return (
    <div
      className={`w-[320px] rounded-xl border border-main-medium bg-white p-4 ${className}`}
    >
      <p className="mb-1 text-center text-lg">{title}</p>
      {content && (
        <p className="text-center text-sm text-gray-400">{content}</p>
      )}
      {input && <CommonInput box="textarea" />}
      <div className="mt-3 flex w-full justify-center gap-2">
        <Button color="outline" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button onClick={onConfirm}>{confirmText}</Button>
      </div>
    </div>
  );
};

export default ConfirmModal;
