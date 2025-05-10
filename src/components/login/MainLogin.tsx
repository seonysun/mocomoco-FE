'use client';

import Image from 'next/image';
import naver from '@images/naver.png';
import kakao from '@images/kakao.png';

export default function LoginPage() {
  // kakao
  const CLIENT_ID = process.env.NEXT_PUBLIC_REST_API_KEY;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  // naver
  const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const NAVER_REDIRECT_URI = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI;
  const STATE = process.env.NEXT_PUBLIC_STATE; // CSRF 방지용 랜덤 문자열 (필수)

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${STATE}`;

  // [ kakaoURL ] : 브라우저 URL이 kakaoURL로 이동
  const kakaoLoginHandler = () => {
    window.location.href = kakaoURL;
  };

  // [ naverURL ] : 브라우저 URL이 naverURL로 이동
  const naverLoginHandler = () => {
    window.location.href = naverURL;
  };

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center px-6">
        <div className="flex min-h-[300px] w-full max-w-[700px] flex-col items-center justify-center gap-8 rounded-2xl bg-white p-6 drop-shadow-md md:min-h-[500px]">
          <h1 className="text-2xl font-semibold sm:text-3xl"> 로그인 </h1>
          <p className="text-center text-sm sm:text-base">
            환영합니다 ! 로그인을 통해 모코모코를 시작해보세요 💚
          </p>
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <div
              className="w-full max-w-[400px] cursor-pointer"
              onClick={kakaoLoginHandler}
            >
              <Image
                src={kakao}
                alt="카카오 로그인"
                className="h-auto w-full"
              />
            </div>
            <div
              className="w-full max-w-[400px] cursor-pointer"
              onClick={naverLoginHandler}
            >
              <Image
                src={naver}
                alt="네이버 로그인"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
