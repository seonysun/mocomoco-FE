'use client';
import { MoimCard } from '@/components/moim/moimcard';
import { ChevronDown, Search } from 'lucide-react';
import CommonInput from '@/components/common/input/Input';
import Button from '@/components/common/button/Button';
import Link from 'next/link';
import { useMoimsList } from '@/api/hooks/useMoims';
import LoadingSpinner from '@/components/common/loadingSpinner/LoadingSpinner';
import { useState } from 'react';
import Dropdown from '@/components/common/input/Dropdown';
import { MOIM_LIST } from '@/constants/config';
import { notFound } from 'next/navigation';

export const MoimList = () => {
  const [selectCategory, setSelectCategory] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, isError, error } = useMoimsList();
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>에러 발생: {error.message}</div>;
  if (!data) return notFound();

  const categoryMap: Record<string, string> = {
    전체: '',
    프로젝트: 'project',
    모임: 'meeting',
  };

  // 필터링된 데이터
  const filteredData = data.filter(item => {
    const categoryFilter = categoryMap[selectCategory];
    const matchesCategory = categoryFilter
      ? item.category === categoryFilter
      : true;
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  console.log(filteredData);
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="pb-2 text-sm">전체 {filteredData.length ?? 0}개</p>
        <Link href={'moims/post'}>
          <Button size="sm" className="w-14">
            작성
          </Button>
        </Link>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex w-[150px] pb-4 md:w-[300px]">
          <CommonInput
            box="line"
            placeholder="검색어"
            width={40}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <Search color="#a0b092" />
        </div>
        <div className="flex h-10 w-[120px] min-w-[120px] items-center p-2 text-sm">
          <Dropdown
            selected={selectCategory}
            onSelect={setSelectCategory}
            placeholder="카테고리"
            categories={MOIM_LIST}
          />
        </div>
      </div>
      <MoimCard data={filteredData} />
    </>
  );
};
