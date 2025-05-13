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
  }, []);

  const switchLocale = (newLocale: string) => {
    // If already on the same locale, do nothing
    if (newLocale === locale) {
      return;
    }
    
    // Save preference in cookie
    Cookies.set('NEXT_LOCALE', newLocale, { expires: 365 });
    
    // Define supported locales
    const locales = ['en', 'ar'];
    
    // First, clean any potential repeated locale patterns
    const repeatedLocalePattern = new RegExp(`^/(${locales.join('|')})/(${locales.join('|')})(/.*)?$`);
    let pathToProcess = pathname;
    
    if (repeatedLocalePattern.test(pathToProcess)) {
      // If we have a repeated locale pattern, only keep the first locale
      const match = pathToProcess.match(repeatedLocalePattern);
      if (match) {
        pathToProcess = `/${match[1]}${match[3] || ''}`;
      }
    }
    
    // Now remove any locale prefix to get a clean path
    locales.forEach(loc => {
      if (pathToProcess.startsWith(`/${loc}/`)) {
        pathToProcess = pathToProcess.replace(`/${loc}/`, '/');
      } else if (pathToProcess === `/${loc}`) {
        pathToProcess = '/';
      }
    });
    
    // Generate the new path
    let newPath;
    
    if (newLocale === 'en') {
      // English is the default locale, so we don't need a prefix
      // If path is already /, leave it alone
      if (pathToProcess === '/') {
        newPath = '/';
      } else {
        // Ensure we have a starting slash but no duplicate slashes
        newPath = pathToProcess.startsWith('/') ? pathToProcess : `/${pathToProcess}`;
      }
    } else {
      // For other locales like Arabic, add the locale prefix
      if (pathToProcess === '/') {
        newPath = `/${newLocale}`;
      } else {
        // Ensure correct format: /ar/path
        newPath = `/${newLocale}${pathToProcess.startsWith('/') ? pathToProcess : `/${pathToProcess}`}`;
      }
    }
    
    // Remove any duplicate slashes
    newPath = newPath.replace(/\/+/g, '/');
    
    // Navigate to the new path
    router.replace(newPath);
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
            : 'text-white hover:text-primary hover:bg-gray-100'
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
            : 'text-white hover:text-primary hover:bg-gray-100'
        }`}
      >
        <span className="font-medium">AR</span>
      </Button>
    </div>
  );
}