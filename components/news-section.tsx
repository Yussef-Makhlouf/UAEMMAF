"use client"

import { useTranslations, useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarDays, ArrowRight, Flame, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import NewsTicker from "@/components/news-ticker"

type NewsApiItem = {
  _id: string
  title: {
    ar: string
    en: string
  }
  content: {
    ar: string
    en: string
  }
  image: Array<{
    secure_url: string
    public_id: string
    _id: string
  }>
  category: {
    _id: string
    name: {
      ar: string
      en: string
    }
  }
  customId: string
  date: string
  __v: number
}

type NewsItem = {
  id: string
  title: string
  excerpt: string
  date: string
  image: string
  _id: string
  category: string
}

export default function NewsSection() {
  const t = useTranslations('news')
  const locale = useLocale()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const isRtl = locale === 'ar'
  
  // Add screen size detection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkScreenSize = () => {
        setIsLargeScreen(window.innerWidth >= 1024);
      };

      // Check initially
      checkScreenSize();

      // Add event listener
      window.addEventListener('resize', checkScreenSize);

      // Cleanup
      return () => window.removeEventListener('resize', checkScreenSize);
    }
  }, []);

  // Create localized links
  const getLocalizedHref = (path: string) => {
    if (path.startsWith('http')) {
      return path
    }
    return `/${locale}${path.startsWith('/') ? path : `/${path}`}`
  }

  // Extract an excerpt from content
  const extractExcerpt = (content: string, maxLength: number = 150): string => {
    if (!content) return '';
    
    // Remove any markdown or HTML-like syntax
    const cleanContent = content.replace(/\n/g, ' ').replace(/\s+/g, ' ');
    
    if (cleanContent.length <= maxLength) {
      return cleanContent;
    }
    
    // Find the last space before maxLength
    const lastSpace = cleanContent.substring(0, maxLength).lastIndexOf(' ');
    return cleanContent.substring(0, lastSpace) + '...';
  };

  // Fetch news from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://mmaf.onrender.com/news/getallnews');
        const data = await response.json();
        
        if (data && data.news && Array.isArray(data.news)) {
          const formattedNews = data.news
            .map((item: NewsApiItem) => ({
              id: item._id,
              title: item.title[locale as keyof typeof item.title] || item.title.en,
              excerpt: extractExcerpt(item.content[locale as keyof typeof item.content] || item.content.en),
              date: item.date,
              image: item.image[0]?.secure_url || '', // Use the first image from the array
              _id: item._id,
              category: item.category.name[locale as keyof typeof item.category.name] || item.category.name.en
            }))
            .sort((a: NewsItem, b: NewsItem) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date descending
          
          setNewsItems(formattedNews);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
  }, [locale]);

  // Format date to display in a localized format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  // Function to navigate to previous slide
  const goToPrevSlide = () => {
    setCurrentSlide((prev) => {
      const newIndex = prev - 1;
      return newIndex < 0 ? newsItems.length - 1 : newIndex;
    });
  };

  // Function to navigate to next slide
  const goToNextSlide = () => {
    setCurrentSlide((prev) => {
      const newIndex = prev + 1;
      return newIndex >= newsItems.length ? 0 : newIndex;
    });
  };

  // Get the second and third card indices
  const getSecondCardIndex = () => {
    return newsItems.length > 1 ? (currentSlide + 1) % newsItems.length : 0
  }

  const getThirdCardIndex = () => {
    return newsItems.length > 2 ? (currentSlide + 2) % newsItems.length : 0
  }

  // Create a NewsCard component for reuse
  const NewsCard = ({ item }: { item: NewsItem }) => (
    <div className={`bg-background-300 rounded-lg overflow-hidden border border-gray-800 hover:border-primary/50 transition-all duration-300 group ${isRtl ? 'rtl' : ''} w-full max-w-md mx-auto hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1`}>
      <div className="relative h-72 w-full overflow-hidden">
        <Image
          src={item.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzFhMWEyMSIvPjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMzAiIGZpbGw9IiM0YTUwNjgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4='}
          alt={item.title}
          fill
          loading="lazy"
          className="object-cover transition-transform group-hover:scale-105 duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className={`absolute top-3 md:top-4 ${isRtl ? 'left-3 md:left-4' : 'right-3 md:right-4'} bg-primary/90 backdrop-blur-sm px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs font-medium text-white shadow-lg`}>
          {item.category}
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
        <Link 
          href={getLocalizedHref(`/news/${item._id}`)} 
          className={`text-sm md:text-base text-primary font-medium inline-flex items-center group-hover:underline ${isRtl ? 'flex-row-reverse' : ''}`}
        >
          {t('readMore')}
          {isRtl ? (
            <ArrowRight className="mr-1 md:mr-1 h-3 w-3 md:h-4 md:w-4 rotate-180 transition-transform group-hover:translate-x-1" />
          ) : (
            <ArrowRight className="ml-1 md:ml-1 h-3 w-3 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" />
          )}
        </Link>
      </div>
    </div>
  )

  // Loading state
  if (loading && newsItems.length === 0) {
    return (
      <section className="py-12 md:py-20 bg-background-200">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <div className="animate-pulse space-y-8 w-full max-w-5xl">
            <div className="h-16 bg-gray-800 rounded-xl w-full"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-800 rounded w-3/4"></div>
              <div className="h-10 bg-gray-800 rounded w-1/2"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="h-48 bg-gray-800 rounded"></div>
                <div className="h-4 bg-gray-800 rounded w-1/4"></div>
                <div className="h-6 bg-gray-800 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-800 rounded"></div>
                  <div className="h-4 bg-gray-800 rounded"></div>
                </div>
              </div>
              <div className="space-y-4 hidden md:block">
                <div className="h-48 bg-gray-800 rounded"></div>
                <div className="h-4 bg-gray-800 rounded w-1/4"></div>
                <div className="h-6 bg-gray-800 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-800 rounded"></div>
                  <div className="h-4 bg-gray-800 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 md:py-20 bg-background-200">
      <div className="container mx-auto px-4">
        {/* Use the new NewsTicker component */}
        {newsItems.length > 0 && (
          <NewsTicker latestNews={newsItems[0]} />
        )}

        <div className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 ${isRtl ? 'rtl' : ''}`}>
          <div>
            {/* <h2 className="text-primary text-base md:text-lg font-medium">{t('latestNews')}</h2> */}
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

        {newsItems.length > 0 && (
          <div className="relative">
            {/* Navigation Buttons */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none z-10">
              <button
                onClick={goToPrevSlide}
                className={`${isRtl ? 'right-0 lg:-right-5' : 'left-0 lg:-left-5'} pointer-events-auto h-10 w-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-all duration-300 hover:scale-110`}
                aria-label={isRtl ? "Next slide" : "Previous slide"}
              >
                {isRtl ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
              </button>
              <button
                onClick={goToNextSlide}
                className={`${isRtl ? 'left-0 lg:-left-5' : 'right-0 lg:-right-5'} pointer-events-auto h-10 w-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-all duration-300 hover:scale-110`}
                aria-label={isRtl ? "Previous slide" : "Next slide"}
              >
                {isRtl ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
              </button>
            </div>

            {/* Cards Container */}
            <div className="overflow-hidden">
              <div className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                  {newsItems.map((item, index) => {
                    // Calculate the visibility based on the current slide
                    let shouldShow = false;
                    
                    // For mobile (1 card)
                    if (!isLargeScreen) {
                      shouldShow = index === currentSlide;
                    } 
                    // For desktop (3 cards)
                    else {
                      // Calculate which cards should be visible
                      const visibleIndices = [
                        currentSlide,
                        (currentSlide + 1) % newsItems.length,
                        (currentSlide + 2) % newsItems.length
                      ];
                      shouldShow = visibleIndices.includes(index);
                    }

                    return (
                      <div 
                        key={`news-card-${item.id || index}`}
                        className={`
                          mx-auto w-full max-w-md 
                          transition-all duration-500 ease-in-out
                          ${shouldShow ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full hidden'}
                          ${!isLargeScreen && index !== currentSlide ? 'hidden' : ''}
                        `}
                      >
                        <NewsCard item={item} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

     
          </div>
        )}

      </div>
    </section>
  )
} 