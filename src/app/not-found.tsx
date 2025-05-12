import Button from '@/components/common/button/Button';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@images/Logo.png';

const NotFoundPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-10 p-4">
      <div>
        <p className="text-center text-4xl font-bold">404 </p>
        <p className="text-center text-2xl">page not found</p>
      </div>
      <Image src={logo} alt="" width={200} height={200} />

      <p className="text-center text-2xl">잘못된 주소 입니다.</p>

      <Link href="/">
        <Button className="text-xl md:text-2xl" size="xl">
          메인으로 가기
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
