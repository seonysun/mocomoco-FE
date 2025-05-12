import { HeartIcon, MessageCircle, Plus, StarIcon } from 'lucide-react';

export const btnSizeMap = {
  xs: 'py-1 px-2 text-xs',
  sm: 'py-1 px-3 text-sm',
  md: 'py-2 px-3',
  lg: 'py-2 px-3 text-lg',
  xl: 'py-4 px-6 text-xl',
} as const;

export const btnColorMap = {
  green: 'bg-green-default text-white hover:bg-green-hover',
  red: 'bg-red-default text-white hover:bg-red-hover',
  dark: 'bg-main-header text-white',
  outline: 'border border-black text-black hover:bg-gray-100',
} as const;

export const iconMap = {
  heart: HeartIcon,
  star: StarIcon,
  chat: MessageCircle,
  plus: Plus,
} as const;

export type IconType = keyof typeof iconMap;
