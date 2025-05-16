'use client';

import Image from 'next/image';
import stack_js from '@images/stack_js.svg';
import stack_ts from '@images/stack_ts.png';
import stack_react from '@images/stack_React.png';
import stack_next from '@images/stack_Next.png';
import stack_git from '@images/stack_git.png';
import Logo from '@images/Logo.png';
import Link from 'next/link';
import MyMoimBox from '@components/mypage/MyMoimBox';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

type User = {
  name: string;
  id: number;
  email: string;
  nickname: string;
  phone: string;
  intro: string;
  github_url: string;
  portfolio_url: string;
  position_name: string;
  profile_image: string;
};

export default function Mypage() {
  const router = useRouter();
  const user = useAuthStore(state => state.user);

  const fullImageUrl = user?.profile_image ? user?.profile_image : Logo;

  return (
    <MyMoimBox title={`${user?.nickname} 님의 정보`}>
      {/* 마이페이지 카드 */}
      <button className="absolute right-6 top-6 text-sm text-gray-500 underline hover:text-gray-700">
        <Link href="/mypage/edit">수정</Link>
      </button>
      <div className="mx-auto flex flex-col items-center justify-center gap-[10px] text-center">
        <div className="relative h-[150px] w-[150px]">
          <div className="relative h-full w-full overflow-hidden rounded-full border border-gray-300">
            <Image
              src={fullImageUrl}
              alt="프로필"
              className="mb-3 rounded-full object-cover"
              role="img"
              aria-label="프로필 이미지"
              priority
              fill
              // fill 속성 사용 시 sizes 속성 지정 필수
              sizes="(max-width: 768px) 100vw, 200px"
            />
          </div>
        </div>
        <p className="mb-2 text-xl" aria-label="사용자 이름">
          {user?.nickname}
        </p>
      </div>
      {/* 탭 */}
      <div className="mb-4 flex justify-start gap-2">
        <div className="rounded-lg border bg-white px-4 py-1 font-medium">
          {user?.position_name}
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
            {user?.intro}
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

          <div className="border-b-[1px]"></div>

          <div className="flex flex-col gap-[10px]">
            <p className="mb-2 font-semibold" role="heading" aria-level={3}>
              링크
            </p>
            {user?.github_url && (
              <div>
                <p className="mb-[5px] text-[10px]"> [ GITHUB ] </p>
                <p
                  className="mb-2 break-all rounded-xl border bg-white p-1"
                  aria-label="GitHub 링크"
                >
                  {user?.github_url}
                </p>
              </div>
            )}

            {user?.portfolio_url && (
              <div>
                <p className="mb-[5px] text-[10px]"> [ Portfolio ] </p>
                <p
                  className="break-all rounded-xl border bg-white p-1"
                  aria-label="포트폴리오 링크"
                >
                  {user.portfolio_url}
                </p>
              </div>
            )}

            {!user?.github_url && !user?.portfolio_url && (
              <p className="text-gray-500">링크가 없습니다</p>
            )}
          </div>
        </div>
      </div>
    </MyMoimBox>
  );
}
