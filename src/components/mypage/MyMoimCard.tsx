'use client';

import Image from 'next/image';
import Logo from '@images/Logo.png';
import FavoriteButton from '@/components/common/button/FavoriteButton';
import { Users } from 'lucide-react';
import Button from '@/components/common/button/Button';
import { usePathname } from 'next/navigation';
import { moimCard } from '@/components/moim/moimcard/types';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/store/useModalStore';

type MoimProps = {
  moim: moimCard;
};

const MyMoimCard = ({ moim }: MoimProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isWishlist = pathname.startsWith('/mypage/wishlist');

  const { open } = useModalStore();
  const handleOpen = () => open(moim.id);

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
        <Image src={Logo} className="size-10 rounded-xl" alt="유저 이미지" />
        <div
          className="flex-1 cursor-pointer truncate"
          onClick={() => router.push(`/moims/${moim.id}`)}
        >
          <p className="font-semibold text-main-header">{moim.title}</p>
          <p className="text-sm text-gray-500">
            content 추가 필요합니다 api 명세에
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-gray-500">
            <Users size={20} />
            <span className="text-sm">1/{moim.max_people}</span>
          </span>
          {isWishlist ? (
            <FavoriteButton type={'star'} color="#A0B092" />
          ) : (
            <Button size="xs" color="dark" onClick={handleOpen}>
              나가기
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default MyMoimCard;
