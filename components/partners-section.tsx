"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useState, useRef } from "react"
import { useLocale } from "next-intl"

type Partner = {
  id: number
  name: string
  logo: string
}

export default function PartnersSection() {
  const t = useTranslations('partners')
  const locale = useLocale()
  const isRTL = locale === 'ar'
  
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const scrollControls = useAnimation()
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const partners: Partner[] = [
    {
      id: 1,
      name: "IMMAF",
      logo: "part.png"
    },
    {
      id: 2,
      name: "UAE Ministry of Sports",
      logo: "part3.png"
    },
    {
      id: 4,
      name: "Dubai Sports Council",
      logo: "part4.png"
    },
    {
      id: 5,
      name: "Etihad Airways",
      logo: "part5.png"
    },
    {
      id: 6,
      name: "Dubai Sports Council",
      logo: "part6.png"
    },
    {
      id: 7,
      name: "Dubai Sports Council",
      logo: "part7.png"
    },
    {
      id: 8,
      name: "Dubai Sports Council",
      logo: "part8.png"
    },
    {
      id: 9,
      name: "Dubai Sports Council",
      logo: "part1.png"
    },
  ]

  // Calculate dimensions on mount and window resize
  useEffect(() => {
    const calculateSizes = () => {
      // Check if we're on mobile
      const isMobile = window.innerWidth < 768;
      
      // Width of one partner logo container (including padding)
      const logoWidth = isMobile ? 52 : 68; // 44px/60px logo + 8px padding
      const totalWidth = logoWidth * partners.length;
      setWidth(totalWidth);

      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    // Initial measurement
    calculateSizes();

    // Update on resize
    window.addEventListener('resize', calculateSizes);
    return () => window.removeEventListener('resize', calculateSizes);
  }, [partners.length]);

  // Enhanced infinite scrolling animation with RTL support and pause on hover
  useEffect(() => {
    if (inView && width > 0 && containerWidth > 0) {
      // Determine animation direction based on language
      const startX = isRTL ? -width : 0;
      const endX = isRTL ? 0 : -width;
      
      // Calculate duration based on width for consistent speed regardless of content amount
      const animationDuration = width / 20; // Adjust divisor to change speed

      // Only animate if not hovering on any partner
      if (hoveredId === null) {
        scrollControls.start({
          x: [startX, endX],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: animationDuration,
              ease: "linear",
            }
          }
        });
      } else {
        // Pause animation when hovering
        scrollControls.stop();
      }
    } else {
      scrollControls.stop();
    }
  }, [inView, scrollControls, width, isRTL, hoveredId, containerWidth]);

  // Partner hover handlers
  const handleMouseEnter = (id: number) => setHoveredId(id);
  const handleMouseLeave = () => setHoveredId(null);

  return (
    <section className="py-12 md:py-16 bg-background-200 overflow-hidden" dir="ltr">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12" dir={isRTL ? "rtl" : "ltr"}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3"
          >
            {t('title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto"
          >
            {t('description')}
          </motion.p>
        </div>

        <div ref={ref} className="relative">
          <div ref={containerRef} className="overflow-hidden rounded-xl">
            <motion.div
              animate={scrollControls}
              className="flex"
              style={{ width: width > 0 ? `${width * 2}px` : '200%' }}
            >
              {/* First set of partners */}
              <AnimatePresence>
                {partners.map((partner) => (
                  <motion.div
                    key={partner.id}
                    className="px-2 md:px-4 flex-none group cursor-pointer"
                    whileHover={{ 
                      scale: 1.05, 
                      y: -4,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    onMouseEnter={() => handleMouseEnter(partner.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="relative h-44 w-44 md:h-60 md:w-60 filter transition-all duration-500 bg-white rounded-[20px] md:rounded-[30px] p-2 md:p-3 shadow-lg md:shadow-xl group-hover:shadow-primary/20 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[20px] md:rounded-[30px]" />
                      <div className="relative h-full w-full">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          loading="lazy"
                          sizes="(max-width: 640px) 44px, (max-width: 768px) 60px, 240px"
                          className="object-contain p-2 md:p-3 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105 z-10"
                        />
                      </div>
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute bottom-2 md:bottom-3 left-0 right-0 text-center text-[10px] md:text-xs font-medium text-gray-800 bg-white/80 backdrop-blur-sm py-1 md:py-1.5 rounded-b-xl md:rounded-b-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        {partner.name}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Duplicate set for seamless looping */}
              <AnimatePresence>
                {partners.map((partner) => (
                  <motion.div
                    key={`dup-${partner.id}`}
                    className="px-2 md:px-4 flex-none group cursor-pointer"
                    whileHover={{ 
                      scale: 1.05, 
                      y: -4,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    onMouseEnter={() => handleMouseEnter(partner.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="relative h-44 w-44 md:h-60 md:w-60 filter transition-all duration-500 bg-white rounded-[20px] md:rounded-[30px] p-2 md:p-3 shadow-lg md:shadow-xl group-hover:shadow-primary/20 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[20px] md:rounded-[30px]" />
                      <div className="relative h-full w-full">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          loading="lazy"
                          sizes="(max-width: 640px) 44px, (max-width: 768px) 60px, 240px"
                          className="object-contain p-2 md:p-3 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105 z-10"
                        />
                      </div>
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute bottom-2 md:bottom-3 left-0 right-0 text-center text-[10px] md:text-xs font-medium text-gray-800 bg-white/80 backdrop-blur-sm py-1 md:py-1.5 rounded-b-xl md:rounded-b-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        {partner.name}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
          
          {/* Gradient fades at edges */}
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-24 bg-gradient-to-r from-background-200 to-transparent z-10" />
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-24 bg-gradient-to-l from-background-200 to-transparent z-10" />
        </div>
      </div>
    </section>
  )
}
