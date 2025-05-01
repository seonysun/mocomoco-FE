'use client';

import Image from 'next/image';
import naver from '@images/naver.png';
import kakao from '@images/kakao.png';

export default function Login() {
  // kakao
  const CLIENT_ID = process.env.NEXT_PUBLIC_REST_API_KEY;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

  // naver
  const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const NAVER_REDIRECT_URI = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI;
  const STATE = 'MOCOMOCO_LOGIN'; // CSRF 방지용 랜덤 문자열 (필수)

  // 확인용
  // console.log('KAKAO REDIRECT:', process.env.NEXT_PUBLIC_REDIRECT_URI);
  // console.log('NAVER REDIRECT:', process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI);

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
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex w-[700px] flex-col items-center justify-center gap-[50px] rounded-[20px] bg-white p-[100px] drop-shadow-md">
          <h1 className="text-[30px]"> 로그인 </h1>
          <p className="text-[15px]">
            환영합니다 ! , 로그인을 통해 모코모코를 시작해보세요 💚
          </p>
          <div className="flex flex-col items-center justify-center">
            <div className="cursor-pointer" onClick={kakaoLoginHandler}>
              <Image
                src={kakao}
                alt="카카오 로그인"
                className="h-[70px] w-[400px]"
              />
            </div>
            <div className="cursor-pointer" onClick={naverLoginHandler}>
              <Image
                src={naver}
                alt="네이버 로그인"
                className="h-[70px] w-[400px]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
