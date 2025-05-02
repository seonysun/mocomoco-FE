import { Bell, CircleUserRound, Menu } from 'lucide-react';

export const CATEGORY_LIST = [
  '프론트엔드(FE)',
  '백엔드(BE)',
  '풀스택',
  '디자이너',
] as const;

export const HEADER_NAV_LIST = [
  { name: '알림', src: Bell, to: '' },
  { name: '내정보', src: CircleUserRound, to: 'mypage' },
];
