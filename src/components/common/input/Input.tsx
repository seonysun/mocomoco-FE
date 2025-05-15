'use client';

export type InputType = 'box' | 'textarea' | 'line';

interface BaseProps {
  label?: string;
  placeholder?: string;
  box?: InputType;
  value?: string;
  className?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export type InputProps = BaseProps &
  (
    | (React.InputHTMLAttributes<HTMLInputElement> & { box?: 'box' | 'line' })
    | (React.TextareaHTMLAttributes<HTMLTextAreaElement> & { box: 'textarea' })
  );

// components/CommonInput.tsx
import React from 'react';

// import classNames from 'classnames';

const CommonInput: React.FC<InputProps> = ({
  label,
  box = 'box',
  placeholder,
  value,
  onChange,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col space-y-2 text-gray-800">
      {label && <label className="font-semibold">{label}</label>}

      {box === 'textarea' ? (
        <textarea
          className={`min-h-[120px] w-full resize-none rounded-xl border border-main-base p-3 text-[15px] shadow-sm transition focus:outline-none ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          className={`w-full ${
            box === 'box'
              ? ` ${className} rounded-xl border border-main-base p-3 shadow-sm transition focus:outline-none`
              : `border-b border-main-base bg-transparent py-[10px] outline-none transition-all focus:outline-none`
          }${className}`}
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
