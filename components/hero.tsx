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
  
  const slides: Slide[] = [
    {
      id: 1,
      imageSrc: "./hero3.jpeg",
      title: t('slide1.title'),
      description: t('slide1.description'),
      cta: t('slide1.cta'),
      link: "/about",
      direction: "up",
      scale: "in"
    },
    {
      id: 2,
      imageSrc: "./hero2.jpeg",
      title: t('slide2.title'),
      description: t('slide2.description'),
      cta: t('slide2.cta'),
      link: "/events/upcoming",
      direction: "up",
      scale: "out"
    },
    {
      id: 3,
      imageSrc: "./hero1.jpeg",
      title: t('slide3.title'),
      description: t('slide3.description'),
      cta: t('slide3.cta'),
      link: "/join-us/athletes",
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
      className="relative w-full overflow-hidden"
      style={{ height: "100vh" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Carousel */}
      <div className="relative h-full w-full px-4 md:px-8">
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
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black/50" />
              <motion.div 
                className="absolute inset-0"
                initial={getImageAnimations(slides[currentSlide].direction, slides[currentSlide].scale).initial}
                animate={getImageAnimations(slides[currentSlide].direction, slides[currentSlide].scale).animate}
              >
                <Image
                  src={slides[currentSlide].imageSrc}
                  alt={slides[currentSlide].title}
                  fill
                  className="md:object-cover object-contain object-center"
                  sizes="100vw"
                  priority
                />
              </motion.div>
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

        {/* Navigation Dots */}
        <div className="absolute bottom-1 sm:bottom-2 md:bottom-3 left-0 right-0 z-30 flex justify-center">
          <div className={`flex space-x-1 bg-black/20 rounded-full px-2 py-1 ${locale === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 transform hover:scale-110 ${
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
