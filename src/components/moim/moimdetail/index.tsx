'use client';
import {
  useApplyMoim,
  useDeleteMoim,
  useMoimDetail,
} from '@/api/hooks/useMoims';
import Button from '@/components/common/button/Button';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import { useAuthStore } from '@/store/useAuthStore';
import { useModalStore } from '@/store/useModalStore';
import { CalendarDays, Fullscreen, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import UserImage from '@images/UserProfile.png';
import LoadingSpinner from '@/components/common/loadingSpinner/LoadingSpinner';
import { useState } from 'react';
import DetailPageModal from '../detailpagemodal';

interface Props {
  id: number;
}

export const MoimDetail = ({ id }: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const { data, isLoading, isError, error } = useMoimDetail(id);
  const { mutate: deleteMoim } = useDeleteMoim();
  const { mutate: applyMoim } = useApplyMoim(id);
  const router = useRouter();

  const user = useAuthStore(state => state.user);
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>에러 발생: {error.message}</div>;
  if (!data) return notFound();

  const isWriter = user?.id === data.writer.id;
  const roleMap: Record<string, string> = {
    프론트엔드: 'frontend',
    백엔드: 'backend',
    디자이너: 'designer',
    풀스택: 'fullstack',
  };
  const statusText = data.is_closed ? '모집 완료' : '모집 중';
  const statusColor = data.is_closed ? 'red' : 'green';
  const formattedDate = new Date(data.date).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const weekday = new Date(data?.date)
    .toLocaleDateString('ko-KR', {
      weekday: 'long',
    })
    .charAt(0);

  const handleDelete = () => {
    deleteMoim(id);
    router.push('/moims');
  };

  const handleApply = () => {
    if (selectedRole) {
      const mappedRole = roleMap[selectedRole];
      applyMoim(mappedRole);
      setShowApplyModal(false);
    }
  };

  return (
    <div className="flex h-full w-full flex-col gap-10 md:p-10">
      <div className="flex h-full w-full flex-col gap-10 rounded-md bg-white shadow-md">
        <Button
          size="md"
          className="pointer-events-none absolute z-20 m-3 w-[100px] min-w-20 p-3 md:m-6"
          color={statusColor}
        >
          {statusText}
        </Button>
        {data.image && (
          <div className="relative h-[300px] w-full overflow-hidden rounded-md">
            <Image
              src={data.image}
              alt="컨텐츠 사진"
              className="object-cover"
              sizes="50vw"
              fill
            />
          </div>
        )}
        <div className="flex flex-col p-10">
          <h1 className="pb-10 text-center text-3xl">{data.title}</h1>

          <div className="flex items-center gap-3 text-sm">
            <div className="flex w-full justify-between">
              <p className="pb-6 text-gray-600">
                {data.category == 'project' ? '프로젝트' : '모임'}
              </p>

              <p className="pb-6">
                {new Date(data.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <hr />
          <div className="w-full py-40">{data.content}</div>
        </div>
      </div>
      <div className="flex w-full justify-end">
        <Button
          className="w-24"
          size="md"
          onClick={() => setShowApplyModal(true)}
        >
          지원하기
        </Button>
      </div>
      <div className="flex flex-col items-center gap-6 text-sm md:flex-row">
        <div className="flex w-full flex-col gap-10 md:w-[420px]">
          <div>
            <p className="pb-2 text-xl">일정</p>
            <div className="flex h-[80px] items-center justify-center gap-1 rounded-sm border bg-white">
              <CalendarDays size={16} />
              {formattedDate}({weekday})
            </div>
          </div>
          <p className="text-xl">주최자</p>
          <div className="flex flex-col items-center">
            <div className="h-[200px] w-[200px] overflow-auto rounded-full">
              <Image
                src={
                  data.writer.profile_image
                    ? data.writer.profile_image
                    : UserImage
                }
                alt={data.writer.nickname}
                width={200}
                height={200}
                className="rounded-full object-cover"
              />
            </div>
            <p>{data.writer.nickname}</p>
          </div>
        </div>
        <div className="flex h-full w-full flex-col gap-4 md:pl-20">
          <p className="text-xl">장소</p>
          <div className="h-[320px] w-full border bg-white"></div>
          <div className="flex gap-1">
            <MapPin size={16} /> {data.place_name} ({data.address})
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl">참여인원</h2>
          <Button className="pointer-events-none w-14" size="xs" color="dark">
            {data.participants?.length} / {data.max_people}
          </Button>
        </div>
        <hr />
        <div className="flex gap-10">
          {data.participants && data.participants.length > 0 ? (
            data.participants.map(user => (
              <div
                key={user.id}
                className="flex flex-col items-center gap-4 text-sm"
              >
                <div className="h-[100px] w-[100px] overflow-auto rounded-full">
                  <Image
                    src={user.profile_image ? user.profile_image : UserImage}
                    alt={user.nickname}
                    width={300}
                    height={300}
                  />
                </div>
                <p>{user.nickname}</p>
              </div>
            ))
          ) : (
            <div className="w-full p-10 text-center">
              아직 참여인원이 없습니다.
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between pb-12 pt-10">
        <div className="flex gap-2">
          {isWriter && (
            <>
              <Button className="w-[56px]" size="sm">
                수정
              </Button>
              <Button
                className="w-[56px]"
                size="sm"
                color="red"
                onClick={() => setShowDeleteModal(true)}
              >
                삭제
              </Button>
            </>
          )}
        </div>
        {showDeleteModal && (
          <DetailPageModal
            title="정말로 이 모임을 삭제하시겠습니까?"
            onConfirm={handleDelete}
            onCancel={() => setShowDeleteModal(false)}
          />
        )}

        {showApplyModal && (
          <DetailPageModal
            title="어떤 역할로 지원하시겠습니까?"
            onConfirm={handleApply}
            onCancel={() => setShowApplyModal(false)}
          >
            <div className="flex flex-col gap-2">
              {['프론트엔드', '백엔드', '디자이너', '풀스택'].map(role => (
                <label key={role} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={selectedRole === role}
                    onChange={() => setSelectedRole(role)}
                  />
                  {role}
                </label>
              ))}
            </div>
          </DetailPageModal>
        )}
        <Link href={'/moims'}>
          <Button className="w-[56px]" size="sm">
            목록
          </Button>
        </Link>
      </div>
    </div>
  );
};
