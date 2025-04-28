'use client';

import Image from 'next/image';
import naver from '@images/naver.png';
import kakao from '@images/kakao.png';

export default function Login() {
  return (
    <>
      <div className="mt-[88px] flex flex-col items-center justify-center gap-[50px] bg-white p-[100px]">
        <div className="mb-[20px] flex flex-col items-center justify-center gap-[20px] text-center">
          <h1 className="text-[30px]"> 로그인 </h1>
          <p className="text-[15px]">
            환영합니다! 로그인을 통해 모코모코를 시작해보세요 💚
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="cursor-pointer">
            <Image
              src={kakao}
              alt="카카오 로그인"
              className="h-[70px] w-[300px]"
            />
          </div>
          <div className="cursor-pointer">
            <Image
              src={naver}
              alt="네이버 로그인"
              className="h-[70px] w-[300px]"
            />
          </div>
        </div>
      </div>
    </>
  );
}
