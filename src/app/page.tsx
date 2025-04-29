import Image from 'next/image';
import Logo from '@images/Logo.png';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-40 pt-[80px] md:flex-row">
      <Image src={Logo} width={600} height={600} alt="로고" />
      <div className="flex max-w-[550px] flex-col gap-16 p-4">
        <h1 className="text-4xl">모각코할 사람, 여기 다 모여라!</h1>
        <div className="flex flex-col gap-8">
          <h2 className="text-3xl">함께 코딩하는 즐거움, 모코모코🌱</h2>
          <div className="flex flex-col gap-1">
            <p className="text-xl"> "코딩하다가 막히면 너무 막막해…"</p>
            <p className="text-xl">
              "사실, 누가 옆에만 있어줘도 더 잘하게 되지 않나?"
            </p>
            <p className="text-xl">
              그렇다면, 지금 바로 모코모코로 들어오세요!
            </p>
            <p className="text-xl">
              모코모코는 '모여서 각자 코딩하는' 사람들 — 일명 모각코족을 위한
              온라인 놀이터예요.
            </p>
            <p className="text-xl">
              혼자 공부하는 외로움은 이제 그만! 같이 공부하면, 웃고 떠들 틈도
              없이 집중할 수 있거든요"
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <h2 className="text-3xl">혼자보다 나은 '함께'의 힘 ✨ </h2>
          <div className="flex flex-col gap-1">
            <p className="text-xl"> 코딩 실력도 쑥쑥, 동기부여도 빵빵.</p>
            <p className="text-xl">
              함께 하면 더 웃기고, 더 깊이 배우고, 더 오래 갑니다.
            </p>
            <p className="text-xl">
              모코모코는 그런 코딩 친구들을 만나게 해주는 공간이에요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
