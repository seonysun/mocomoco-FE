'use client';

import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import '@/styles/schedule.css';
import { Schedule } from '@/types/schedule';
import MyMoimBox from '@/components/mypage/MyMoimBox';
import Calendar from 'react-calendar';
import { useQuery } from '@tanstack/react-query';
import { scheduleOption } from '@/api/options/scheduleOptions';
import { myMoimOption } from '@/api/options/myMoimOption';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const MySchedule = () => {
  const [date, setDate] = useState<Value>(new Date());

  const { data: joined } = useQuery(myMoimOption.joinedList());
  const joinedMoim = joined?.map(moim => moim.id) ?? [];

  const { data: schedules } = useQuery(scheduleOption.scheduleList(joinedMoim));

  // const getSchedulesForDate = (date: Date) => {
  //   const dateString = date.toISOString().split('T')[0];
  //   return schedules?.filter((schedule: Schedule) =>
  //     schedule.date.startsWith(dateString),
  //   );
  // };
  // const selectedSchedules = !Array.isArray(date)
  //   ? getSchedulesForDate(date)
  //   : [];

  // const getTileClassName = ({ date }: { date: Date }) => {
  //   return selectedSchedules?.length > 0 ? 'has-schedule' : '';
  // };

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
  };

  return (
    <MyMoimBox title="일정 관리">
      <div className="rounded-2xl bg-white p-6">
        <div className="flex items-center justify-end gap-4"></div>
        <Calendar
          onChange={handleDateChange}
          value={date}
          locale="ko-KR"
          className="!w-full !border-none font-gmarket"
          // tileClassName={getTileClassName}
          navigationLabel={({ date }) => {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            return (
              <span>
                <span className="font-semibold text-main-dark">{year}</span>년{' '}
                <span className="font-semibold text-main-dark">{month}</span>월
              </span>
            );
          }}
        />
        {/* {Array.isArray(date) ? null : (
          <div className="mt-4 space-y-2">
            {selectedSchedules?.length > 0 ? (
              selectedSchedules.map(schedule => (
                <div
                  key={schedule.id}
                  className="rounded-lg border px-4 py-2 shadow-sm"
                >
                  <p className="font-semibold text-main-dark"></p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">
                선택한 날짜에 일정이 없습니다.
              </p>
            )}
          </div>
        )} */}
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
    </MyMoimBox>
  );
};

export default MySchedule;
