'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import LoadingSpinner from '../common/loadingSpinner/LoadingSpinner';
import { fetchClient } from '@/api/fetchClient';

export default function KakaoLogin() {
  const { setAuth } = useAuthStore();

  // useRouter : 페이지 이동
  const router = useRouter();

  useEffect(() => {
    const handleKakaoLogin = async (code: string) => {
      try {
        const data = await fetchClient('/api/auth/login/kakao/', 'POST', {
          body: { provider: 'kakao', code },
        });

        if (data.access && data.refresh && data.user) {
          setAuth(data.access, data.refresh, data.user);

          router.push(data.isNewUser ? '/mypage/edit' : '/');
        } else {
          throw new Error('로그인 데이터 형식 오류');
        }
      } catch (error) {
        console.error(error);
        alert('로그인 실패. 다시 시도해주세요.');
        router.push('/auth/login');
      }
    };

    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');

    if (code) {
      handleKakaoLogin(code);
    } else {
      alert('코드가 존재하지 않습니다.');
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
