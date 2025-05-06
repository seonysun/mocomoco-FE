import { MoimCard } from '@/components/list/moimcard';
import { ChevronDown, Search } from 'lucide-react';
import listApi from '@/mockup/listapi.json';
import CommonInput from '@/components/common/input/Input';
import Button from '@/components/common/button/Button';

const MoimList = () => {
  return (
    <div className="flex flex-col gap-2 px-20">
      <div className="flex items-center justify-between">
        <p className="pb-2 text-sm">전체 12개</p>
        <Button size="sm" className="w-14">
          작성
        </Button>
      </div>
      <div className="flex justify-between">
        <div className="flex w-[300px] pb-4">
          <CommonInput box="line" placeholder="검색어" width={100} />
          <Search color="#a0b092" />
        </div>
        <div className="flex w-[110px] items-center gap-4 rounded-2xl bg-main-base p-2 text-sm">
          카테고리
          <ChevronDown size={15} />
        </div>
      </div>
      <MoimCard data={listApi} />
    </div>
  );
};

export default MoimList;
