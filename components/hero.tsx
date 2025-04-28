"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
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
      imageSrc: "./main7.jpg",
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
    <section className="relative h-screen w-full overflow-hidden">
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
              <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background z-10" />
              <Image
                src={slides[currentSlide].imageSrc}
                alt={slides[currentSlide].title}
                fill
                className="object-cover object-center brightness-75"
                priority
              />
            </div>

            {/* Slide Content */}
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="max-w-3xl"
                >
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                  >
                    {slides[currentSlide].title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-200 mb-8"
                  >
                    {slides[currentSlide].description}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    {/* <Link href={slides[currentSlide].link}>
                      <Button className="bg-primary hover:bg-primary-dark text-white text-lg px-8 py-6 h-auto rounded-md">
                        {slides[currentSlide].cta}
                      </Button>
                    </Link> */}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute bottom-1/2 left-0 right-0 z-30 flex justify-between items-center px-4 md:px-8">
          <button
            onClick={prevSlide}
            className="bg-black/30 hover:bg-black/50 text-white p-2 rounded-full focus:outline-none transform transition-transform hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="bg-black/30 hover:bg-black/50 text-white p-2 rounded-full focus:outline-none transform transition-transform hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoplay(false);
                setTimeout(() => setIsAutoplay(true), 5000);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index
                  ? "bg-primary w-12"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
