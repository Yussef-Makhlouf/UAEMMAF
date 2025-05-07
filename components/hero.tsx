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
};

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  
  const slides: Slide[] = [
    {
      id: 1,
      imageSrc: "./hero3.jpeg",
      title: t('slide1.title'),
      description: t('slide1.description'),
      cta: t('slide1.cta'),
      link: "/about"
    },
    {
      id: 2,
      imageSrc: "./hero2.jpeg",
      title: t('slide2.title'),
      description: t('slide2.description'),
      cta: t('slide2.cta'),
      link: "/events/upcoming"
    },
    {
      id: 3,
      imageSrc: "./hero1.jpeg",
      title: t('slide3.title'),
      description: t('slide3.description'),
      cta: t('slide3.cta'),
      link: "/join-us/athletes"
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

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoplay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoplay, slides.length]);

  return (
    <section 
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Carousel */}
      <div className="relative h-full w-full">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={slides[currentSlide].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <div className="relative h-full w-full">
              <div className="absolute inset-0 z-10" />
              <Image
                src={slides[currentSlide].imageSrc}
                alt={slides[currentSlide].title}
                fill
                className="object-cover object-center"
                priority
              />
            </div>

            {/* Slide Content */}
            <div className="absolute inset-0 z-20 flex items-center">
    
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute bottom-1/2 left-0 right-0 z-30 flex justify-between items-center px-4 md:px-8">
          {locale === 'ar' ? (
            <>
              <button
                onClick={nextSlide}
                className={`bg-black/30 hover:bg-black/50 text-white p-2 rounded-full focus:outline-none transform transition-all duration-300 hover:scale-110 ${
                  isHovering ? 'opacity-100' : 'opacity-0'
                }`}
                aria-label="Next slide"
              >
                <ChevronRight size={24} />
              </button>
              <button
                onClick={prevSlide}
                className={`bg-black/30 hover:bg-black/50 text-white p-2 rounded-full focus:outline-none transform transition-all duration-300 hover:scale-110 ${
                  isHovering ? 'opacity-100' : 'opacity-0'
                }`}
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={prevSlide}
                className={`bg-black/30 hover:bg-black/50 text-white p-2 rounded-full focus:outline-none transform transition-all duration-300 hover:scale-110 ${
                  isHovering ? 'opacity-100' : 'opacity-0'
                }`}
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className={`bg-black/30 hover:bg-black/50 text-white p-2 rounded-full focus:outline-none transform transition-all duration-300 hover:scale-110 ${
                  isHovering ? 'opacity-100' : 'opacity-0'
                }`}
                aria-label="Next slide"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
