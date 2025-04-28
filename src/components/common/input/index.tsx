'use client';

// components/CommonInput.tsx
import React from 'react';
import { InputProps } from '@/components/common/input/types';
// import classNames from 'classnames';

const CommonInput: React.FC<InputProps> = ({
  label,
  box = 'box',
  placeholder,
  value,
  onChange,
  ...props
}) => {
  return (
    <div className="flex flex-col space-y-2 text-gray-800">
      {label && <label className="font-semibold">{label}</label>}

      {box === 'textarea' ? (
        <textarea
          className="min-h-[120px] w-full resize-none rounded-xl border border-main-base p-3 shadow-sm transition focus:outline-none"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          className={`w-full ${
            box === 'box'
              ? 'rounded-xl border border-main-base p-3 shadow-sm transition focus:outline-none'
              : 'border-b border-main-base bg-transparent transition-all focus:outline-none'
          }`}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </div>
  );
};

export default CommonInput;
