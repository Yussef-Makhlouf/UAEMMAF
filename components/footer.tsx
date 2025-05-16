"use client"

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="bg-black text-white pt-10 sm:pt-16 pb-6 sm:pb-8 border-t border-primary/45">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-[100px]">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 xl:gap-12">
          {/* Column 1 - Logo and Info */}
          <div className="flex flex-col gap-4 sm:gap-6">
            <Image 
              src="/logo3.png" 
              alt="Capital Smart Logo" 
              width={140} 
              height={50}
              loading="lazy"
              className="w-auto h-8 sm:h-10"
            />
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {t('description')}
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a 
                href="https://x.com/UAEMMAF?t=Zw8Gkof-X7A9XRbinT1PLA&s=09" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-[#E31E24] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="sm:w-[18px] sm:h-[18px]">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/share/1KqkSucYDU/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-[#E31E24] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="sm:w-[18px] sm:h-[18px]">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>
              <a 
                href="https://www.tiktok.com/@uaemmaf" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-[#E31E24] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="sm:w-[18px] sm:h-[18px]">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/uaemmaf?igsh=MTZ6c2xic2tzZWV5dA==" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-[#E31E24] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="sm:w-[18px] sm:h-[18px]">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                </svg>
              </a>
              <a 
                href="https://youtube.com/@UAEMMAF" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-[#E31E24] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="sm:w-[18px] sm:h-[18px]">
                  <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="flex flex-col gap-3 sm:gap-4 mt-2 sm:mt-0">
            <h3 className="text-base sm:text-lg font-bold mb-1">{t('quickLinks')}</h3>
            <Link href="/mission" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
              {t('mission')}
            </Link>
            <Link href="/leadership" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
              {t('leadership')}
            </Link>
            <Link href="/events" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
              {t('events')}
            </Link>
            <Link href="/news" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
              {t('news')}
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
              {t('contact')}
            </Link>
            {/* <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
              {t('privacyPolicy')}
            </Link> */}
          </div>

          {/* Column 3 - contact us */}
          <div className="flex flex-col gap-3 sm:gap-4 mt-2 sm:mt-0">
            <h3 className="text-base sm:text-lg font-bold mb-1">{t('contactUs')}</h3>
            {/* <p className="text-gray-400 text-sm sm:text-base">
              {t('description')}
            </p> */}
            <p className="text-gray-400 text-sm sm:text-base">
              Telephone: <a href="tel:+97123336111" className="hover:text-white transition-colors">97123336111</a>
            </p>
            <p className="text-gray-400 text-sm sm:text-base">
              Email: <a href="mailto:info@uaemmaf.com" className="hover:text-white transition-colors">info@uaemmaf.com</a>
            </p>
          </div>

          {/* Column 4 - Location Map */}
          <div className="flex flex-col gap-4 sm:gap-5 mt-4 sm:mt-0">
            <h3 className="text-base sm:text-lg font-bold">{t('location')}</h3>
            <div className="w-full h-[180px] sm:h-[200px] rounded-lg overflow-hidden">
              <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d68949.90053632692!2d54.442805!3d24.418652!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e42167a9cd0f1%3A0x7986ec2b7a18e80f!2sUAE%20Jiu-Jitsu%20Federation!5e1!3m2!1sar!2sus!4v1747085469086!5m2!1sar!2sus" 
              width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6 sm:my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
            © {new Date().getFullYear()} UAEMMAF {t('allRightsReserved')}
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6">
            <span  className="text-gray-500 hover:text-white text-xs sm:text-sm transition-colors">
              {t('terms')}
            </span>
            <span  className="text-gray-500 hover:text-white text-xs sm:text-sm transition-colors">
              {t('privacyPolicy')}
            </span>
            <span className="text-gray-500 hover:text-white text-xs sm:text-sm transition-colors">
              {t('cookies')}
            </span>
          </div>
        </div>
        
        {/* Developer Credit */}
        <div className="mt-4 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            {t('developedBy', {defaultValue: 'Developed by'})}{' '}
            <a 
              href="https://logixpro.ae/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              Logixpro
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
