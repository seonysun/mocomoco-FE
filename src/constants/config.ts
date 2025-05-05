import { Plus, Search, UsersRound } from 'lucide-react';

export const CATEGORY_LIST = [
  '프론트엔드(FE)',
  '백엔드(BE)',
  '풀스택',
  '디자이너',
] as const;

export const MENU_NOTI_LIST = [
  { key: 'chat', label: '채팅' },
  { key: 'join', label: '모임 참여' },
  { key: 'schedule', label: '모임 일정' },
] as const;

export const MENU_MOGAK_LIST = [
  { label: '모각코 찾기', icon: Search, to: 'moimlist' },
  { label: '새로운 모임', icon: Plus, to: '' },
  { label: '참여한 모임', icon: UsersRound, to: '' },
] as const;
