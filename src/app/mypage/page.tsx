import React from 'react';

export default function Mypage() {
  return (
    <main className="bg-[#F7FFE6] min-h-screen font-['Pretendard']" role="main" aria-label="마이페이지">
      {/* 마이페이지 카드 */}
      <div className="flex justify-center items-center min-h-screen">
        <section className="bg-[#E1F0D3] rounded-2xl shadow-sm p-12 min-w-[700px] min-h-[500px] flex flex-col items-center" role="region" aria-label="사용자 정보">
          <h2 className="text-2xl font-semibold mb-6" role="heading" aria-level={2}>USER NAME 님의정보</h2>
          <img src="/images/Logo.png" alt="프로필" className="w-40 h-40 rounded-full object-cover mb-3" role="img" aria-label="프로필 이미지" />
          <div className="font-semibold text-xl mb-2" role="text" aria-label="사용자 이름">USER NAME</div>
          {/* 탭 */}
          <div className="flex gap-2 mb-6 w-full justify-start">
            <div className="bg-white border border-moko-border rounded-lg px-4 py-1 font-medium">프론트엔드</div>
            <div className="bg-white border border-moko-border rounded-lg px-4 py-1 font-medium">디자이너</div>
          </div>
          {/* 정보 카드 */}
          <div className="flex gap-6 w-full justify-between">
            {/* 자기소개 */}
            <div className="bg-[#F6FBEF] rounded-[20px] p-4 min-w-[310px] min-h-[160px] flex flex-col border border-moko-border" role="region" aria-label="자기소개">
              <div className="font-semibold mb-2" role="heading" aria-level={3}>자기소개</div>
              <div className="text-gray-500 text-sm" role="text" aria-label="자기소개 내용">반갑습니다!</div>
            </div>
            {/* 스택 및 링크 */}
            <div className="flex flex-col gap-3 border border-moko-border bg-[#F6FBEF] rounded-[20px]" role="region" aria-label="스택 및 링크">
              <div className="bg-moko-bg rounded-lg p-4 min-w-[220px] min-h-[80px]">
                <div className="font-semibold mb-2" role="heading" aria-level={3}>사용 가능 스택</div>
                <nav className="flex gap-2" role="list" aria-label="스택 목록">
                  <li className="list-none">
                    <img src="/images/stack_js.svg" alt="js" className="w-9 h-9" role="img" aria-label="JavaScript" />
                  </li>
                  <li className="list-none">
                    <img src="/images/stack_ts.png" alt="ts" className="w-9 h-9" role="img" aria-label="TypeScript" />
                  </li>
                  <li className="list-none">
                    <img src="/images/stack_React.png" alt="react" className="w-9 h-9" role="img" aria-label="React" />
                  </li>
                  <li className="list-none">
                    <img src="/images/stack_next.png" alt="next" className="w-9 h-9" role="img" aria-label="Next.js" />
                  </li>
                  <li className="list-none">
                    <img src="/images/stack_git.png" alt="git" className="w-9 h-9" role="img" aria-label="Git" />
                  </li>
                </nav>
              </div>
              <div className="bg-moko-bg rounded-lg p-4 min-w-[220px]">
                <div className="font-semibold mb-2" role="heading" aria-level={3}>링크</div>
                <input type="text" value="https://github.com/" readOnly className="w-full border border-moko-border rounded-md p-1 bg-white" role="textbox" aria-label="GitHub 링크" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}