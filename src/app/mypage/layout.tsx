import MypageSidebar from '@/components/mypage/MypageSidebar';

const MypageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* 화면 sm 이상 */}
      <div className="hidden gap-10 px-[2%] py-10 sm:flex">
        <div>
          <MypageSidebar />
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>

      {/* 화면 sm 미만 */}
      <div className="flex flex-col gap-4 px-[2%] py-10 sm:hidden">
        <div>
          <MypageSidebar />
        </div>
        <div className="">{children}</div>
      </div>
    </>
  );
};

export default MypageLayout;
