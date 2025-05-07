import type { Metadata } from 'next';
import { Inter, Noto_Sans_Arabic } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ScrollToTop from '@/components/scroll-to-top';
import { ThemeProvider } from '@/components/theme-provider';
import '../globals.css';
import { notFound } from 'next/navigation';
import ClientPageLoader from '@/components/client-page-loader';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-noto-sans-arabic',
});

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
      className={`${inter.variable} ${notoSansArabic.variable}`}
    >
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