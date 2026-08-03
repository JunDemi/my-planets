import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Portfolio Universe(박정욱)',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang='ko' className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scrollbar-hide`}>
        <body className='min-h-screen min-w-[1280px] overflow-x-auto bg-background font-sans text-foreground scrollbar-hide'>
          {children}
        </body>
      </html>
  );
}
