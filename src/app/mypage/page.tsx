import Image from 'next/image';
import stack_js from '@images/stack_js.svg';
import stack_ts from '@images/stack_ts.png';
import stack_react from '@images/stack_React.png';
import stack_next from '@images/stack_Next.png';
import stack_git from '@images/stack_git.png';
import Logo from '@images/Logo.png';
import userProfile from '@/mockup/user.json';

type UserProfile = {
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
};

async function getUserProfile(): Promise<UserProfile> {
  const response = await fetch('http://localhost:3000/api/mypage');
  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }
  return response.json();
}

export default async function Mypage() {
  // const userProfile = await getUserProfile();

  return (
    <div aria-label="마이페이지" className="h-full">
      {/* 마이페이지 카드 */}
      <div className="flex items-center justify-center">
        <section
          className="flex min-h-[500px] min-w-[700px] flex-col items-center rounded-2xl bg-[#E1F0D3] p-12 shadow-sm"
          aria-label="사용자 정보"
        >
          <button className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
            수정
          </button>
          <h2 className="mb-6 text-2xl font-semibold" aria-level={2}>
            {userProfile.nickname} 님의 정보
          </h2>
          <Image
            src={Logo}
            alt="프로필"
            width={160}
            height={160}
            className="mb-3 rounded-full object-cover"
            role="img"
            aria-label="프로필 이미지"
          />
          <div className="mb-2 text-xl" role="text" aria-label="사용자 이름">
            {userProfile.name}
          </div>
          {/* 탭 */}
          <div className="mb-6 flex w-full justify-start gap-2">
            <div className="rounded-lg border bg-white px-4 py-1 font-medium">
              프론트엔드
            </div>
            <div className="rounded-lg border bg-white px-4 py-1 font-medium">
              디자이너
            </div>
          </div>
          {/* 정보 카드 */}
          <div className="flex w-full justify-between gap-6">
            {/* 자기소개 */}
            <div
              className="flex min-h-[160px] min-w-[310px] flex-col rounded-[20px] border bg-[#F6FBEF] p-4"
              role="region"
              aria-label="자기소개"
            >
              <div className="mb-2 font-semibold" role="heading" aria-level={3}>
                자기소개
              </div>
              <div
                className="text-sm text-gray-500"
                role="text"
                aria-label="자기소개 내용"
              >
                {userProfile.intro}
              </div>
            </div>
            {/* 스택 및 링크 */}
            <div
              className="flex flex-col gap-3 rounded-[20px] border bg-[#F6FBEF]"
              role="region"
              aria-label="스택 및 링크"
            >
              <div className="min-h-[80px] min-w-[220px] rounded-lg p-4">
                <div className="mb-2" role="heading" aria-level={3}>
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
              <div className="min-w-[220px] rounded-lg p-4">
                <div className="mb-2" role="heading" aria-level={3}>
                  링크
                </div>
                <input
                  type="text"
                  value={userProfile.github_url}
                  readOnly
                  className="w-full rounded-md border bg-white p-1"
                  role="textbox"
                  aria-label="GitHub 링크"
                />
                <input
                  type="text"
                  value={userProfile.portfolio_url}
                  readOnly
                  className="mt-2 w-full rounded-md border bg-white p-1"
                  role="textbox"
                  aria-label="포트폴리오 링크"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
