'use client';
import Button from '@/components/common/button/Button';
import React, { useState } from 'react';

interface ConfirmModalProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  children?: React.ReactNode;
}

const DetailPageModal = ({
  title,
  onConfirm,
  onCancel,
  confirmText = '확인',
  cancelText = '취소',
  children,
}: ConfirmModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-[320px] rounded-xl border border-main-medium bg-white p-4">
        <h1 className="mb-3 text-center text-lg">{title}</h1>
        {children && <div className="text-center text-sm">{children}</div>}
        <div className="flex justify-end gap-2 pt-4">
          <Button className="w-1/2" color="outline" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button className="w-1/2" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailPageModal;
