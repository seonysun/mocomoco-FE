import MyMoimBox from '@/components/mypage/MyMoimBox';
import MyMoimCard from '@/components/mypage/MyMoimCard';
import wishlist from '@/mockup/listapi.json';

export default function Wish() {
  return (
    <MyMoimBox title="관심 모임 목록">
      {wishlist.map(moim => (
        <MyMoimCard key={moim.id} moim={moim} />
      ))}
    </MyMoimBox>
  );
}
