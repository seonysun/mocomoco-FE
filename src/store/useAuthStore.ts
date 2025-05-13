import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  access: string | null;
  refresh: string | null;
  user: User | null;
  isLoggedIn: boolean;
  setAuth: (access: string, refresh: string, user: User) => void;
  // 따로 props 받아올 값 없이 호출만 하면 됨
  logout: () => void;
  updateUser: (user: User) => void;
}

// create()	상태 스토어를 생성하는 함수
// set()	상태를 변경하는 함수
export const useAuthStore = create<UserState>()(
  persist(
    set => ({
      // [ 초기 값 ]
      access: null,
      refresh: null,
      user: null,
      isLoggedIn: false,
      hydrated: false,

      setAuth: (access, refresh, user) =>
        set({
          access,
          refresh,
          user,
          isLoggedIn: true,
        }),

      logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        set({
          access: null,
          refresh: null,
          user: null,
          isLoggedIn: false,
        });
      },
      updateUser: user =>
        set(state => ({
          ...state,
          user,
        })),
    }),
    {
      name: 'auth-storage', // localStorage에 저장될 key 이름
    },
  ),
);
