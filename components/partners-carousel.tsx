"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { useLocale } from "next-intl"
import React, { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

// cn utility function
function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

type Partner = {
  id: number
  name: string
  logo: string
}

export default function PartnersCarousel() {
  const t = useTranslations('partners')
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

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
      logo: "/logo3.svg"
    },
    {
      id: 4,
      name: "Partner 4",
      logo: "/logo5.svg"
    },
    {
      id: 5,
      name: "Partner 5",
      logo: "/logo6.svg"
    },
    {
      id: 6,
      name: "Partner 6",
      logo: "/logo1.svg"
    }
  ]

  // التمرير التلقائي
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % Math.ceil(partners.length / 3))
      }, 3000) // كل 3 ثوانٍ
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, partners.length])

  // إيقاف التمرير التلقائي عند التفاعل
  const handleManualNavigation = (direction: 'next' | 'prev') => {
    setIsAutoPlaying(false)
    
    if (direction === 'next') {
      setCurrentIndex(prev => (prev + 1) % Math.ceil(partners.length / 3))
    } else {
      setCurrentIndex(prev => prev === 0 ? Math.ceil(partners.length / 3) - 1 : prev - 1)
    }

    // إعادة تشغيل التمرير التلقائي بعد 5 ثوانٍ
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 5000)
  }

  // الحصول على الشعارات المرئية (3 شعارات)
  const getVisiblePartners = () => {
    const startIndex = currentIndex * 3
    const visiblePartners = []
    
    for (let i = 0; i < 3; i++) {
      const index = (startIndex + i) % partners.length
      visiblePartners.push(partners[index])
    }
    
    return visiblePartners
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background-200 overflow-hidden" dir="ltr">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16" dir={isRTL ? "rtl" : "ltr"}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3">
            {t('title')}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Mobile Carousel */}
        <div className="block lg:hidden">
          <div className="relative flex items-center gap-4">
            {/* Left Button */}
            <button
              onClick={() => handleManualNavigation('prev')}
              className="flex-shrink-0 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm
                shadow-lg border border-white/20 flex items-center justify-center
                transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-xl
                text-gray-700"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Partners Container */}
            <div className="flex-1 overflow-hidden rounded-xl  p-4">
              <div className="flex gap-3 transition-transform duration-500 ease-in-out">
                {getVisiblePartners().map((partner, index) => (
                  <div 
                    key={`${partner.id}-${currentIndex}-${index}`}
                    className="group relative flex-shrink-0 flex-1"
                  >
                    <div className="relative 
                      h-16 w-full
                      bg-white/95 backdrop-blur-sm
                      rounded-lg p-1
                      shadow-lg shadow-black/10
                      border border-white/20
                      transition-all duration-500 ease-out
                      hover:scale-105 hover:shadow-2xl hover:shadow-primary/20
                      hover:bg-white hover:-translate-y-2
                      group-hover:border-primary/30
                    ">
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Logo */}
                      <div className="relative h-full w-full z-10">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          loading="lazy"
                          sizes="(max-width: 768px) 120px, 140px"
                          className="object-contain transition-all duration-500 group-hover:scale-110"
                        />
                      </div>
                      
                      {/* Hover ring */}
                      <div className="absolute inset-0 rounded-lg ring-2 ring-transparent group-hover:ring-primary/20 transition-all duration-500"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Button */}
            <button
              onClick={() => handleManualNavigation('next')}
              className="flex-shrink-0 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm
                shadow-lg border border-white/20 flex items-center justify-center
                transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-xl
                text-gray-700"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Indicators */}
          <div className="flex justify-center mt-6">
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(partners.length / 3) }, (_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index)
                    setIsAutoPlaying(false)
                    setTimeout(() => setIsAutoPlaying(true), 5000)
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    currentIndex === index 
                      ? "bg-primary scale-125" 
                      : "bg-white/30 hover:bg-white/50"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
            {partners.map((partner) => (
              <div 
                key={partner.id}
                className="group relative"
              >
                <div className="relative 
                  h-32 lg:h-36 xl:h-40
                  bg-white/95 backdrop-blur-sm
                  rounded-xl lg:rounded-2xl
                  p-5 lg:p-6
                  shadow-lg shadow-black/10
                  border border-white/20
                  transition-all duration-500 ease-out
                  hover:scale-105 hover:shadow-2xl hover:shadow-primary/20
                  hover:bg-white hover:-translate-y-2
                  group-hover:border-primary/30
                ">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Logo */}
                  <div className="relative h-full w-full z-10">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      loading="lazy"
                      sizes="(max-width: 1024px) 180px, 220px"
                      className="object-contain transition-all duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Hover ring */}
                  <div className="absolute inset-0 rounded-xl lg:rounded-2xl ring-2 ring-transparent group-hover:ring-primary/20 transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
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
