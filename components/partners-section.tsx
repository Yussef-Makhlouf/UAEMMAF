"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { useLocale } from "next-intl"
import React, { useRef, useEffect, useCallback, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

// cn utility function (similar to clsx or classnames)
function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

const useAnimationFrame = (callback: (time: number, delta: number) => void) => {
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== null && previousTimeRef.current !== undefined) {
      const delta = time - previousTimeRef.current;
      callback(time, delta);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [callback]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);
};

interface MarqueeProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  speed?: number;
  vertical?: boolean;
  repeat?: number;
}

function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  speed = 50,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const singleContentBlockRef = useRef<HTMLDivElement | null>(null);
  const animX = useRef<number>(0);
  const isPaused = useRef<boolean>(false);

  useAnimationFrame((t, delta) => {
    if (!containerRef.current || !contentRef.current || !singleContentBlockRef.current) return;
    
    // إزالة آلية التوقف عند التمرير تماماً
    // if (pauseOnHover && isPaused.current) {
    //   return;
    // }

    const singleContentBlockSize = vertical 
      ? singleContentBlockRef.current.offsetHeight 
      : singleContentBlockRef.current.offsetWidth;

    const contentStyle = window.getComputedStyle(contentRef.current);
    const computedGap = parseFloat(vertical ? contentStyle.rowGap || '0' : contentStyle.columnGap || '0');
    const loopDistance = singleContentBlockSize + computedGap;
    
    // ضمان حد أدنى للسرعة
    const minSpeed = 10;
    const effectiveSpeed = Math.max(speed, minSpeed);
    const dx = (effectiveSpeed * delta) / 1000;
    const effectiveDx = reverse ? dx : -dx;
    animX.current += effectiveDx;

    // إعادة التموضع عند انتهاء الحلقة
    if (animX.current < -loopDistance) {
      animX.current += loopDistance;
    } else if (animX.current > 0) {
      animX.current -= loopDistance;
    }

    // ضمان عدم توقف الحركة أبداً
    if (Math.abs(effectiveDx) < 0.001) {
      // إذا كانت الحركة بطيئة جداً، أعطها دفعة
      animX.current += reverse ? 0.1 : -0.1;
    }

    if (vertical) {
      contentRef.current.style.transform = `translateY(${animX.current}px)` ;
    } else {
      contentRef.current.style.transform = `translateX(${animX.current}px)` ;
    }
  });

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      isPaused.current = true;
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      isPaused.current = false;
    }
  }, [pauseOnHover]);

  return (
    <div
      {...props}
      ref={containerRef}
      className={cn(
        "group flex overflow-hidden p-2 [--gap:2rem] [gap:var(--gap)]" +
          (vertical ? " flex-col" : " flex-row"),
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={contentRef}
        className={cn(
          "flex shrink-0 justify-around [gap:var(--gap)]" +
            (vertical ? " flex-col" : " flex-row")
        )}
      >
        {Array(repeat)
          .fill(0)
          .map((_, i) => (
            <div key={i} ref={i === 0 ? singleContentBlockRef : null} className="flex gap-8">
              {children}
            </div>
          ))}
      </div>
    </div>
  );
}

type Partner = {
  id: number
  name: string
  logo: string
}

export default function PartnersSection() {
  const t = useTranslations('partners')
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const [isReverse, setIsReverse] = useState(false)
  const [marqueeSpeed, setMarqueeSpeed] = useState(50)
  const [isScrolling, setIsScrolling] = useState(true)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const stuckCounterRef = useRef(0)

  const partners: Partner[] = [
    {
      id: 1,
      name: "Premier Motors Defender",
      logo: "/logo1.svg"
    },
    {
      id: 2,
      name: "Abu Dhabi Sports TV",
      logo: "/logo2.svg"
    },
    {
      id: 3,
      name: "Palms Sports",
      logo: "/logo5.svg"
    },
    {
      id: 4,
      name: "Partner 4",
      logo: "/logo3.svg"
    },
    {
      id: 5,
      name: "Partner 5",
      logo: "/logo6.svg"
    }
  ]

  // دالة للتحكم في السرعة
  const handleScrollLeft = () => {
    setIsReverse(true);
    setMarqueeSpeed(prev => Math.max(20, prev - 5)); // نقصان تدريجي (بحد أدنى 20)
    setIsScrolling(true);
    stuckCounterRef.current = 0;

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(true);
    }, 100);
  };

  const handleScrollRight = () => {
    setIsReverse(false);
    setMarqueeSpeed(prev => Math.min(80, prev + 5)); // زيادة تدريجية (بحد أقصى 80)
    setIsScrolling(true);
    stuckCounterRef.current = 0;

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(true);
    }, 100);
  };

  // حماية من فقدان التركيز أو تغيير التبويب
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // عند العودة للتبويب، تأكد من استمرار التمرير
        setIsScrolling(true);
        setMarqueeSpeed(prev => Math.max(30, Math.min(prev, 70))); // إعادة السرعة الطبيعية
      }
    };

    const handleFocus = () => {
      setIsScrolling(true);
      stuckCounterRef.current = 0;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // تنظيف المؤقتات عند إلغاء المكون
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background-200 overflow-hidden" dir="ltr">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" >
        <div className="text-center mb-8 md:mb-12 lg:mb-16" dir={isRTL ? "rtl" : "ltr"}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3">
            {t('title')}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Infinite Scrolling Partners Container with Side Navigation */}
        <div className="relative flex items-center gap-2 sm:gap-4 md:gap-6">
          {/* Left Navigation Button */}
          <button
            onClick={handleScrollLeft}
            className={cn(
              "flex-shrink-0 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12",
              "rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-white/20",
              "flex items-center justify-center transition-all duration-300 hover:scale-110",
              "hover:bg-white hover:shadow-xl",
              isReverse ? "text-primary bg-primary/10 border-primary/30" : "text-gray-700"
            )}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>

          {/* Partners Container */}
          <div className="flex-1 relative overflow-hidden rounded-xl sm:rounded-2xl p-2 sm:p-4">
            <Marquee
              className="[--gap:0.75rem] sm:[--gap:1.5rem] md:[--gap:2rem]"
              pauseOnHover={false}
              speed={marqueeSpeed}
              reverse={isReverse}
              repeat={9} // 👈 تكرار كافٍ لضمان سلاسة التمرير
            >
              {partners.map((partner, index) => (
                <div 
                  key={`${partner.id}-${index}`} 
                  className="group relative flex-shrink-0"
                >
                  <div className="relative 
                    h-16 xs:h-18 sm:h-20 md:h-24 lg:h-28 xl:h-32
                    w-20 xs:w-22 sm:w-24 md:w-28 lg:w-32 xl:w-36
                    bg-white/95 backdrop-blur-sm
                    rounded-lg sm:rounded-xl md:rounded-2xl
                    p-2 xs:p-2.5 sm:p-3 md:p-4 lg:p-5
                    shadow-lg shadow-black/10
                    border border-white/20
                    transition-all duration-500 ease-out
                    hover:scale-105 hover:shadow-2xl hover:shadow-primary/20
                    hover:bg-white
                    hover:-translate-y-2
                    group-hover:border-primary/30
                  ">
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Logo container */}
                    <div className="relative h-full w-full z-10">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        loading="lazy"
                        sizes="
                          (max-width: 480px) 80px,
                          (max-width: 640px) 96px, 
                          (max-width: 768px) 112px, 
                          (max-width: 1024px) 128px, 
                          144px"
                        className="object-contain transition-all duration-500 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Hover effect ring */}
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl ring-2 ring-transparent group-hover:ring-primary/20 transition-all duration-500"></div>
                  </div>
                </div>
              ))}
            </Marquee>
            
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 w-8 sm:w-12 md:w-16 lg:w-20 h-full bg-gradient-to-r from-background-200 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 w-8 sm:w-12 md:w-16 lg:w-20 h-full bg-gradient-to-l from-background-200 to-transparent z-10 pointer-events-none"></div>
          </div>

          {/* Right Navigation Button */}
          <button
            onClick={handleScrollRight}
            className={cn(
              "flex-shrink-0 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12",
              "rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-white/20",
              "flex items-center justify-center transition-all duration-300 hover:scale-110",
              "hover:bg-white hover:shadow-xl",
              !isReverse ? "text-primary bg-primary/10 border-primary/30" : "text-gray-700"
            )}
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Enhanced decorative elements */}
        <div className="flex justify-center mt-8 md:mt-12">
          <div className="flex space-x-2">
            {partners.map((_, index) => (
              <div 
                key={index}
                className="w-2 h-2 rounded-full bg-primary/30 animate-pulse"
                style={{
                  animationDelay: `${index * 200}ms`,
                  animationDuration: '2s'
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}