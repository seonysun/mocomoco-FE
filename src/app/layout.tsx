import type { Metadata } from 'next';
import '@styles/globals.css';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import ClientLayout from '@/app/ClientLayout';
import Providers from '@/providers';

export const metadata: Metadata = {
  title: '모코모코',
  description: '모각코가 쉬워지는 곳, 모코모코',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_KEY;
  return (
    <html lang="ko">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services,clusterer`}
        ></script> */}
      </head>
      <body className="flex flex-col bg-main-light px-2 sm:px-8">
        <Providers>
          <Header />
          <main className="flex flex-1 justify-center">
            <div className="w-full">{children}</div>
          </main>
          <Footer />
          <ClientLayout />
        </Providers>
      </body>
    </html>
  );
}
