import { create } from 'zustand';

interface User {
  id: number;
  email: string;
  nickname: string;
  name?: string;
  profile_image?: string;
  position?: number;
  position_name?: string;
}

interface UserState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isLoggedIn: boolean;
  setAuth: (accessToken: string, refreshToken: string, user: User) => void;
  // 따로 props 받아올 값 없이 호출만 하면 됨
  logout: () => void;
}

// create()	상태 스토어를 생성하는 함수
// set()	상태를 변경하는 함수
export const useAuthStore = create<UserState>(set => ({
  // [ 초기 값 ]
  accessToken: null,
  refreshToken: null,
  user: null,
  isLoggedIn: false,

  setAuth: (accessToken, refreshToken, user) =>
    set({
      accessToken,
      refreshToken,
      user,
      isLoggedIn: true,
    }),

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    set({
      accessToken: null,
      refreshToken: null,
      user: null,
      isLoggedIn: false,
    });
  },
}));
