'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before accessing cookies
  useEffect(() => {
    setMounted(true);
    
    // Check if there's a saved language preference in cookies
    const savedLocale = Cookies.get('NEXT_LOCALE');
    if (savedLocale && savedLocale !== locale) {
      // If the saved locale is different from current, switch to it
      switchLocale(savedLocale);
    }
  }, []);

  const switchLocale = (newLocale: string) => {
    // Save the selected locale in a cookie
    Cookies.set('NEXT_LOCALE', newLocale, { expires: 365 }); // Expires in 1 year

    // للتحقق أولاً إذا كانت اللغة المحددة هي نفسها اللغة الحالية
    if (newLocale === locale) {
      return; // لا داعي للتحويل إذا كانت اللغة هي نفسها
    }

    // Get the path without any locale prefix
    let newPath = pathname;
    
    // Remove any existing locale prefix from path
    const locales = ['en', 'ar'];
    
    // Check if path starts with any of the locales
    locales.forEach(loc => {
      if (pathname.startsWith(`/${loc}/`)) {
        newPath = pathname.replace(`/${loc}/`, '/');
      } else if (pathname === `/${loc}`) {
        newPath = '/';
      }
    });
    
    // التحقق من وجود بادئات لغة متكررة قبل التوجيه
    const repeatedLocalePattern = new RegExp(`^/(${locales.join('|')})/(${locales.join('|')})(/.*)?$`);
    if (repeatedLocalePattern.test(newPath)) {
      // إزالة بادئات اللغة المتكررة
      newPath = newPath.replace(repeatedLocalePattern, '/$1$3');
    }
    
    // Add new locale to path (only if it's not the default locale 'en')
    if (newLocale === 'en') {
      // For English (default locale), we don't need a prefix
      router.replace(newPath);
    } else {
      // For other locales like Arabic, add the locale prefix
      router.replace(`/${newLocale}${newPath.startsWith('/') ? newPath : `/${newPath}`}`);
    }
  };

  // Don't render anything until the component is mounted
  if (!mounted) return null;

  return (
    <div className="relative inline-flex items-center p-1 bg-white/10 backdrop-blur-sm rounded-full border border-gray-200/20 shadow-lg">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => switchLocale('en')}
        className={`px-4 py-2 rounded-full transition-all duration-300 ${
          locale === 'en'
            ? 'bg-primary text-white shadow-md scale-105'
            : 'text-gray-600 hover:text-primary hover:bg-gray-100'
        }`}
      >
        <span className="font-medium">EN</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => switchLocale('ar')}
        className={`px-4 py-2 rounded-full transition-all duration-300 ${
          locale === 'ar'
            ? 'bg-primary text-white shadow-md scale-105'
            : 'text-gray-600 hover:text-primary hover:bg-gray-100'
        }`}
      >
        <span className="font-medium">AR</span>
      </Button>
    </div>
  );
}