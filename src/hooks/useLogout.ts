'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export const useLogout = () => {
  const router = useRouter();
  const { access, logout } = useAuthStore();

  const logoutHandler = async () => {
    try {
      // 백엔드 서버에 로그아웃 요청
      if (access) {
        await fetch('https://api.mocomoco.store/api/auth/logout/', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${access}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('서버 로그아웃 실패:', error);
    } finally {
      // 클라이언트 전역 상태 초기화
      logout();

      // 로그인 페이지로 이동
      router.push('/auth/login');
    }
  };

  return logoutHandler;
};
