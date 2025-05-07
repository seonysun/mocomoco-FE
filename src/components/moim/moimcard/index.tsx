'use client';
import Button from '@/components/common/button/Button';
import { moimCard } from './types';
import FavoriteButton from '@/components/common/button/FavoriteButton';
import Image from 'next/image';
import basicImage from '@images/basicImage.png';
import { useRouter } from 'next/navigation';

interface ListProps {
  data: moimCard[];
}
export const MoimCard = ({ data }: ListProps) => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-2 gap-7 md:grid-cols-4">
      {data.map(item => {
        const statusText = item.is_closed ? '모집 완료' : '모집 중';
        const statusColor = item.is_closed ? 'red' : 'green';
        const statusImage = item.img_url ? item.img_url : basicImage;
        const formattedDate = new Date(item.date).toLocaleString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });

        return (
          <div
            key={item.id}
            className="max-h-[500px] min-w-40 rounded-md border bg-white shadow-md"
          >
            <div
              className="flex flex-col gap-4"
              onClick={() => router.push(`/moims/${item.id}`)}
            >
              <div className="relative h-[200px] w-full overflow-hidden rounded-md">
                <div className="absolute left-2 right-2 top-2 z-10 flex items-center justify-between px-2">
                  <Button
                    size="sm"
                    className="pointer-events-none w-[87px]"
                    color={statusColor}
                  >
                    {statusText}
                  </Button>
                  <div className="min-w-16 rounded bg-white px-2 py-1 text-sm shadow-sm">
                    정원: {item.max_people}명
                  </div>
                </div>

                <Image
                  src={statusImage}
                  alt="이미지"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-4 p-3">
                <span className="text-sm text-gray-500"> {item.category}</span>
                <div>
                  <h1 className="text-md h-12 font-medium">{item.title}</h1>
                  <hr />
                </div>
                <div>
                  <p className="mb-2 h-6 text-sm text-gray-700">
                    장소: {item.place_name}
                  </p>
                  <div className="flex items-end justify-between">
                    <span>{formattedDate}</span>
                    <FavoriteButton color="#a0b092" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
