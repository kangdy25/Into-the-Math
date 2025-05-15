import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import '../globals.css';
import 'katex/dist/katex.min.css';

export const metadata: Metadata = {
  title: 'Into the Math: 수학의 세계로의 여정',
  description:
    '정의에서 증명까지, 개념에서 통찰까지. Into the Math는 수학을 깊이 있게 탐구하고 함께 성장하는 수학 플랫폼입니다.',
  openGraph: {
    title: 'Into the Math: 수학의 세계로의 여정',
    description:
      '정의에서 증명까지, 개념에서 통찰까지. Into the Math는 수학을 깊이 있게 탐구하고 함께 성장하는 수학 플랫폼입니다.',
    images: ['/thumbnail.png'],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
