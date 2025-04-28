'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

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