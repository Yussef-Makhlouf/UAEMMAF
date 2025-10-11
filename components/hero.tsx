"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  id: number;
  imageSrc: string;
  title: string;
  description: string;
  cta: string;
  link: string;
  direction?: "up" | "down" | "up" | "down"; // Animation direction
  scale?: "in" | "out"; // Zoom in or out
};

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  
  const slides: Slide[] = [
    {
      id: 1,
      imageSrc: "/hero3.jpeg",
      title: locale === 'ar' ? 'الاتحاد الإماراتي للفنون القتالية المختلطة' : 'UAE Mixed Martial Arts Federation',
      description: locale === 'ar' ? 'نحن نقود مستقبل الرياضة القتالية في دولة الإمارات العربية المتحدة' : 'Leading the future of combat sports in the United Arab Emirates',
      cta: t('slide1.cta'),
      link: "/mission/",
      direction: "up",
      scale: "in"
    },
    {
      id: 2,
      imageSrc: "/hero2.jpeg",
      title: locale === 'ar' ?  'انضم إلى الاتحاد الإماراتي للفنون القتالية المختلطة' : 'Join the UAEMMAF fighters',
      description: locale === 'ar' ? 'اكتشف قوتك الحقيقية وانضم إلى نخبة الاتحاد الإماراتي' : 'Discover your true strength and join the UAEMMAF fighters',
      cta: t('slide2.cta'),
      link: "https://uaemmaf.smoothcomp.com/en/federation/187/events/upcoming",
      direction: "up",
      scale: "out"
    },
    {
      id: 3,
      imageSrc: "/hero1.jpeg",
      title: locale === 'ar' ? 'التميز في الفنون القتالية المختلطة' : 'Excellence in Mixed Martial Arts',
      description: locale === 'ar' ? 'نبني أبطال المستقبل من خلال التدريب المتقدم والمنافسات العالمية' : 'Building future champions through advanced training and global competitions',
      cta: t('slide3.cta'),
      link: "https://uaemmaf.smoothcomp.com/en/federation/187/membership",
      direction: "up",
      scale: "in"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    // Pause autoplay briefly when manually changing slides
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 5000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    // Pause autoplay briefly when manually changing slides
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 5000);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    // Pause autoplay briefly when manually changing slides
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 5000);
  };

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoplay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoplay, slides.length]);

  // Animation variants for different directions
  const getImageAnimations = (direction?: string, scale?: string) => {
    const xMovement = direction === "left" ? 5 : direction === "right" ? -5 : 0;
    const yMovement = direction === "up" ? 5 : direction === "down" ? -5 : 0;
    const scaleChange = scale === "in" ? [1.05, 1.15] : [1.15, 1.05];
    
    return {
      initial: { 
        scale: scaleChange[0],
        x: 0,
        y: 0
      },
      animate: { 
        scale: scaleChange[1],
        x: `${xMovement}%`,
        y: `${yMovement}%`,
        transition: {
          duration: 5,
          ease: "linear"
        }
      }
    };
  };

  return (
    <section 
      className="relative w-full overflow-hidden h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[100vh]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Carousel */}
      <div className="relative h-full w-full px-0 md:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[currentSlide].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Background Image with Animation */}
            <div className="relative h-full w-full overflow-hidden">
              {/* Enhanced overlay for better text contrast */}
              <div className="absolute inset-0 z-10 bg-black/40" />
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
              <motion.div 
                className="absolute inset-0"
                initial={getImageAnimations(slides[currentSlide].direction, slides[currentSlide].scale).initial}
                animate={getImageAnimations(slides[currentSlide].direction, slides[currentSlide].scale).animate}
              >
                <Image
                  src={slides[currentSlide].imageSrc}
                  alt={slides[currentSlide].title}
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                  priority
                />
              </motion.div>
            </div>

            {/* Hero Content */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                <div className={`text-center text-white max-w-5xl mx-auto ${isRTL ? 'rtl' : 'ltr'}`}>
                  {/* Bold Headline - Responsive Typography */}
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}
                    style={{ 
                      textShadow: '2px 2px 4px rgba(0,0,0,0.7)', 
                      paddingBottom: '20px',
                      lineHeight: '1.5',
                      letterSpacing: isRTL ? '0.02em' : '0.01em'
                    }}
                  >
                    <div className="space-y-2 sm:space-y-3 md:space-y-4">
                      {slides[currentSlide].title.split('\\n').map((line, index) => (
                        <div key={index} className="block">
                          {line}
                        </div>
                      ))}
                    </div>
                  </motion.h1>
                  
                  
                  {/* Responsive CTA Buttons */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-row xs:flex-row flex-wrap gap-2 xs:gap-3 sm:gap-4 md:gap-6 justify-center items-center px-2"
                  >
                    <Link 
                      href={`/${locale}/mission/`}
                      className="group relative px-4 xs:px-5 sm:px-6 md:px-8 py-2 xs:py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-medium transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 text-xs xs:text-sm sm:text-base min-w-[120px] xs:min-w-[140px] sm:min-w-[160px] text-center"
                    >
                      {locale === 'ar' ? 'اعرف المزيد' : 'Learn More'}
                      <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                    
                    <Link 
                      href={`/${locale}/news`}
                      className="group relative px-4 xs:px-5 sm:px-6 md:px-8 py-2 xs:py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-medium transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 text-xs xs:text-sm sm:text-base min-w-[120px] xs:min-w-[140px] sm:min-w-[160px] text-center"
                    >
                      {locale === 'ar' ? 'آخر الأخبار' : 'Latest News'}
                      <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                    
                    <Link 
                      href="https://uaemmaf.smoothcomp.com/en/federation/187/events/upcoming"
                      target="_blank"
                      className="group relative px-4 xs:px-5 sm:px-6 md:px-8 py-2 xs:py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-medium transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 text-xs xs:text-sm sm:text-base min-w-[120px] xs:min-w-[140px] sm:min-w-[160px] text-center"
                    >
                      {locale === 'ar' ? 'جدول الفعاليات' : 'Events Calendar'}
                      <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                    
                    <Link 
                      href="https://uaemmaf.smoothcomp.com/en/federation/187/membership"
                      target="_blank"
                      className="group relative px-4 xs:px-5 sm:px-6 md:px-8 py-2 xs:py-2.5 sm:py-3 bg-primary/80 backdrop-blur-sm border border-primary/40 rounded-full text-white font-medium transition-all duration-300 hover:bg-primary hover:scale-105 text-xs xs:text-sm sm:text-base min-w-[120px] xs:min-w-[140px] sm:min-w-[160px] text-center shadow-lg"
                    >
                      {locale === 'ar' ? 'انضم إلينا' : 'Join Us'}
                      <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons - Mobile Optimized */}
        <div className="absolute bottom-1/2 left-0 right-0 z-30 flex justify-between items-center px-2 sm:px-4 md:px-8">
          {locale === 'ar' ? (
            <>
              <button
                onClick={nextSlide}
                className={`bg-black/30 hover:bg-black/50 text-white p-1.5 sm:p-2 rounded-full focus:outline-none transform transition-all duration-300 hover:scale-110 ${
                  isHovering ? 'opacity-100' : 'opacity-0'
                }`}
                aria-label="Next slide"
              >
                <ChevronRight size={20} className="sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={prevSlide}
                className={`bg-black/30 hover:bg-black/50 text-white p-1.5 sm:p-2 rounded-full focus:outline-none transform transition-all duration-300 hover:scale-110 ${
                  isHovering ? 'opacity-100' : 'opacity-0'
                }`}
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={prevSlide}
                className={`bg-black/30 hover:bg-black/50 text-white p-1.5 sm:p-2 rounded-full focus:outline-none transform transition-all duration-300 hover:scale-110 ${
                  isHovering ? 'opacity-100' : 'opacity-0'
                }`}
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={nextSlide}
                className={`bg-black/30 hover:bg-black/50 text-white p-1.5 sm:p-2 rounded-full focus:outline-none transform transition-all duration-300 hover:scale-110 ${
                  isHovering ? 'opacity-100' : 'opacity-0'
                }`}
                aria-label="Next slide"
              >
                <ChevronRight size={20} className="sm:w-6 sm:h-6" />
              </button>
            </>
          )}
        </div>

        {/* Navigation Dots - Mobile Optimized */}
        <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-0 right-0 z-30 flex justify-center">
          <div className={`flex space-x-1 bg-black/20 rounded-full px-2 py-1 ${locale === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  currentSlide === index 
                    ? 'bg-white scale-110' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
