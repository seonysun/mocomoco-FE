'use client';

import Button from '@/components/common/button/Button';
import Dropdown from '@/components/common/input/Dropdown';
import CommonInput from '@/components/common/input/Input';
import { DAY_LIST, MONTH_LIST, YEAR_LIST } from '@/constants/config';
import { Search, Server } from 'lucide-react';
import { useState } from 'react';

export default function MoimForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [moim, setMoim] = useState('');
  const [place, setPlace] = useState('');
  const [count, setCount] = useState(0);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const decrease = () => {
    if (count <= 0) return;
    setCount(prev => prev - 1);
  };
  const increase = () => setCount(prev => prev + 1);

  return (
    <>
      <div className="flex flex-col justify-center gap-[50px]">
        <p className="p-[50px] text-center text-[30px]"> 모임 작성 페이지 </p>
        <div className="flex justify-center gap-[50px]">
          <div className="flex flex-col gap-[50px]">
            <CommonInput
              label="제목"
              value={title}
              onChange={e => setTitle(e.target.value)}
              box="box"
              className="w-[500px] text-[15px]"
            />
            <CommonInput
              label="작성내용"
              value={content}
              onChange={e => setContent(e.target.value)}
              box="textarea"
              className="w-[500px] text-[15px]"
            />
          </div>
          <div className="flex flex-col gap-[40px] rounded-[15px] border-[1px] border-main-default p-[20px]">
            <div className="flex items-center gap-[10px]">
              <Server color="#A0B092" />
              <p className="text-[18px]">필수선택</p>
            </div>
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-col justify-center gap-[5px]">
                <p className="text-[15px]"> 모임 카테고리 </p>
                <Dropdown
                  selected={moim}
                  onSelect={setMoim}
                  placeholder=""
                  className="w-[100px]"
                  categories={MONTH_LIST}
                />
              </div>
              <div className="flex flex-col justify-center gap-[5px]">
                <p className="text-[15px]"> 장소 검색 </p>
                <div className="flex items-center gap-[10px]">
                  <CommonInput
                    placeholder="검색"
                    value={place}
                    onChange={e => setPlace(e.target.value)}
                    box="box"
                    className=""
                  />
                  <Search color="#A0B092" />
                </div>
              </div>
              <div className="flex flex-col justify-center gap-[5px]">
                <p className="text-[15px]"> 모임 정원 </p>
                <div className="flex w-[80px] items-center justify-center space-x-4 rounded-full border border-main-default bg-main-header px-4 py-2">
                  <button
                    onClick={decrease}
                    disabled={count <= 0}
                    className="text-lg font-bold text-white"
                  >
                    -
                  </button>
                  <span className="text-lg text-white">{count}</span>
                  <button
                    onClick={increase}
                    className="text-lg font-bold text-white"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-[5px]">
                <p className="text-[15px]"> 모임 날짜 </p>
                <div className="flex items-center gap-[10px]">
                  <Dropdown
                    selected={year}
                    onSelect={setYear}
                    placeholder="년"
                    className="w-[50px]"
                    categories={YEAR_LIST}
                  />
                  <Dropdown
                    selected={month}
                    onSelect={setMonth}
                    placeholder="월"
                    className="w-[50px] text-center"
                    categories={MONTH_LIST}
                  />
                  <Dropdown
                    selected={day}
                    onSelect={setDay}
                    placeholder="일"
                    className="w-[50px] text-center"
                    categories={DAY_LIST}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button type="submit" size="lg" className="w-[50px] self-center">
          작성
        </Button>
      </div>
    </>
  );
}
