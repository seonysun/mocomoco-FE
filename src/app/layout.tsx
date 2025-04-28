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
      <body className="flex h-full min-h-full w-full flex-col bg-main-light">
        <Header />
        <main className="h-full w-full">{children}</main>
      </body>
    </html>
  );
}
