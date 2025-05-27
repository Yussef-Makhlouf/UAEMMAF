"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { IoChevronForward, IoChevronBack } from "react-icons/io5"
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
  


  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

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

  // Number of slides to show based on screen size
  const [slidesToShow, setSlidesToShow] = useState(3);
  
  // Update slides to show based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        // Mobile - show 1 slide
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        // Tablet - show 2 slides
        setSlidesToShow(2);
      } else {
        // Desktop - show 3 slides
        setSlidesToShow(3);
      }
    };
    
    // Set initial value
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation functions to move one image at a time
  const handlePrev = () => {
    setCurrentIndex(prev => {
      // Move back by one position but handle the circular behavior
      if (prev === 0) {
        return partners.length - 1; // Loop back to the end
      } else {
        return prev - 1;
      }
    });
  };

  const handleNext = () => {
    setCurrentIndex(prev => {
      // Move forward by one position but handle the circular behavior
      if (prev === partners.length - 1) {
        return 0; // Loop back to the beginning
      } else {
        return prev + 1;
      }
    });
  };

  // Calculate visible partners based on currentIndex
  const getVisiblePartners = () => {
    const visiblePartners = [];
    
    // Add slidesToShow partners starting from currentIndex
    for (let i = 0; i < slidesToShow; i++) {
      const index = (currentIndex + i) % partners.length;
      visiblePartners.push(partners[index]);
    }
    
    return visiblePartners;
  };





  return (
    <section className="py-12 md:py-16 bg-background-200 overflow-hidden" dir="ltr">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12" dir={isRTL ? "rtl" : "ltr"}>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3">
            {t('title')}
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="relative">
          <div className="relative">
            {/* Left arrow */}
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-primary/80 hover:bg-primary rounded-full flex items-center justify-center cursor-pointer shadow-lg"
              onClick={handlePrev}
            >
              <IoChevronBack className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            
            {/* Right arrow */}
            <div 
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-primary/80 hover:bg-primary rounded-full flex items-center justify-center cursor-pointer shadow-lg"
              onClick={handleNext}
            >
              <IoChevronForward className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
          
            <div className="flex justify-center overflow-hidden rounded-xl py-8">
              {/* Multiple partners filling the display area with responsive design */}
              <div className="flex w-full justify-center sm:justify-between px-2 sm:px-4 md:px-8 lg:px-12 max-w-5xl mx-auto">
                {getVisiblePartners().map((partner, index) => (
                  <div key={partner.id} className={`
                    ${slidesToShow === 1 ? 'w-3/4' : 'flex-1'} 
                    mx-1 sm:mx-2 md:mx-3 lg:mx-4
                    ${slidesToShow < 3 && index >= slidesToShow ? 'hidden' : ''}
                  `}>
                    <div className="relative 
                      h-32 sm:h-36 md:h-40 lg:h-44 
                      w-full 
                      bg-white rounded-[16px] sm:rounded-[20px] md:rounded-[24px] 
                      p-2 sm:p-3 md:p-4 
                      shadow-lg overflow-hidden">
                      <div className="relative h-full w-full">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          loading="eager"
                          sizes="
                            (max-width: 640px) 75vw, 
                            (max-width: 768px) 45vw, 
                            (max-width: 1024px) 30vw, 
                            280px"
                          className="object-contain p-2 sm:p-3"
                        />
                      </div>
                     
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}