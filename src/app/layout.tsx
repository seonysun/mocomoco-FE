import type { Metadata } from 'next';
import '@styles/globals.css';
import Header from '@/components/common/header';

export const metadata: Metadata = {
  title: '모코모코',
  description: '모각코가 쉬워지는 곳, 모코모코',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Header />

        <main className="flex h-full w-full items-center justify-center bg-main-light">
          {children}
        </main>
      </body>
    </html>
  );
}
