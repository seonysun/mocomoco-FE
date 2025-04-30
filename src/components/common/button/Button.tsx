'use client';

import { btnColorMap, btnSizeMap } from '@/components/common/button/constants';
import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: 'green' | 'red' | 'dark' | 'outline';
  size?: 'sm' | 'md' | 'lg';
};

const Button: React.FC<ButtonProps> = ({
  children,
  color = 'green',
  size = 'md',
  type = 'button',
  className = '',
  onClick,
  disabled = false,
  ...props
}) => {
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
