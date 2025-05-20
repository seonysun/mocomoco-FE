'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { strict } from 'assert';
import { useAuthStore } from '@/store/useAuthStore';
import LoadingSpinner from '../common/loadingSpinner/LoadingSpinner';
import { fetchClient } from '@/api/fetchClient';

export default function NaverLogin() {
  const { setAuth } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    const handleNaverLogin = async (code: string, state: string) => {
      try {
        const data = await fetchClient('/api/auth/login/naver/', 'POST', {
          body: { provider: 'naver', code, state }, // 네이버는 state 포함
        });

        if (data.access && data.refresh && data.user) {
          setAuth(data.access, data.refresh, data.user);

          if (data.isNewUser) {
            // alert(
            //   `${data.user.nickname}님, 환영합니다 💚 \n정보 수정란에 포지션 선택은 필수입니다.`,
            // );
            router.push('/mypage/edit?from=new');
          } else {
            router.push('/');
          }
        } else {
          throw new Error('로그인 데이터 형식 오류');
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
