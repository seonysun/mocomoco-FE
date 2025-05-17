'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import stack_js from '@images/stack_js.svg';
import stack_ts from '@images/stack_ts.png';
import stack_react from '@images/stack_React.png';
import stack_next from '@images/stack_Next.png';
import stack_git from '@images/stack_git.png';
import Logo from '@images/Logo.png';
import MyMoimBox from '@components/mypage/MyMoimBox';
import { fetchClient } from '@api/fetchClient';
import { MessageCircle } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { chatOption } from '@/api/options/chatOption';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

type User = {
  id: number;
  name: string;
  nickname: string;
  intro: string;
  github_url: string;
  portfolio_url: string;
  position: number;
  position_name: string;
  profile_image: string;
};

interface Props {
  params: {
    userId: string;
  };
}

export default function MoimMemberCard({ params }: Props) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuthStore();

  const userId = Number(params.userId);

  const postJoinMutation = useMutation(chatOption.joinChat());

  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      router.replace('/login');
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const res = await fetchClient(
          `/api/auth/users/${userId}/profile/`,
          'GET',
          { isAuth: true }, // 공개된 프로필이라면 false, 아니라면 true
        );
        setUser(res);
      } catch (err) {
        console.error('프로필 정보를 불러오지 못했습니다.', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (!user) return <div> 프로필 정보를 표시할 수 없습니다. </div>;

  const fullImageUrl = user?.profile_image || Logo;

  return (
    <div className="mx-auto w-full max-w-screen-md px-4">
      <MyMoimBox title={`${user?.nickname} 님의 정보`}>
        <div className="mx-auto flex flex-col items-center justify-center gap-[10px] text-center">
          <div className="relative h-[150px] w-[150px]">
            <div className="relative h-full w-full overflow-hidden rounded-full border border-gray-300">
              <Image
                src={fullImageUrl}
                alt="프로필"
                className="mb-3 rounded-full object-cover"
                role="img"
                aria-label="프로필 이미지"
                fill
                sizes="(max-width: 768px) 100vw, 200px"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <p className="mb-2 text-xl">{user?.nickname}</p>
            <MessageCircle
              size={16}
              color="gray"
              className="cursor-pointer"
              onClick={() => postJoinMutation.mutate(user.id)}
            />
          </div>
        </div>

        <div className="mb-4 flex justify-start gap-2">
          <div
            className={
              user?.position_name
                ? 'rounded-lg border bg-white px-4 py-1 font-medium'
                : 'rounded-lg border bg-white px-4 py-1 font-medium text-gray-400'
            }
          >
            {user?.position_name ?? '분야 미선택'}
          </div>
        </div>

        <div className="flex w-full flex-col justify-between gap-6 lg:flex-row">
          <div className="flex w-full flex-col gap-2 rounded-2xl bg-[#F6FBEF] p-4">
            <div className="font-semibold">자기소개</div>
            <div className="text-sm text-gray-500">{user?.intro}</div>
          </div>

          <div className="flex w-full flex-col gap-6 rounded-2xl bg-[#F6FBEF] p-4">
            <div>
              <div className="mb-2 font-semibold">사용 가능 스택</div>
              <nav className="flex gap-2">
                {[stack_js, stack_ts, stack_react, stack_next, stack_git].map(
                  (icon, idx) => (
                    <li className="list-none" key={idx}>
                      <Image src={icon} alt="stack" className="h-9 w-9" />
                    </li>
                  ),
                )}
              </nav>
            </div>

            <div className="border-b-[1px]"></div>

            <div className="flex flex-col gap-[10px]">
              <p className="mb-2 font-semibold">링크</p>
              {user?.github_url && (
                <div>
                  <p className="mb-[5px] text-[10px]"> [ GITHUB ] </p>
                  <p className="mb-2 break-all rounded-xl border bg-white p-1">
                    {user.github_url}
                  </p>
                </div>
              )}
              {user?.portfolio_url && (
                <div>
                  <p className="mb-[5px] text-[10px]"> [ Portfolio ] </p>
                  <p className="break-all rounded-xl border bg-white p-1">
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
    </div>
  );
}
