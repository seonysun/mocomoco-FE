'use client';

import { myMoimOption } from '@/api/options/myMoimOption';
import Button from '@/components/common/button/Button';
import PeopleCard from '@/components/common/card/PeopleCard';
import LoadingSpinner from '@/components/common/loadingSpinner/LoadingSpinner';
import DetailModal from '@/components/common/modal/DetailModal';
import MyMoimBox from '@/components/mypage/MyMoimBox';
import MyMoimCard from '@/components/mypage/MyMoimCard';
import { useModalStore } from '@/store/useModalStore';
import { User } from '@/types/moim';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function LikePage() {
  const router = useRouter();

  const { data, isLoading } = useQuery(myMoimOption.likedList());
  const likeList = data ?? [];

  const isModalOpen = useModalStore(state => state.isOpen);
  const type = useModalStore(state => state.type);
  const modalData = useModalStore(state => state.modalData);
  const participants =
    (modalData as { participants: User[] })?.participants ?? [];

  return (
    <MyMoimBox title="관심 모임 목록">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {likeList.length > 0 ? (
            likeList.map(moim => <MyMoimCard key={moim.id} moim={moim} />)
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4">
              <p className="text-center">관심 설정한 모임이 없어요</p>
              <Button onClick={() => router.push('/moims')}>구경 가기</Button>
            </div>
          )}
          {isModalOpen && type === 'detail' && (
            <DetailModal title="모임 참여 인원">
              {participants.length > 0 ? (
                <section className="grid grid-cols-3 gap-2">
                  {participants.map(member => (
                    <PeopleCard key={member.id} user={member} />
                  ))}
                </section>
              ) : (
                <p className="text-center">아직 참여자가 없습니다</p>
              )}
            </DetailModal>
          )}
        </>
      )}
    </MyMoimBox>
  );
}
