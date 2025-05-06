import MypageSidebar from '@/components/mypage/MypageSidebar';

const MypageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-10 px-[2%] py-10">
      <div>
        <MypageSidebar />
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
};

export default MypageLayout;
