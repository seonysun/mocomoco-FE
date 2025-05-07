import MyMoimBox from '@/components/mypage/MyMoimBox';
import MyMoimCard from '@/components/mypage/MyMoimCard';
import joinlist from '@/mockup/listapi.json';

export default function Join() {
  return (
    <div className="px-[8%] py-[5%]">
      <MyMoimBox title="참여 모임 목록">
        {joinlist.map(moim => (
          <MyMoimCard key={moim.id} moim={moim} />
        ))}
      </MyMoimBox>
    </div>
  );
}
