import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// تنشئ دالة الوسيط مع دعم الكوكيز
const intlMiddleware = createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: true // تمكين اكتشاف اللغة
});

// وسيط مخصص للتحقق من ملفات تعريف الارتباط وتعيين اللغة
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // للتأكد من عدم التداخل مع الملفات الثابتة والأصول
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    /\.(png|jpg|jpeg|svg|ico|css|js)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // معالجة المسارات المكررة مثل /ar/ar - تحسين طريقة الكشف والإصلاح
  const repeatedLocalePattern = /^\/(en|ar)\/(en|ar)(\/.*)?$/;
  const repeatedMatch = pathname.match(repeatedLocalePattern);
  
  if (repeatedMatch) {
    // الحصول على اللغة الأولى في المسار
    const firstLocale = repeatedMatch[1];
    // إنشاء المسار الصحيح باستخدام اللغة الأولى فقط
    const fixedPath = pathname.replace(repeatedLocalePattern, `/${firstLocale}$3`);
    const newUrl = new URL(fixedPath, request.url);
    newUrl.search = request.nextUrl.search;
    return NextResponse.redirect(newUrl);
  }

  // تحقق من وجود ملف تعريف ارتباط للغة
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
  
  // إذا كان هناك ملف تعريف ارتباط للغة وكان المسار الحالي لا يعكس هذه اللغة
  const hasDefaultLocaleInPath = pathname === '/' || pathname.startsWith('/en/');
  const hasArLocaleInPath = pathname.startsWith('/ar/');
  
  if (localeCookie === 'ar' && !hasArLocaleInPath) {
    // تحويل إلى المسار العربي
    const newUrl = new URL(
      pathname === '/' ? '/ar' : `/ar${pathname}`, 
      request.url
    );
    newUrl.search = request.nextUrl.search;
    return NextResponse.redirect(newUrl);
  } else if (localeCookie === 'en' && !hasDefaultLocaleInPath && hasArLocaleInPath) {
    // تحويل إلى المسار الإنجليزي
    const newUrl = new URL(
      pathname.replace(/^\/ar/, '') || '/', 
      request.url
    );
    newUrl.search = request.nextUrl.search;
    return NextResponse.redirect(newUrl);
  }

  // في حالة عدم وجود ملف تعريف ارتباط أو عندما يعكس المسار الحالي اللغة المخزنة بالفعل
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};