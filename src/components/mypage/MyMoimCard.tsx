'use client';

import { Moim } from '@/types/moim';
import Image from 'next/image';
import Logo from '@images/Logo.png';
import FavoriteButton from '@/components/common/button/FavoriteButton';
import { Users } from 'lucide-react';
import Button from '@/components/common/button/Button';
import { usePathname } from 'next/navigation';

type MoimProps = {
  moim: Moim;
};

const MyMoimCard = ({ moim }: MoimProps) => {
  const pathname = usePathname();
  const isWishlist = pathname.startsWith('/mypage/wishlist');

  return (
    <div className="flex w-full items-center justify-between rounded-xl border border-main-base bg-[#FFFCFC] p-3">
      <div className="flex items-center gap-2">
        <span className="w-16">
          {moim.is_closed ? (
            <Button size="xs" color="red">
              모집완료
            </Button>
          ) : (
            <Button size="xs">모집중</Button>
          )}
        </span>
        <Image src={Logo} className="size-10 rounded-xl" alt="유저 이미지" />
        <div>
          <p className="line-clamp-1 font-semibold text-main-header">
            {moim.title}
          </p>
          <p className="line-clamp-1 text-sm text-gray-500">
            content api 명세서에 엄슴
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 text-gray-500">
          <Users size={20} />
          <span className="text-sm">4/5</span>
        </span>
        {isWishlist ? (
          <FavoriteButton type={'star'} color="#A0B092" />
        ) : (
          <Button size="xs" color="dark">
            나가기
          </Button>
        )}
      </div>
    </div>
  );
};

export default MyMoimCard;
