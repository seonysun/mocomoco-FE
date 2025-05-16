import MypageSidebar from '@/components/mypage/sidebar/MypageSidebar';

const MypageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-4 px-[2%] py-10 md:flex-row md:gap-10">
      <MypageSidebar />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
};

export default MypageLayout;
