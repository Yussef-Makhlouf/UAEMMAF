"use client"

import { useTranslations, useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { CalendarDays, ArrowRight, Flame, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"

type NewsItem = {
  id: number
  title: string
  excerpt: string
  date: string
  image: string
  slug: string
  category: string
}

type HotNewsItem = {
  id: number
  titleKey: string
  slug: string
}

export default function NewsSection() {
  const t = useTranslations('news')
  const locale = useLocale()
  const [activeHotNews, setActiveHotNews] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const isRtl = locale === 'ar'
  
  // Create localized links
  const getLocalizedHref = (path: string) => {
    if (path.startsWith('http')) {
      return path
    }
    return `/${locale}${path.startsWith('/') ? path : `/${path}`}`
  }

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Hot news items - using translation keys instead of hardcoded text
  const hotNewsItems: HotNewsItem[] = [
    {
      id: 1,
      titleKey: 'hotNews.item1',
      slug: "uae-mma-new-tournament",
    },
    {
      id: 2,
      titleKey: 'hotNews.item2',
      slug: "national-team-trials",
    },
    {
      id: 3,
      titleKey: 'hotNews.item3',
      slug: "sports-medicine-partnership",
    }
  ]

  // Regular news items
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: t('article1.title'),
      excerpt: t('article1.excerpt'),
      date: "2025-05-15",
      image: "/main.jpg",
      slug: "uae-mma-championship-success",
      category: "championships"
    },
    {
      id: 2,
      title: t('article2.title'),
      excerpt: t('article2.excerpt'),
      date: "2025-04-28",
      image: "/main1.jpg",
      slug: "uaemmaf-signs-partnership-agreement-with-immaf",
      category: "partnerships"
    },
    {
      id: 3,
      title: t('article3.title'),
      excerpt: t('article3.excerpt'),
      date: "2025-04-10",
      image: "/main2.jpg",
      slug: "youth-mma-development-program-launched",
      category: "development"
    }
  ]

  // Auto-rotate hot news items
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHotNews((prev) => (prev + 1) % hotNewsItems.length)
    }, 6000)
    
    return () => clearInterval(interval)
  }, [hotNewsItems.length])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  // Format date to display in a localized format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  // Function to navigate to previous hot news item
  const goToPrevHotNews = () => {
    setActiveHotNews((prev) => (prev - 1 + hotNewsItems.length) % hotNewsItems.length)
  }

  // Function to navigate to next hot news item
  const goToNextHotNews = () => {
    setActiveHotNews((prev) => (prev + 1) % hotNewsItems.length)
  }

  // Function to navigate to previous slide
  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newsItems.length) % newsItems.length)
  }

  // Function to navigate to next slide
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newsItems.length)
  }

  // Animation directions based on language direction
  const getSlideAnimation = (direction: 'in' | 'out') => {
    if (direction === 'in') {
      return { 
        initial: { x: isRtl ? -20 : 20, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: isRtl ? 20 : -20, opacity: 0 }
      }
    } else {
      return {
        initial: { x: isRtl ? 20 : -20, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: isRtl ? -20 : 20, opacity: 0 }
      }
    }
  }

  const slideAnimation = getSlideAnimation('in')

  // Get the second card index
  const getSecondCardIndex = () => {
    return (currentSlide + 1) % newsItems.length
  }

  // Create a NewsCard component for reuse
  const NewsCard = ({ item }: { item: NewsItem }) => (
    <div className={`bg-background-300 rounded-lg overflow-hidden border border-gray-800 hover:border-primary/50 transition-colors group ${isRtl ? 'rtl' : ''} w-full max-w-md mx-auto`}>
      <div className="relative h-40 sm:h-48 w-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          loading="lazy"
          className="object-cover transition-transform group-hover:scale-105 duration-500"
        />
        <div className={`absolute top-3 md:top-4 ${isRtl ? 'left-3 md:left-4' : 'right-3 md:right-4'} bg-primary px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs font-medium text-white`}>
          {t(`categories.${item.category}`)}
        </div>
      </div>
      <div className="p-4 md:p-6">
        <div className={`flex items-center text-gray-400 text-xs md:text-sm mb-2 md:mb-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <CalendarDays className={`h-3 w-3 md:h-4 md:w-4 ${isRtl ? 'ml-1.5 md:ml-2' : 'mr-1.5 md:mr-2'}`} />
          <span>{formatDate(item.date)}</span>
        </div>
        <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {item.title}
        </h3>
        <p className="text-sm md:text-base text-gray-400 mb-3 md:mb-4 line-clamp-3">
          {item.excerpt}
        </p>
        <Link href={getLocalizedHref(`/news/${item.slug}`)} className={`text-sm md:text-base text-primary font-medium inline-flex items-center group-hover:underline ${isRtl ? 'flex-row-reverse' : ''}`}>
          {t('readMore')}
          {isRtl ? (
            <ArrowRight className="mr-1 md:mr-1 h-3 w-3 md:h-4 md:w-4 rotate-180" />
          ) : (
            <ArrowRight className="ml-1 md:ml-1 h-3 w-3 md:h-4 md:w-4" />
          )}
        </Link>
      </div>
    </div>
  )

  return (
    <section className="py-12 md:py-20 bg-background-200">
      <div className="container mx-auto px-4">
        {/* Hot News Line - Redesigned */}
        <div className="mb-6 md:mb-10 overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-r from-background-300/90 via-background-300/70 to-background-300/90 backdrop-blur-sm shadow-lg">
          <div className={`flex flex-col sm:flex-row items-center py-3 px-3 sm:py-0 sm:h-16 sm:px-4 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
            {/* Breaking News Label */}
            <div className={`flex-shrink-0 w-full sm:w-auto mb-2 sm:mb-0 ${isRtl ? 'sm:ml-3 md:ml-4' : 'sm:mr-3 md:mr-4'}`}>
              <div className={`flex items-center justify-center sm:justify-start gap-1.5 md:gap-2 bg-primary px-3 py-1.5 rounded-md text-sm font-semibold text-white shadow-md ${isRtl ? 'flex-row-reverse' : ''}`}>
                <Flame className="h-4 w-4 animate-pulse" />
                <span>{t('breaking')}</span>
              </div>
            </div>

            {/* News Content - Full width on mobile */}
            <div className="flex-1 relative overflow-hidden w-full sm:w-auto h-10 sm:h-full mx-0 sm:mx-3 mb-2 sm:mb-0 order-3 sm:order-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHotNews}
                  initial={slideAnimation.initial}
                  animate={slideAnimation.animate}
                  exit={slideAnimation.exit}
                  transition={{ duration: 0.4 }}
                  className="flex items-center justify-center sm:justify-start h-full"
                >
                  <Link 
                    href={getLocalizedHref(`/news/${hotNewsItems[activeHotNews].slug}`)}
                    className={`text-sm md:text-base font-medium text-white hover:text-primary transition-colors flex items-center w-full ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}
                  >
                    <span className={`inline-block h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-red-500 animate-pulse ${isRtl ? 'ml-2 md:ml-3' : 'mr-2 md:mr-3'}`}></span>
                    {t(hotNewsItems[activeHotNews].titleKey)}
                    {isRtl ? (
                      <ArrowLeft className="mr-1.5 md:mr-2 h-3.5 w-3.5 md:h-4 md:w-4 opacity-80" />
                    ) : (
                      <ArrowLeft className="ml-1.5 md:ml-2 h-3.5 w-3.5 md:h-4 md:w-4 opacity-80" />
                    )}
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls in a row on mobile */}
            <div className={`flex items-center order-2 sm:order-3 mb-1 sm:mb-0 ${isRtl ? 'flex-row-reverse' : ''}`}>
              {/* Arrow Navigation - Left/Previous */}
              <button 
                onClick={goToPrevHotNews}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white transform transition-all duration-300 hover:scale-110"
                aria-label={isRtl ? "Next news" : "Previous news"}
              >
                {isRtl ? <ChevronLeft className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
              </button>

              {/* Pagination Dots */}
              <div className={`flex-shrink-0 mx-2 md:mx-3`}>
                <div className={`flex space-x-1.5 md:space-x-2 ${isRtl ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {hotNewsItems.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveHotNews(idx)}
                      className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                        idx === activeHotNews ? "w-5 md:w-6 bg-primary" : "w-1.5 md:w-2 bg-gray-600 hover:bg-gray-500"
                      }`}
                      aria-label={`Go to news item ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Arrow Navigation - Right/Next */}
              <button 
                onClick={goToNextHotNews}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white transform transition-all duration-300 hover:scale-110"
                aria-label={isRtl ? "Previous news" : "Next news"}
              >
                {isRtl ? <ChevronRight className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        <div className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 ${isRtl ? 'rtl' : ''}`}>
          <div>
            <h2 className="text-primary text-base md:text-lg font-medium">{t('latestNews')}</h2>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-1 md:mt-2">
              {t('title')}
            </h3>
          </div>
          <Link href={getLocalizedHref('/news')} className="mt-4 md:mt-0">
            <Button variant="outline" className={`text-sm md:text-base text-white border-primary hover:bg-primary/10 group ${isRtl ? 'flex flex-row-reverse' : ''}`}>
              {t('viewAll')}
              {isRtl ? (
                <ArrowRight className="mr-1.5 md:mr-2 h-3 w-3 md:h-4 md:w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              ) : (
                <ArrowRight className="ml-1.5 md:ml-2 h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
              )}
            </Button>
          </Link>
        </div>

        <div className="relative">
          {/* Slider Navigation - Left Arrow */}
          {isRtl ? (
            <>
              <button
                onClick={goToNextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 md:-mr-5 z-10 h-8 w-8 md:h-12 md:w-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white transform transition-all duration-300 hover:scale-110"
                aria-label="Next slide"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
              </button>
              <button
                onClick={goToPrevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 md:-ml-5 z-10 h-8 w-8 md:h-12 md:w-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white transform transition-all duration-300 hover:scale-110"
                aria-label="Previous slide"
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={goToPrevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 md:-ml-5 z-10 h-8 w-8 md:h-12 md:w-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white transform transition-all duration-300 hover:scale-110"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
              </button>
              <button
                onClick={goToNextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 md:-mr-5 z-10 h-8 w-8 md:h-12 md:w-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white transform transition-all duration-300 hover:scale-110"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </>
          )}

          {/* News Cards Slider */}
          <div className="overflow-hidden">
            <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="relative w-full"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ x: isRtl ? -600 : 600, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: isRtl ? 600 : -600, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {/* First Card - Always visible */}
                  <div className="mx-auto w-full max-w-md">
                    <NewsCard item={newsItems[currentSlide]} />
                  </div>

                  {/* Second Card - Hidden on mobile */}
                  <div className="hidden md:block mx-auto w-full max-w-md">
                    <NewsCard item={newsItems[getSecondCardIndex()]} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Slider Pagination Dots */}
        <div className="flex justify-center mt-8">
          <div className={`flex space-x-2 ${isRtl ? 'flex-row-reverse space-x-reverse' : ''}`}>
            {newsItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? "w-8 bg-primary" : "w-2 bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 