import Image from 'next/image';
import Logo from '@images/Logo.png';
import Button from '@/components/common/button/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8">
      <div className="flex flex-col gap-10 md:flex-row">
        <Image src={Logo} width={400} alt="로고" className="m-auto" />
        <section className="flex flex-col gap-7 p-4">
          <h1 className="text-4xl font-bold leading-snug">
            모각코할 사람, 여기 다 모여라!
          </h1>
          <p className="my-1 text-lg text-gray-600">
            혼자 공부하는 외로움은 이제 그만! <br />
            같이 공부하면, 웃고 떠들 틈도 없이 집중할 수 있거든요 🌱
          </p>
          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">
                💬 이런 고민, 있지 않나요?
              </h2>
              <ul className="text-lg text-gray-700">
                <li>"코딩하다가 막히면 너무 막막해…"</li>
                <li>"누가 옆에만 있어줘도 더 잘하게 되지 않나?"</li>
                <li>
                  그렇다면, 지금 바로 <strong>모코모코</strong>로 들어오세요!
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              ✨ 혼자보다 나은 '함께'의 힘
            </h2>
            <ul className="text-lg text-gray-700">
              <li>코딩 실력도 쑥쑥, 동기부여도 빵빵.</li>
              <li>함께 하면 더 웃기고, 더 깊이 배우고, 더 오래 갑니다.</li>
              <li>
                <strong>모코모코</strong>는 그런 코딩 친구들을 만나게 해주는
                공간이에요.
              </li>
            </ul>
          </div>
        </section>
      </div>
      <h2 className="my-2 text-3xl">함께 코딩하는 즐거움, 모코모코 🌱</h2>
      <Link href="/moims">
        <Button className="bg-main-default" size="lg">
          코딩친구 만나러가기
        </Button>
      </Link>
    </div>
  );
}
