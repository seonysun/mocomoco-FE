'use client';

import { ButtonHTMLAttributes } from 'react';

type ToggleProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: string;
  isOn: boolean;
  handleToggle: (next: boolean) => void;
};

const ToggleButton = ({
  color = 'bg-main-default',
  isOn,
  handleToggle,
  ...props
}: ToggleProps) => {
  const toggleClass =
    'relative flex h-4 w-8 items-center rounded-full transition-all duration-300';
  const switchClass =
    'absolute size-3 rounded-full bg-white shadow-md transition-all duration-300';

  return (
    <button
      type="button"
      aria-label="Toggle Switch"
      onClick={() => handleToggle(!isOn)}
      className={`${toggleClass} ${isOn ? color : 'bg-gray-300'}`}
      {...props}
    >
      <div
        className={`${switchClass} ${isOn ? 'translate-x-4' : 'translate-x-0.5'}`}
      />
    </button>
  );
};

export default ToggleButton;
