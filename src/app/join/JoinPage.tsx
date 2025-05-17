'use client';

import { myMoimOption } from '@/api/options/myMoimOption';
import Button from '@/components/common/button/Button';
import MyMoimBox from '@/components/mypage/MyMoimBox';
import MyMoimCard from '@/components/mypage/MyMoimCard';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import { useModalStore } from '@/store/useModalStore';
import DetailModal from '@/components/common/modal/DetailModal';
import PeopleCard from '@/components/common/card/PeopleCard';
import LoadingSpinner from '@/components/common/loadingSpinner/LoadingSpinner';

export default function JoinPage() {
  const router = useRouter();

  const isModalOpen = useModalStore(state => state.isOpen);
  const type = useModalStore(state => state.type);
  const participants = useModalStore(state => state.participants);

  const queryClient = useQueryClient();
  const cancelMyMoimMutation = useMutation(
    myMoimOption.cancelMyMoim(queryClient),
  );

  const { data, isLoading } = useQuery(myMoimOption.joinedList());
  const joinList = data ?? [];

  return (
    <MyMoimBox title="참여 모임 목록">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {joinList.length > 0 ? (
            joinList.map(moim => <MyMoimCard key={moim.id} moim={moim} />)
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4">
              <p className="text-center">참여중인 모임이 없어요</p>
              <Button onClick={() => router.push('/moims')}>구경 가기</Button>
            </div>
          )}
          {isModalOpen && type === 'confirm' && (
            <ConfirmModal
              input={true}
              content="탈퇴 사유를 작성해주세요"
              onConfirm={id => cancelMyMoimMutation.mutate(id)}
            />
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
