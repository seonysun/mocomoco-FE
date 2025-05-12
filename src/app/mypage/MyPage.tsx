'use client';

import Image from 'next/image';
import stack_js from '@images/stack_js.svg';
import stack_ts from '@images/stack_ts.png';
import stack_react from '@images/stack_React.png';
import stack_next from '@images/stack_Next.png';
import stack_git from '@images/stack_git.png';
import Logo from '@images/Logo.png';
import Link from 'next/link';
import user from '@/mockup/user.json';
import MyMoimBox from '@/components/mypage/MyMoimBox';

type User = {
  id: number;
  email: string;
  name: string;
  nickname: string;
  phone: string;
  birthday: string;
  gender: 'male' | 'female';
  address: string;
  intro: string;
  github_url: string;
  portfolio_url: string;
  position_name: string;
};

async function getUser(): Promise<User> {
  const response = await fetch('https://api.mocomoco.store/api/auth/user/');
  const data: User = await response.json();
  return data;
}

export default async function Mypage() {
  // const User = await getUser();

  return (
    <MyMoimBox title={`${user.nickname} 님의 정보`}>
      {/* 마이페이지 카드 */}
      <button className="absolute right-6 top-6 text-sm text-gray-500 underline hover:text-gray-700">
        <Link href="/mypage/edit">수정</Link>
      </button>
      <div className="mx-auto text-center">
        <Image
          src={Logo}
          alt="프로필"
          width={160}
          height={160}
          className="mb-3 rounded-full object-cover"
          role="img"
          aria-label="프로필 이미지"
        />
        <p className="mb-2 text-xl" aria-label="사용자 이름">
          {user.name}
        </p>
      </div>

      {/* 탭 */}
      <div className="mb-4 flex justify-start gap-2">
        <div className="rounded-lg border bg-white px-4 py-1 font-medium">
          {user.position_name}
        </div>
      </div>

      {/* 정보 카드 */}
      <div className="flex w-full flex-col justify-between gap-6 lg:flex-row">
        {/* 자기소개 */}
        <div
          className="flex w-full flex-col gap-2 rounded-2xl bg-[#F6FBEF] p-4"
          role="region"
          aria-label="자기소개"
        >
          <div className="font-semibold" role="heading" aria-level={3}>
            자기소개
          </div>
          <div
            className="text-sm text-gray-500"
            role="text"
            aria-label="자기소개 내용"
          >
            {user.intro}
          </div>
        </div>

        {/* 스택 및 링크 */}
        <div
          className="flex w-full flex-col gap-6 rounded-2xl bg-[#F6FBEF] p-4"
          role="region"
          aria-label="스택 및 링크"
        >
          <div>
            <div className="mb-2 font-semibold" role="heading" aria-level={3}>
              사용 가능 스택
            </div>
            <nav className="flex gap-2" role="list" aria-label="스택 목록">
              <li className="list-none">
                <Image
                  src={stack_js}
                  alt="js"
                  className="h-9 w-9"
                  role="img"
                  aria-label="JavaScript"
                />
              </li>
              <li className="list-none">
                <Image
                  src={stack_ts}
                  alt="ts"
                  className="h-9 w-9"
                  role="img"
                  aria-label="TypeScript"
                />
              </li>
              <li className="list-none">
                <Image
                  src={stack_react}
                  alt="react"
                  className="h-9 w-9"
                  role="img"
                  aria-label="React"
                />
              </li>
              <li className="list-none">
                <Image
                  src={stack_next}
                  alt="next"
                  className="h-9 w-9"
                  role="img"
                  aria-label="Next.js"
                />
              </li>
              <li className="list-none">
                <Image
                  src={stack_git}
                  alt="git"
                  className="h-9 w-9"
                  role="img"
                  aria-label="Git"
                />
              </li>
            </nav>
          </div>

          <div>
            <p className="mb-2 font-semibold" role="heading" aria-level={3}>
              링크
            </p>
            <p
              className="mb-2 break-all rounded-xl border bg-white p-1"
              aria-label="GitHub 링크"
            >
              {user.github_url}
            </p>
            <p
              className="break-all rounded-xl border bg-white p-1"
              aria-label="포트폴리오 링크"
            >
              {user.portfolio_url}
            </p>
          </div>
        </div>
      </div>
    </MyMoimBox>
  );
}
