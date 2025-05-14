import Button from '@/components/common/button/Button';
import detail from '@/mockup/detail.json';
import { Moim } from '@/types/moim';
import { CalendarDays, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface MoimProps {
  params: {
    id: string;
  };
}

const MoimDetailPage = ({ params }: MoimProps) => {
  const moim = (detail as Moim[]).find(item => item.id === Number(params.id));
  if (!moim) return notFound();

  const statusText = moim.is_closed ? '모집 완료' : '모집 중';
  const statusColor = moim.is_closed ? 'red' : 'green';
  const formattedDate = new Date(moim.date).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const weekday = new Date(moim?.date)
    .toLocaleDateString('ko-KR', {
      weekday: 'long',
    })
    .charAt(0);

  return (
    <div className="flex h-full w-full flex-col gap-10 md:p-10">
      <div className="flex h-full w-full flex-col gap-10 rounded-md bg-white p-6 shadow-md md:px-20 md:py-10">
        <Button
          size="md"
          className="pointer-events-none w-[80px] min-w-20"
          color={statusColor}
        >
          {statusText}
        </Button>
        <h1 className="text-center text-3xl">{moim.title}</h1>
        <hr />
        <div className="flex items-center gap-3 text-sm">
          <div className="flex w-full justify-between">
            <p className="text-gray-600">{moim.category}</p>

            <p>{new Date(moim.created_at).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="whitespace-pre-line pb-16">{moim.content}</div>
      </div>
      <div className="flex w-full justify-end">
        <Button className="w-24" size="md">
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
          <div className="flex flex-col items-center gap-10">
            <div className="h-[100px] w-[100px] overflow-auto rounded-full bg-white">
              <Image
                src={moim.writer.profile_image}
                alt={moim.writer.nickname}
                width={300}
                height={300}
                className="rounded-full object-cover"
              />
            </div>
            <p>{moim.writer.nickname}</p>
          </div>
        </div>
        <div className="flex h-full w-full flex-col gap-4 md:pl-20">
          <p className="text-xl">장소</p>
          <div className="h-[320px] w-full border bg-white"></div>
          <div className="flex gap-1">
            <MapPin size={16} /> {moim.place_name} ({moim.address})
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl">참여인원</h2>
          <Button className="pointer-events-none w-14" size="xs" color="dark">
            {moim.participants.length} / {moim.max_people}
          </Button>
        </div>
        <hr />
        <div className="flex gap-10">
          {moim.participants.map(user => (
            <div
              key={user.id}
              className="flex flex-col items-center gap-4 text-sm"
            >
              <div className="h-[100px] w-[100px] overflow-auto rounded-full bg-white">
                <Image
                  src={user.profile_image}
                  alt={user.nickname}
                  width={300}
                  height={300}
                />
              </div>
              <p>{user.nickname}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between pb-12 pt-10">
        <div className="flex gap-2">
          <Button className="w-[56px]" size="sm">
            수정
          </Button>
          <Button className="w-[56px]" size="sm" color="red">
            삭제
          </Button>
        </div>
        <Link href={'/moims'}>
          <Button className="w-[56px]" size="sm">
            목록
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MoimDetailPage;
