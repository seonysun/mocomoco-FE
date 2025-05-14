import { Calendar, Plus, Search, Star, User, UsersRound } from 'lucide-react';

export const ROLE_LIST = [
  '프론트엔드',
  '백엔드',
  '풀스택',
  '디자이너',
] as const;

export const MENU_NOTI_LIST = [
  { key: 'chat', label: '채팅' },
  { key: 'join', label: '모임 참여' },
  { key: 'schedule', label: '모임 일정' },
] as const;

export const MENU_MOGAK_LIST = [
  { label: '모각코 찾기', icon: Search, href: '/moims' },
  { label: '새로운 모임', icon: Plus, href: '/moims/post' },
  { label: '참여한 모임', icon: UsersRound, href: '/join' },
] as const;

export const MYPAGE_MENU_LIST = [
  { name: '내 정보', icon: User, href: '/mypage' },
  { name: '관심 모임', icon: Star, href: '/mypage/likelist' },
  { name: '일정 관리', icon: Calendar, href: '/mypage/schedule' },
] as const;

export const MOIM_CATEGORY = ['프로젝트', '모각코'];

export const YEAR_LIST = ['2025', '2026', '2027'];

export const MONTH_LIST = Array.from({ length: 12 }, (_, i) => String(i + 1));

export const DAY_LIST = Array.from({ length: 31 }, (_, i) => String(i + 1));

export const MOIM_LIST = ['모각코', '프로젝트'];
