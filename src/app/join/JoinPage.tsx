'use client';

import { myMoimOption } from '@/api/options/myMoimOption';
import Button from '@/components/common/button/Button';
import MyMoimBox from '@/components/mypage/MyMoimBox';
import MyMoimCard from '@/components/mypage/MyMoimCard';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function JoinPage() {
  const router = useRouter();

  const { data } = useQuery(myMoimOption.joinedList());
  const joinList = data ?? [];

  return (
    <MyMoimBox title="참여 모임 목록">
      {joinList.length > 0 ? (
        joinList.map(moim => <MyMoimCard key={moim.id} moim={moim} />)
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <p className="text-center">참여중인 모임이 없어요</p>
          <Button onClick={() => router.push('/moims')}>구경 가기</Button>
        </div>
      )}
    </MyMoimBox>
  );
}
