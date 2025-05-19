'use client';

import Image from 'next/image';
import UserProfile from '@images/UserProfile.png';
import FavoriteButton from '@/components/common/button/FavoriteButton';
import { Settings, Users } from 'lucide-react';
import Button from '@/components/common/button/Button';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/store/useModalStore';
import { MyMoim } from '@/types/mymoim';
import { useState } from 'react';
import { useDislikeMoim, useLikeMoim } from '@/api/hooks/useMoims';
import { useQueryClient } from '@tanstack/react-query';

type MoimProps = {
  moim: MyMoim;
};

const MyMoimCard = ({ moim }: MoimProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isLikelist = pathname.startsWith('/mypage/likelist');

  const open = useModalStore(state => state.open);

  const [isLiked, setIsLiked] = useState(moim.is_liked);
  const likeMoim = useLikeMoim(moim.id);
  const disLikeMoim = useDislikeMoim(moim.id);
  const queryClient = useQueryClient();
  const handleToggleLike = () => {
    const next = !isLiked;
    setIsLiked(next);

    const mutation = next ? likeMoim : disLikeMoim;
    const rollback = () => setIsLiked(!next);

    mutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['mymoim', 'liked'] });
      },
      onError: rollback,
    });
  };

  return (
    <>
      <div className="flex w-full items-center justify-between gap-2 rounded-xl border border-main-base bg-[#FFFCFC] p-3 hover:brightness-110">
        <span className="w-16">
          {moim.is_closed ? (
            <Button size="xs" color="red" className="w-full cursor-default">
              모집완료
            </Button>
          ) : (
            <Button size="xs" className="w-full cursor-default">
              모집중
            </Button>
          )}
        </span>
        <Image
          src={UserProfile}
          alt={moim.title}
          width={50}
          height={50}
          className="scale-125 rounded-full object-cover"
        />
        <div
          className="flex-1 cursor-pointer truncate"
          onClick={() => router.push(`/moims/${moim.id}`)}
        >
          <p className="font-semibold text-main-header">{moim.title}</p>
          <p className="text-sm text-gray-500">{moim.place_name}</p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="flex cursor-pointer items-center gap-1 text-gray-500"
            onClick={() =>
              open('detail', { id: moim.id, participants: moim.participants })
            }
          >
            <Users size={20} />
            <span className="text-sm">
              {moim.people_status}/{moim.max_people}
            </span>
          </span>
          {isLikelist ? (
            <FavoriteButton
              type={'star'}
              color="#A0B092"
              isOn={isLiked}
              onToggle={handleToggleLike}
            />
          ) : moim.is_writer ? (
            <span className="w-[50px]">
              <Settings
                size={20}
                color="gray"
                className="mx-auto cursor-pointer"
                onClick={() => router.push(`/moims/edit/${moim.id}`)}
              />
            </span>
          ) : (
            <Button
              size="xs"
              color="dark"
              onClick={() => open('confirm', { id: moim.id })}
            >
              나가기
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default MyMoimCard;
