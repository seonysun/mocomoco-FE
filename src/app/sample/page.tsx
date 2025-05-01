'use client';

import { useState } from 'react';
import Button from '@/components/common/button/Button';
import FavoriteButton from '@/components/common/button/FavoriteButton';
import ToggleButton from '@/components/common/button/ToggleButton';

export default function HomePage() {
  const [isOn, setIsOn] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="p-6">
      <ToggleButton isOn={isOn} handleToggle={next => setIsOn(next)} />

      <Button>버튼</Button>

      <FavoriteButton isOn={isLiked} />
      <FavoriteButton isOn={isLiked} type="star" color="green" />
    </div>
  );
}
