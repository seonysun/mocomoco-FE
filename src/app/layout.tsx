import type { Metadata } from 'next';
import '@styles/globals.css';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';

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
      <body className="flex flex-col bg-main-light px-8">
        <Header />
        <main className="mx-auto flex w-full max-w-7xl flex-1 items-center">
          <div className="w-full">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
