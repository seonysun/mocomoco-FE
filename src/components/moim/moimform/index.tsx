'use client';

import Button from '@/components/common/button/Button';
import Dropdown from '@/components/common/input/Dropdown';
import CommonInput from '@/components/common/input/Input';
import TextEditor from '@/components/moim/texteditor';
import { MOIM_CATEGORY, ROLE_LIST, YEAR_LIST } from '@/constants/config';
import useClickOutside from '@/hooks/useClickOutside';
import { useAuthStore } from '@/store/useAuthStore';

import { Search, Server } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';

export default function MoimForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [place, setPlace] = useState('');
  const [address, setAddress] = useState('');
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
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, () => setIsPostcodeOpen(false));

  const router = useRouter();
  const increaseRole = (role: (typeof ROLE_LIST)[number]) => {
    setRoles(prev => ({ ...prev, [role]: prev[role] + 1 }));
  };

  const decreaseRole = (role: (typeof ROLE_LIST)[number]) => {
    if (roles[role] <= 0) return;
    setRoles(prev => ({ ...prev, [role]: prev[role] - 1 }));
  };

  const getMaxDay = (year: string, month: string) => {
    const y = parseInt(year, 10);
    const m = parseInt(month, 10);
    if (!y || !m) return 31;
    return new Date(y, m, 0).getDate();
  };

  const monthNumberSet = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const input = e.target.value;
    const numericValue = input.replace(/[^0-9]/g, '');
    const number = parseInt(numericValue, 10);

    if (!numericValue) {
      setMonth('');
    } else if (number >= 1 && number <= 12) {
      setMonth(numericValue);
    }
  };

  const dayNumberSet = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const input = e.target.value;
    const numericValue = input.replace(/[^0-9]/g, '');
    const number = parseInt(numericValue, 10);

    const maxDay = getMaxDay(year, month);

    if (!numericValue) {
      setDay('');
    } else if (number >= 1 && number <= maxDay) {
      setDay(numericValue);
    }
  };
  const getLatLngFromAddress = async (address: string) => {
    try {
      const KAKAO_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
      const response = await fetch(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`,
        {
          method: 'GET',
          headers: {
            Authorization: `KakaoAK ${KAKAO_API_KEY}`,
          },
        },
      );

      const data = await response.json();
      if (data.documents && data.documents.length > 0) {
        const location = data.documents[0];
        console.log(location);
        setLatitude(parseFloat(location.y));
        setLongitude(parseFloat(location.x));
      } else {
        console.warn('좌표를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('좌표 가져오기 실패:', error);
    }
  };
  const handleAddressComplete = (data: any) => {
    const roadAddress = data.roadAddress;
    setAddress(roadAddress);
    setIsPostcodeOpen(false);
    getLatLngFromAddress(roadAddress);
  };

  const handleSubmit = async () => {
    if (
      !title ||
      !content ||
      !category ||
      !place ||
      !address ||
      !year ||
      !month ||
      !day
    ) {
      alert('필수 정보를 모두 입력해 주세요.');
      return;
    }

    const max_people = Object.values(roles).reduce((acc, cur) => acc + cur, 0);
    const formattedMonth = month.padStart(2, '0');
    const formattedDay = day.padStart(2, '0');
    const selectedDate = new Date(`${year}-${formattedMonth}-${formattedDay}`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert('오늘 이전 날짜로는 모임을 생성할 수 없습니다.');
      return;
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('place_name', place);
    formData.append('address', address);
    formData.append('latitude', latitude.toString());
    formData.append('longitude', longitude.toString());
    formData.append('max_people', max_people.toString());
    formData.append('date', `${year}-${formattedMonth}-${formattedDay}`);
    if (roles['프론트엔드'])
      formData.append('frontend', roles['프론트엔드'].toString());
    if (roles['백엔드']) formData.append('backend', roles['백엔드'].toString());
    if (roles['디자이너'])
      formData.append('designer', roles['디자이너'].toString());
    if (roles['풀스택'])
      formData.append('fullstack', roles['풀스택'].toString());

    if (image) {
      formData.append('image', image);
    }

    try {
      const accessToken = useAuthStore.getState().access;
      const response = await fetch('https://api.mocomoco.store/posts/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('응답 오류:', response.status, errorText);
        alert('오류가 발생했습니다.');
        return;
      }

      alert('모임이 생성되었습니다.');
      router.push('/moims');
    } catch (error) {
      console.error('모임 전송 중 오류:', error);
      alert(`오류가 발생했습니다.${error}`);
    }
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
              onImageUpload={(file: File) => {
                setImage(file);
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
                  selected={category}
                  onSelect={setCategory}
                  placeholder=""
                  className="w-[100px]"
                  categories={MOIM_CATEGORY}
                />
              </div>
              <div className="flex w-full flex-col justify-center gap-[5px]">
                <p className="text-[17px]"> 장소 검색 </p>
                <div
                  className="flex w-full items-center gap-[10px]"
                  onClick={() => setIsPostcodeOpen(true)}
                >
                  <CommonInput
                    placeholder="검색"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    box="box"
                  />
                  <Search color="#A0B092" />
                </div>
                {isPostcodeOpen && (
                  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-40">
                    <div className="w-[426px]" ref={modalRef}>
                      <DaumPostcodeEmbed
                        onComplete={handleAddressComplete}
                        autoClose
                      />
                      <Button
                        onClick={() => setIsPostcodeOpen(false)}
                        size="xs"
                        className="ml-3 mt-3"
                      >
                        닫기
                      </Button>
                    </div>
                  </div>
                )}
                <p className="text-[17px]"> 상세 주소</p>
                <div className="flex w-full items-center gap-[10px]">
                  <CommonInput
                    placeholder="검색"
                    value={place}
                    onChange={e => setPlace(e.target.value)}
                    box="box"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center gap-[5px]">
                <p className="text-[17px]"> 모임 정원 </p>
                <div className="ml-5 flex flex-col gap-4">
                  {ROLE_LIST.map(role => (
                    <div
                      key={role}
                      className="flex w-full max-w-[240px] items-center justify-between"
                    >
                      <span className="text-[14px] text-gray-700">{role}</span>
                      <div className="flex w-[90px] items-center rounded-full border border-main-default bg-main-header px-4 py-1 text-sm text-white">
                        <button
                          onClick={() => decreaseRole(role)}
                          disabled={roles[role] <= 0}
                          className="font-bold"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center">
                          {roles[role]}
                        </span>
                        <button
                          onClick={() => increaseRole(role)}
                          className="font-bold"
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
                    onChange={monthNumberSet}
                    box="line"
                    className="flex items-center justify-between gap-[20px] py-2"
                  />
                  <CommonInput
                    placeholder="일"
                    value={day}
                    onChange={dayNumberSet}
                    box="line"
                    className="flex items-center justify-between gap-[20px] py-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          size="lg"
          className="mb-3 w-[60px] self-center"
          onClick={handleSubmit}
        >
          작성
        </Button>
      </div>
    </>
  );
}
