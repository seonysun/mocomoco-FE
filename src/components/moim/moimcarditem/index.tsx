'use client';
import Button from '@/components/common/button/Button';
import FavoriteButton from '@/components/common/button/FavoriteButton';
import Image from 'next/image';
import basicImage from '@images/basicImage.png';
import { GetMoimList } from '@/types/moim';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDislikeMoim, useLikeMoim } from '@/api/hooks/useMoims';
import { MoimRoleStatus } from '@components/moim/moimrolestatus';

interface MoimCardItemProps {
  item: GetMoimList;
}

export const MoimCardItem = ({ item }: MoimCardItemProps) => {
  const router = useRouter();
  const statusText = item.is_closed ? '모집 완료' : '모집 중';
  const statusColor = item.is_closed ? 'red' : 'green';
  const statusImage = item.image ? item.image : basicImage;
  const formattedDate = new Date(item.date).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const [isLiked, setIsLiked] = useState(item.is_liked);
  const [showStatus, setShowStatus] = useState(false);
  const likeMoim = useLikeMoim(item.id);
  const disLikeMoim = useDislikeMoim(item.id);

  const handleToggleLike = () => {
    if (isLiked) {
      disLikeMoim.mutate(undefined, {
        onSuccess: () => {
          setIsLiked(false);
        },
      });
    } else {
      likeMoim.mutate(undefined, {
        onSuccess: () => {
          setIsLiked(true);
        },
      });
    }
  };

  return (
    <div className="max-h-[500px] min-w-[220px] rounded-md border bg-white shadow-md transition-transform duration-200 hover:scale-[1.02] hover:shadow-2xl">
      <div
        className="flex flex-col gap-4"
        onClick={() => router.push(`/moims/${item.id}`)}
      >
        <div className="relative h-[200px] w-full overflow-hidden rounded-md rounded-b-none">
          <div className="absolute top-2 z-10 flex w-full items-center justify-between px-2">
            <Button
              size="sm"
              className="pointer-events-none w-[87px]"
              color={statusColor}
            >
              {statusText}
            </Button>
            <div
              className="min-w-16 rounded bg-white px-2 py-1 text-sm shadow-sm"
              onMouseEnter={() => setShowStatus(true)}
              onMouseLeave={() => setShowStatus(false)}
            >
              정원: {item.max_people}명
              {showStatus && <MoimRoleStatus role_status={item.role_status} />}
            </div>
          </div>

          <Image
            src={statusImage}
            alt="이미지"
            fill
            className="object-cover"
            sizes="200"
          />
        </div>
        <div className="flex flex-col gap-3 p-3">
          <span className="text-sm text-gray-500">
            {item.category == 'project' ? '프로젝트' : '모임'}
          </span>
          <div>
            <h1 className="text-md h-10 overflow-hidden text-ellipsis whitespace-nowrap font-medium">
              {item.title}
            </h1>
            <hr />
          </div>
          <div>
            <p className="mb-2 line-clamp-1 h-6 text-sm text-gray-700">
              장소 : {item.place_name}
            </p>
            <div className="flex items-end justify-between">
              <span>{formattedDate}</span>
              <FavoriteButton
                color="#a0b092"
                isOn={isLiked}
                onToggle={handleToggleLike}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
