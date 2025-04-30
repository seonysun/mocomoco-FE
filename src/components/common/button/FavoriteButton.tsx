'use client';

import { useState } from 'react';
import { iconMap } from '@/components/common/button/constants';

type FavProps = {
  color?: string;
  size?: number;
  type?: 'heart' | 'star';
  isOn?: boolean;
  onToggle?: () => void;
};

const FavoriteButton: React.FC<FavProps> = ({
  color = 'red',
  size = 24,
  type = 'heart',
  isOn = false,
  onToggle,
}) => {
  const [active, setActive] = useState(isOn);
  const Icon = iconMap[type];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setActive(!active);
    onToggle?.();
  };

  return (
    <button type="button" aria-label="Favorite Button" onClick={handleClick}>
      <Icon fill={active ? color : 'none'} stroke={color} size={size} />
    </button>
  );
};

export default FavoriteButton;
