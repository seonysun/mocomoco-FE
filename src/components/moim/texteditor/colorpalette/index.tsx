import React from 'react';
import { Square, SquareSlash } from 'lucide-react';

type ColorPaletteProps = {
  onColorSelect: (color: string | null) => void;
};

const ColorPalette = ({ onColorSelect }: ColorPaletteProps) => {
  const colors = [
    '#CF3F2F',
    '#FF9B36',
    '#FBC114',
    '#98DA5B',
    '#95C9E7',
    '#0E72D5',
    '#151515',
  ];

  return (
    <div className="grid grid-cols-4 items-center gap-2" aria-label="색상 선택">
      <button aria-label="색상없음" onClick={() => onColorSelect(null)}>
        <SquareSlash className="h-5 w-5" />
      </button>
      {colors.map(color => (
        <button
          key={color}
          onClick={() => onColorSelect(color)}
          aria-label={`${color}`}
        >
          <Square className="h-5 w-5" style={{ fill: color }} />
        </button>
      ))}
    </div>
  );
};

export default ColorPalette;
