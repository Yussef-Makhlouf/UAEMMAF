"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { useLocale } from "next-intl"
import { useMemo } from "react"

type Partner = {
  id: number
  name: string
  logo: string
}



export default function PartnersSection() {
  const t = useTranslations('partners')
  const locale = useLocale()
  const isRTL = locale === 'ar'

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

  // Create deterministic spaced sequence with no visible repeats
  const duplicatedPartners = useMemo(() => {
    const createDeterministicSequence = () => {
      const result: Partner[] = []
      const totalItems = 42 // 7 cycles of 6 partners each
      const minSpacing = 6 // Minimum positions between same partner
      
      for (let i = 0; i < totalItems; i++) {
        // Get partners that haven't appeared in the last minSpacing positions
        const recentPartners = result.slice(-minSpacing).map(p => p.id)
        let availablePartners = partners.filter(p => 
          !recentPartners.includes(p.id)
        )
        
        // If no partners available (early in sequence), just avoid immediate repeat
        if (availablePartners.length === 0) {
          const lastPartner = result[result.length - 1]
          availablePartners = partners.filter(p => 
            !lastPartner || p.id !== lastPartner.id
          )
        }
        
        // If still no partners (shouldn't happen), use all
        if (availablePartners.length === 0) {
          availablePartners = [...partners]
        }
        
        // Deterministically select partner using position-based algorithm
        const selectedIndex = i % availablePartners.length
        const selectedPartner = availablePartners[selectedIndex]
        
        result.push(selectedPartner)
      }
      
      return result
    }

    return createDeterministicSequence()
  }, []) // Empty dependency array ensures this only runs once on mount






  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background-200 overflow-hidden" dir="ltr">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="text-center mb-8 md:mb-12 lg:mb-16" dir={isRTL ? "rtl" : "ltr"}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3">
            {t('title')}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>
        {/* Infinite Scroll Partners */}
        <div className="relative overflow-hidden">
          <div 
            className="flex partners-scroll"
            style={{
              animation: 'infiniteScroll 25s linear infinite',
              transform: 'translateX(0)',
              willChange: 'transform'
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <div 
                key={`${partner.id}-${index}`} 
                className="group relative flex-shrink-0 mx-3 sm:mx-4 md:mx-6"
              >
                <div className="relative 
                  h-16 sm:h-20 md:h-24 lg:h-28
                  w-24 sm:w-28 md:w-32 lg:w-36
                  bg-white/95 backdrop-blur-sm
                  rounded-xl sm:rounded-2xl
                  p-2 sm:p-3 md:p-4
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
                
                {/* Optional partner name tooltip */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                  bg-gray-900 text-white text-xs px-2 py-1 rounded-md
                  opacity-0 group-hover:opacity-100 transition-all duration-300
                  pointer-events-none whitespace-nowrap z-20">
                  {partner.name}
                </div>
              </div>
            ))}
          </div>
          
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-background-200 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-background-200 to-transparent z-10 pointer-events-none"></div>
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
      
      {/* Global CSS for infinite scroll - Next.js compatible */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes infiniteScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-14.286%); }
          }
          
          /* Performance optimizations for smooth animation */
          .partners-scroll {
            backface-visibility: hidden;
            perspective: 1000px;
            transform-style: preserve-3d;
          }
        `
      }} />
    </section>
  )
}