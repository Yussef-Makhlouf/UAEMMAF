import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Kufi_Arabic } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ScrollToTop from '@/components/scroll-to-top';

import '../globals.css';
import { notFound } from 'next/navigation';
import ClientPageLoader from '@/components/client-page-loader';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-noto-kufi-arabic',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'UAEMMAF - UAE Mixed Martial Arts Federation',
  description: 'The official website of the UAE Mixed Martial Arts Federation (UAEMMAF), the governing body for MMA in the United Arab Emirates.',
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate the locale
  if (!params.locale || !['en', 'ar'].includes(params.locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`@/messages/${params.locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html 
      lang={params.locale} 
      dir={params.locale === 'ar' ? 'rtl' : 'ltr'} 
      className={`${inter.variable} ${notoKufiArabic.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="canonical" href="https://www.uaemmaf.ae/" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@100..900&family=Almarai:wght@300;400;700;800&family=Bokor&family=Cairo:wght@200..1000&family=IBM+Plex+Sans+Arabic:wght@100;200;300;400;500;600;700&family=Markazi+Text:wght@400..700&family=Noto+Kufi+Arabic:wght@100..900&family=Parkinsans:wght@300..800&family=Reem+Kufi:wght@400..700&family=Rubik:ital,wght@0,300..900;1,300..900&family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className={params.locale === 'ar' ? 'font-noto' : 'font-inter'} style={{ overflowX: 'hidden' }}>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <div className="min-h-screen flex flex-col bg-[#111111] text-white">
            <Header />
            <main className="flex-grow">
              <ClientPageLoader>
                {children}
              </ClientPageLoader>
            </main>
            <Footer />
            <ScrollToTop />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}