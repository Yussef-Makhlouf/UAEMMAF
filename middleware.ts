import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Create intl middleware with cookie support
const intlMiddleware = createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: true
});

// Helper function to clean paths with repeated locales
function cleanPathWithRepeatedLocales(path: string): string {
  const locales = ['en', 'ar'];
  const localePattern = locales.join('|');
  
  // Check for repeated locale patterns like /ar/ar, /en/ar, /ar/en, etc.
  const repeatedLocaleRegex = new RegExp(`^/(${localePattern})/(${localePattern})(/.*)?$`);
  const match = path.match(repeatedLocaleRegex);
  
  if (match) {
    // Keep the first locale and any additional path
    return `/${match[1]}${match[3] || ''}`;
  }
  
  return path;
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static files and assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    /\.(png|jpg|jpeg|svg|ico|css|js)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // First, handle repeated locale patterns in the URL
  const cleanedPath = cleanPathWithRepeatedLocales(pathname);
  if (cleanedPath !== pathname) {
    const newUrl = new URL(cleanedPath, request.url);
    newUrl.search = request.nextUrl.search;
    return NextResponse.redirect(newUrl);
  }

  // Check locale cookie
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
  
  // Check the current path's locale
  const isRootPath = pathname === '/';
  const hasEnLocaleInPath = pathname.startsWith('/en/') || pathname === '/en';
  const hasArLocaleInPath = pathname.startsWith('/ar/') || pathname === '/ar';
  
  // If cookie is set to Arabic but path isn't in Arabic
  if (localeCookie === 'ar' && !hasArLocaleInPath) {
    let newPath;
    
    if (isRootPath) {
      // Root path needs Arabic locale
      newPath = '/ar';
    } else if (hasEnLocaleInPath) {
      // Replace English locale with Arabic
      newPath = pathname.replace(/^\/en(\/|$)/, '/ar$1');
    } else {
      // Add Arabic prefix to other paths (ensuring we don't double slash)
      newPath = `/ar${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
    }
    
    const newUrl = new URL(newPath, request.url);
    newUrl.search = request.nextUrl.search;
    return NextResponse.redirect(newUrl);
  } 
  // If cookie is set to English but path is in Arabic
  else if (localeCookie === 'en' && hasArLocaleInPath) {
    let newPath;
    
    if (pathname === '/ar') {
      // Root Arabic path becomes root path
      newPath = '/';
    } else {
      // Remove Arabic locale prefix
      newPath = pathname.replace(/^\/ar(\/|$)/, '/$1').replace(/\/+/, '/');
      // If the path is now empty, set it to root
      if (newPath === '' || newPath === '//' || newPath === '//') {
        newPath = '/';
      }
    }
    
    const newUrl = new URL(newPath, request.url);
    newUrl.search = request.nextUrl.search;
    return NextResponse.redirect(newUrl);
  }

  // Default - use the intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};