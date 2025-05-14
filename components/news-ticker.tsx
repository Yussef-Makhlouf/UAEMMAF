"use client"

import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import { Flame } from "lucide-react"
import { useState, useEffect } from "react"

interface NewsTickerProps {
  latestNews?: {
    _id: string
    title: string
    id: string
  } | null
}

export default function NewsTicker({ latestNews }: NewsTickerProps) {
  const t = useTranslations('news')
  const locale = useLocale()
  const isRtl = locale === 'ar'
  
  // Add state for typing effect
  const [typingText, setTypingText] = useState('')
  const [typingIndex, setTypingIndex] = useState(0)
  
  // Get localized href
  const getLocalizedHref = (path: string) => {
    if (path.startsWith('http')) {
      return path
    }
    return `/${locale}${path.startsWith('/') ? path : `/${path}`}`
  }
  
  // Reset typing effect when latestNews changes
  useEffect(() => {
    if (latestNews) {
      setTypingText('');
      setTypingIndex(0);
    }
  }, [latestNews]);
  
  // Add typing effect for news title
  useEffect(() => {
    if (!latestNews) return;
    
    const fullText = latestNews?.title || '';
    
    if (typingIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypingText(prev => prev + fullText.charAt(typingIndex));
        setTypingIndex(prev => prev + 1);
      }, 50); // Speed of typing
      
      return () => clearTimeout(timeout);
    } else {
      // When typing is complete, wait and restart
      const restartTimeout = setTimeout(() => {
        setTypingText('');
        setTypingIndex(0);
      }, 3000); // Wait 3 seconds before restarting
      
      return () => clearTimeout(restartTimeout);
    }
  }, [typingIndex, latestNews]);

  if (!latestNews) return null;

  return (
    <div className="mb-6 md:mb-10 overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-r from-background-300/90 to-background-300/90 backdrop-blur-sm">
      <div className={`flex items-center h-12 sm:h-14 md:h-16 px-2 sm:px-4 relative ${isRtl ? 'flex-row-reverse' : ''}`}>
        {/* News Channel Label */}
        <div className={`flex-shrink-0 ${isRtl ? 'ml-2 sm:ml-3 md:ml-4' : 'mr-2 sm:mr-3 md:mr-4'} z-10`}>
          <div className={`flex items-center gap-1 sm:gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div className="relative">
              <Flame className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 z-10 relative animate-[ping_2s_ease-in-out_infinite]" />
              <div className="absolute -inset-1 bg-red-500/20 blur-sm rounded-full animate-[ping_3s_ease-in-out_infinite_alternate]"></div>
              <div className="absolute -inset-2 bg-red-500/10 blur-md rounded-full animate-[ping_4s_ease-in-out_infinite_alternate-reverse]"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-primary/50 opacity-70 blur-sm rounded-full duration-700 animate-[spin_8s_linear_infinite]"></div>
            </div>
            <span className="text-xs sm:text-sm font-medium relative">
              <span className="bg-gradient-to-r from-red-400 to-primary bg-clip-text text-transparent uppercase tracking-wider">{t('breaking')}</span>
              <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-red-500 to-transparent"></span>
            </span>
          </div>
        </div>
        
        {/* Ticker Line - The red line that appears in TV news tickers */}
        <div className={`absolute ${isRtl ? 'right-0' : 'left-0'} top-0 bottom-0 w-0.5 sm:w-1 bg-red-500`}></div>
        
        {/* News Ticker Content with Typing Effect */}
        <div className="flex-1 overflow-hidden relative h-full">
          <div 
            className={`absolute inset-0 bg-gradient-to-r ${isRtl ? 'from-background-300/90 to-transparent' : 'from-transparent to-background-300/90'} w-4 sm:w-8 z-10 ${isRtl ? 'left-0' : 'right-0'}`}
          ></div>
          
          <div className="flex items-center h-full px-1 sm:px-2 overflow-hidden">
            <div 
              className={`whitespace-nowrap flex items-center h-full ${isRtl ? 'justify-end' : 'justify-start'} w-full`}
              style={{ 
                direction: isRtl ? 'rtl' : 'ltr'
              }}
            >
              <Link 
                href={getLocalizedHref(`/news/${latestNews._id || ''}`)}
                className={`text-sm sm:text-base md:text-lg font-medium text-white flex items-center hover:text-primary transition-colors w-full`}
                key={`latest-news-${latestNews.id || 'empty'}`}
              >
                <span className={`inline-block flex-shrink-0 h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-red-500 animate-pulse ${isRtl ? 'ml-2 sm:ml-3' : 'mr-2 sm:mr-3'}`}></span>
                <span className="truncate max-w-full">
                  {typingText}
                  <span className="inline-block h-4 w-0.5 bg-primary ml-0.5 animate-blink"></span>
                </span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Label */}
        <div className={`flex-shrink-0 ${isRtl ? 'mr-1 sm:mr-2' : 'ml-1 sm:ml-2'} z-10 bg-background-300/90 py-0.5 sm:py-1 px-0.5 sm:px-1 rounded-full`}>
          <div className="flex items-center">
            <span className="text-xs text-primary/80 px-2 py-1 rounded-full bg-primary/10">
              {t('new')}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// CSS for animation - can be added to your global CSS
/*
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
*/ 