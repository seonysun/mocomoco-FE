'use client';

import { btnColorMap, btnSizeMap } from '@/components/common/button/constants';
import ButtonProps from '@/components/common/button/types';

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
  const combinedClassName = `w-full rounded-2xl transition-colors focus:outline-none ${sizeClass} ${colorClass} ${className}`;

  return (
    <button
      type={type}
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
