'use client';
import MyMoimBox from '@/components/mypage/MyMoimBox';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../../styles/schedule.css';
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function SchedulePage() {
  const [date, setDate] = useState<Value>(new Date());
  const [schedules, setSchedules] = useState<{ [key: string]: string[] }>({});
  const [newSchedule, setNewSchedule] = useState('');

  const handleAddSchedule = () => {
    if (!date || !newSchedule.trim()) return;

    const dateKey = format(
      date instanceof Date ? date : date[0]!,
      'yyyy-MM-dd',
    );
    setSchedules(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newSchedule.trim()],
    }));
    setNewSchedule('');
  };

  const handleDeleteSchedule = (dateKey: string, index: number) => {
    setSchedules(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].filter((_, i) => i !== index),
    }));
  };

  return (
    <MyMoimBox title="일정 관리">
      {/* 메인 컨텐츠 */}
      <div className="rounded-2xl border bg-white p-6 shadow-lg">
        <div className="flex gap-8">
          {/* 달력 */}
          <div className="flex-1">
            <Calendar
              onChange={setDate}
              value={date}
              locale="ko-KR"
              className="!w-full !border-none"
              tileClassName={({ date }) => {
                const dateKey = format(date, 'yyyy-MM-dd');
                return schedules[dateKey]?.length ? 'has-schedule' : null;
              }}
            />
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-[#E1F0D3]"></div>
                <span className="text-sm text-gray-600">
                  내가 생성한 그룹 일정
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-[#F6FBEF]"></div>
                <span className="text-sm text-gray-600">다른 그룹 일정</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MyMoimBox>
  );
}
