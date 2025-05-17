'use client';

import { iconMap } from '@/components/common/button/constants';

type FavProps = {
  color?: string;
  size?: number;
  type?: 'heart' | 'star';
  isOn?: boolean;
  onToggle?: () => void;
};

const FavoriteButton = ({
  color = 'red',
  size = 24,
  type = 'heart',
  isOn = false,
  onToggle,
}: FavProps) => {
  const Icon = iconMap[type];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onToggle?.();
  };

  return (
    <button type="button" aria-label="Favorite Button" onClick={handleClick}>
      <Icon fill={isOn ? color : 'none'} stroke={color} size={size} />
    </button>
  );
};

export default FavoriteButton;
