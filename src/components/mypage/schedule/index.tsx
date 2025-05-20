'use client';

import { useMemo, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import '@/styles/schedule.css';
import MyMoimBox from '@/components/mypage/MyMoimBox';
import Calendar from 'react-calendar';
import { useQuery } from '@tanstack/react-query';
import { scheduleOption } from '@/api/options/scheduleOptions';
import { myMoimOption } from '@/api/options/myMoimOption';
import { toLocalDateString } from '@/components/mypage/schedule/date';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/common/loadingSpinner/LoadingSpinner';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const MySchedule = () => {
  const router = useRouter();

  const [date, setDate] = useState<Value>(new Date());

  const { data: joined, isLoading } = useQuery(myMoimOption.joinedList());
  const joinedMoim = joined?.map(moim => moim.id) ?? [];

  const { data: schedules } = useQuery(scheduleOption.scheduleList(joinedMoim));

  const scheduleDateSet = useMemo(() => {
    return new Set(
      schedules?.map(s => toLocalDateString(new Date(s.post_date))) ?? [],
    );
  }, [schedules]);
  const setTileClassName = ({ date }: { date: Date }) => {
    const dateString = toLocalDateString(date);
    return scheduleDateSet.has(dateString) ? 'has-schedule' : '';
  };

  const handleDateChange = (value: Value) => {
    if (value && !Array.isArray(value)) setDate(value);
  };

  const selectedSchedules = useMemo(() => {
    if (Array.isArray(date) || !date) return [];
    return (
      schedules?.filter(
        schedule =>
          toLocalDateString(new Date(schedule.post_date)) ===
          toLocalDateString(date),
      ) ?? []
    );
  }, [date, schedules]);

  return (
    <MyMoimBox title="일정 관리">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="rounded-2xl bg-white p-6">
            <div className="flex items-center justify-end gap-4"></div>
            <Calendar
              value={date}
              onChange={handleDateChange}
              locale="ko-KR"
              className="react-calendar !w-full !border-none"
              tileClassName={setTileClassName}
              navigationLabel={({ date }) => {
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                return (
                  <span>
                    <span className="font-semibold text-main-header">
                      {year}
                    </span>
                    년&nbsp;
                    <span className="font-semibold text-main-header">
                      {month}
                    </span>
                    월
                  </span>
                );
              }}
            />
            {!Array.isArray(date) && (
              <div className="mt-3 flex flex-col gap-2 text-sm">
                {selectedSchedules && selectedSchedules.length > 0 ? (
                  selectedSchedules.map(schedule => (
                    <div
                      key={schedule.id}
                      className="flex items-center text-main-dark"
                    >
                      <div className="rounded-lg border px-4 py-2">
                        {new Date(schedule.post_date).toLocaleTimeString(
                          'ko-KR',
                          {
                            hour: '2-digit',
                            minute: '2-digit',
                          },
                        )}
                      </div>
                      &nbsp;&nbsp;
                      <div>
                        <button
                          onClick={() =>
                            router.push(`/moims/${schedule.post_id}`)
                          }
                        >
                          {schedule.post_title}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">
                    선택한 날짜에 일정이 없습니다.
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="mt-3 flex gap-4">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded border-2 border-[#9bb782]"></div>
              <span className="text-sm text-gray-600">일정이 있는 날짜</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-[#9bb782]"></div>
              <span className="text-sm text-gray-600">선택한 날짜</span>
            </div>
          </div>
        </>
      )}
    </MyMoimBox>
  );
};

export default MySchedule;
