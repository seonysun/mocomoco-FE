'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { fetchClient } from '@api/fetchClient';

export const useLogout = () => {
  const router = useRouter();
  const { access, logout, refresh } = useAuthStore();

  const logoutHandler = async () => {
    try {
      await fetch('https://api.mocomoco.store/api/auth/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({ refresh_token: refresh }),
      });
    } catch (error) {
      console.error('서버 로그아웃 실패:', error);
    } finally {
      logout();
      router.push('/auth/login');
    }
  };

  return logoutHandler;
};
