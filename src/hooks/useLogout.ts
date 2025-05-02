'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export const useLogout = () => {
  const router = useRouter();
  const { accessToken, logout } = useAuthStore();

  const logoutHandler = async () => {
    try {
      // 백엔드에 로그아웃 요청
      if (accessToken) {
        await fetch('https://api.mocomoco.store/api/auth/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('서버 로그아웃 실패:', error);
    } finally {
      // 클라이언트 상태 초기화
      logout();

      // 로그인 페이지로 이동
      router.push('/auth/login');
    }
  };

  return logoutHandler;
};
