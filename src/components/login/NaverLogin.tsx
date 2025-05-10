'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { strict } from 'assert';
import { useAuthStore } from '@/store/useAuthStore';
import LoadingSpinner from '../common/loadingSpinner/LoadingSpinner';

export default function NaverLogin() {
  const { setAuth } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    const handleNaverLogin = async (code: string, state: string) => {
      try {
        const response = await fetch(
          'https://api.mocomoco.store/api/auth/login/naver/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              provider: 'naver',
              code: code,
              state: state, // 네이버는 state 포함
            }),
          },
        );

        if (!response.ok) {
          throw new Error('로그인 실패');
        }

        const data = await response.json();

        if (data.access && data.refresh && data.user) {
          localStorage.setItem('access_token', data.access);
          localStorage.setItem('refresh_token', data.refresh);

          setAuth(data.access, data.refresh, data.user);
        }

        if (data.isNewUser) {
          router.push('/mypage/edit');
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error(error);
        alert('로그인 실패. 다시 시도해주세요.');
        router.push('/auth/login'); // 실패 시 alert창 띄우고, 로그인 페이지로 다시
      }
    };

    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (code && state) {
      handleNaverLogin(code, state);
    } else {
      alert('필수 값이 없습니다.');
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
