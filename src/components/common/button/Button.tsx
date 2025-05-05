'use client';

import { btnColorMap, btnSizeMap } from '@/components/common/button/constants';
import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  color?: 'green' | 'red' | 'dark' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg';
};

const Button = ({
  children,
  color = 'green',
  size = 'md',
  type = 'button',
  className = '',
  onClick,
  disabled = false,
  ...props
}: ButtonProps) => {
  const sizeClass = btnSizeMap[size];
  const colorClass = btnColorMap[color];
  const buttonClass = `w-full rounded-2xl transition-colors focus:outline-none ${sizeClass} ${colorClass} ${className}`;

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
