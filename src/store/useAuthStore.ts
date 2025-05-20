import { fetchClient } from '@/api/fetchClient';
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
  github_url?: string;
  intro?: string;
  portfolio_url?: string;
}

interface UserState {
  access: string | null;
  refresh: string | null;
  user: User | null;
  isLoggedIn: boolean;
  hydrated: boolean;
  setAuth: (access: string, refresh: string, user: User) => void;
  // 따로 props 받아올 값 없이 호출만 하면 됨
  logout: () => void;
  updateUser: (user: User) => void;
  fetchUser: () => Promise<void>;
  setToken: (access: string) => void;
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

      setAuth: (access, refresh, user) => {
        document.cookie = `access_token=${access}; path=/;`;

        set({
          access,
          refresh,
          user,
          isLoggedIn: true,
        });
      },

      setToken: access => {
        document.cookie = `access_token=${access}; path=/;`;

        set({
          access,
        });
      },

      logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        document.cookie = 'access_token=; path=/; max-age=0';

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
      fetchUser: async () => {
        try {
          const data = await fetchClient('/api/user/info/', 'GET', {
            isAuth: true,
          });
          set(state => ({ ...state, user: data }));
        } catch (error) {
          console.error('유저 정보 가져오기 실패:', error);
        }
      },
    }),
    {
      name: 'auth-storage', // localStorage에 저장될 key 이름
      onRehydrateStorage: () => {
        return state => {
          if (state?.hydrated !== undefined) {
            // set은 여기서도 사용할 수 있게 클로저로 캡처되어 있음
            state.hydrated = true;
          }
        };
      },
    },
  ),
);
