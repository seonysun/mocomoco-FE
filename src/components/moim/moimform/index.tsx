'use client';

import Button from '@/components/common/button/Button';
import Dropdown from '@/components/common/input/Dropdown';
import CommonInput from '@/components/common/input/Input';
import TextEditor from '@/components/moim/texteditor';
import { MOIM_CATEGORY, ROLE_LIST, YEAR_LIST } from '@/constants/config';
import { Search, Server } from 'lucide-react';
import { useState } from 'react';

export default function MoimForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [moim, setMoim] = useState('');
  const [place, setPlace] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const [roles, setRoles] = useState<
    Record<(typeof ROLE_LIST)[number], number>
  >({
    프론트엔드: 0,
    백엔드: 0,
    풀스택: 0,
    디자이너: 0,
  });

  const increaseRole = (role: (typeof ROLE_LIST)[number]) => {
    setRoles(prev => ({ ...prev, [role]: prev[role] + 1 }));
  };

  const decreaseRole = (role: (typeof ROLE_LIST)[number]) => {
    if (roles[role] <= 0) return;
    setRoles(prev => ({ ...prev, [role]: prev[role] - 1 }));
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        <p className="p-[50px] text-center text-[30px]"> 모임 작성 페이지 </p>
        <div className="flex flex-col justify-center gap-10 md:flex-row">
          <div className="flex w-full flex-col gap-10 md:max-w-[525px]">
            <CommonInput
              label="제목"
              value={title}
              onChange={e => setTitle(e.target.value)}
              box="box"
              className="w-full text-[15px]"
            />
            <TextEditor
              value={content}
              onChange={setContent}
              onImageUpload={file => {
                //추후 api 연결시 이미지 업로드 api로 교체
                console.log('업로드된 이미지 파일:', file);
              }}
            />
          </div>
          <div className="flex w-full flex-col gap-[40px] rounded-[15px] border-[1px] border-main-default p-[30px] md:max-w-[300px]">
            <div className="flex items-center gap-[10px]">
              <Server color="#A0B092" />
              <p className="text-[20px]">필수선택</p>
            </div>
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-col justify-center gap-[5px]">
                <p className="text-[17px]"> 모임 카테고리 </p>
                <Dropdown
                  selected={moim}
                  onSelect={setMoim}
                  placeholder=""
                  className="w-[100px]"
                  categories={MOIM_CATEGORY}
                />
              </div>
              <div className="flex w-full flex-col justify-center gap-[5px]">
                <p className="text-[17px]"> 장소 검색 </p>
                <div className="flex w-full items-center gap-[10px]">
                  <CommonInput
                    placeholder="검색"
                    value={place}
                    onChange={e => setPlace(e.target.value)}
                    box="box"
                  />
                  <Search color="#A0B092" />
                </div>
              </div>
              <div className="flex flex-col justify-center gap-[5px]">
                <p className="text-[17px]"> 모임 정원 </p>
                <div className="flex flex-col gap-4">
                  {ROLE_LIST.map(role => (
                    <div
                      key={role}
                      className="flex w-[220px] items-center justify-between"
                    >
                      <span className="text-[14px] text-gray-700">{role}</span>
                      <div className="flex items-center space-x-4 rounded-full border border-main-default bg-main-header px-4 py-1">
                        <button
                          onClick={() => decreaseRole(role)}
                          disabled={roles[role] <= 0}
                          className="text-sm font-bold text-white"
                        >
                          -
                        </button>
                        <span className="text-sm text-white">
                          {roles[role]}
                        </span>
                        <button
                          onClick={() => increaseRole(role)}
                          className="text-sm font-bold text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-center gap-[5px]">
                <p className="text-[17px]"> 모임 날짜 </p>
                <div className="flex items-center gap-[10px]">
                  <Dropdown
                    selected={year}
                    onSelect={setYear}
                    placeholder="년도"
                    categories={YEAR_LIST}
                  />
                  <CommonInput
                    placeholder="월"
                    value={month}
                    onChange={e => {
                      const input = e.target.value;
                      const numericValue = input.replace(/[^0-9]/g, '');
                      const number = parseInt(numericValue, 10);

                      if (!numericValue) {
                        setMonth('');
                      } else if (number >= 1 && number <= 12) {
                        setMonth(numericValue);
                      }
                    }}
                    box="line"
                    className="flex items-center justify-between gap-[20px] py-2"
                  />
                  <CommonInput
                    placeholder="일"
                    value={day}
                    onChange={e => {
                      const input = e.target.value;
                      const numericValue = input.replace(/[^0-9]/g, '');
                      const number = parseInt(numericValue, 10);

                      if (!numericValue) {
                        setDay('');
                      } else if (number >= 1 && number <= 31) {
                        setDay(numericValue);
                      }
                    }}
                    box="line"
                    className="flex items-center justify-between gap-[20px] py-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button type="submit" size="lg" className="mb-3 w-[60px] self-center">
          작성
        </Button>
      </div>
    </>
  );
}
