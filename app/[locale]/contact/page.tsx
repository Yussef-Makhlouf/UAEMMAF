"use client";

import { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import ContactSection from "@/components/contact-section";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('contactPage');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  

  // إنشاء رابط مع اللغة
  const getLocalizedHref = (path: string) => {
    if (path === '/') {
      return `/${locale === 'en' ? '' : locale}`;
    }
    return `/${locale}${path.startsWith('/') ? path : `/${path}`}`;
  };
  
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className=" relative" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="w-full h-full pb-20">
        <Header />
      </div>
      {/* Hero Banner */}
      {/* <div className="relative h-[300px] bg-background-300 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/subhero.png"
            alt={t('heroTitle')} 
            fill 
            className="object-cover opacity-20 transition-transform duration-[15000ms] hover:scale-105"
            priority
            quality={85}
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('heroTitle')}</h1>
          <div className="flex items-center justify-center gap-2 text-gray-300">
            <Link href={getLocalizedHref('/')} className="hover:text-primary transition-colors">
              {t('breadcrumbs.home')}
            </Link>
            <span>/</span>
            <span className="text-white">{t('breadcrumbs.contact')}</span>
          </div>
        </div>
      </div> */}

      <ContactSection />
      
    </div>
  );
}