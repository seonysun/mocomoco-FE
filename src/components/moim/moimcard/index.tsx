'use client';

import { useRouter } from 'next/navigation';
import { moimCard } from '@/types/moim';

import { MoimCardItem } from '../moimcarditem';

interface ListProps {
  data?: moimCard[];
}
export const MoimCard = ({ data }: ListProps) => {
  if (!data || data.length === 0) return <p>모임이 없습니다.</p>;
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-4">
      {data.map(item => (
        <MoimCardItem key={item.id} item={item} />
      ))}
    </div>
  );
};
