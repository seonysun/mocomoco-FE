'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export default function KakaoCallback() {
  // useRouter : 페이지 이동
  const router = useRouter();

  useEffect(() => {
    const handleKakaoLogin = async (code: string) => {
      try {
        const response = await fetch(
          'http://localhost:8000/accounts/kakao/callback/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              provider: 'kakao',
              code: code,
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
          useAuthStore.getState().setAuth(data.access, data.refresh, data.user);
        }

        // 유저 상태에 따라 분기 처리 : Record< 키, 값 > 타입 지정
        const routeMap: Record<string, string> = {
          false: '/',
          true: '/users/me',
        };

        // data.isNewUser 이 값은 boolean 값이지만, 위에 string으로 타입 정의 해주었기 떄문에 통일
        router.push(routeMap[String(data.isNewUser)]);
      } catch (error) {
        console.error(error);
        alert('로그인 실패. 다시 시도해주세요.');
        router.push('/auth/login'); // 실패 시 alert창 띄우고, 로그인 페이지로 다시
      }
    };

    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    // console.log('CODE:', code);

    if (code) {
      handleKakaoLogin(code);
    } else {
      alert('코드가 존재하지 않습니다.');
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-[20px]">카카오 로그인 처리 중입니다...</p>
    </div>
  );
}
