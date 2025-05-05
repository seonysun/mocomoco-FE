import MyMoimBox from '@/components/mypage/MyMoimBox';
import MyMoimCard from '@/components/mypage/MyMoimCard';

const wishlist = [
  {
    id: 17,
    title: '종로에서 공모전 팀 모집',
    category: '공모전',
    is_closed: true,
    date: '2025-05-06T15:00:00',
    place_name: '토즈 종로점',
    created_at: '2025-04-20T14:30:00',
  },
  {
    id: 17,
    title: '종로에서 공모전 팀 모집',
    category: '공모전',
    is_closed: false,
    date: '2025-05-06T15:00:00',
    place_name: '토즈 종로점',
    created_at: '2025-04-20T14:30:00',
  },
];

export default function Wish() {
  return (
    <MyMoimBox title="관심 모임 목록">
      {wishlist.map(moim => (
        <MyMoimCard key={moim.id} moim={moim} />
      ))}
    </MyMoimBox>
  );
}
