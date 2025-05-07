"use client"

import { useTranslations, useLocale } from "next-intl"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarDays, ChevronLeft, Share2, Facebook, Twitter, Instagram, Clock, User, Eye } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Loader from "@/components/loader"

type NewsItem = {
  _id: string
  title: {
    ar: string
    en: string
  }
  content: {
    ar: string
    en: string
  }
  image: {
    secure_url: string
    public_id: string
  }
  category: string
  date: string
  customId?: string
}

export default function NewsArticlePage() {
  const t = useTranslations('news')
  const locale = useLocale()
  const params = useParams<{ slug: string }>()
  const newsId = params?.slug
  const [readingTime, setReadingTime] = useState<number>(0)
  const [activeSection, setActiveSection] = useState<string>('intro')
  const [showShareTooltip, setShowShareTooltip] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [newsData, setNewsData] = useState<NewsItem | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  // Create localized href
  const getLocalizedHref = (path: string) => {
    if (path.startsWith('http')) {
      return path;
    }
    return `/${locale}${path.startsWith('/') ? path : `/${path}`}`;
  };

  // Fetch news data from API
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://mmaf.onrender.com/news/getnewsbyid/${newsId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.message === "News fetched successfully") {
          setNewsData(data.news);
        } else {
          throw new Error("Failed to fetch news data");
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (newsId) {
      fetchNewsData();
    }
  }, [newsId]);

  // Format date to display in a localized format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  // Calculate reading time
  useEffect(() => {
    if (newsData) {
      const content = locale === 'ar' ? newsData.content.ar : newsData.content.en;
      const wordCount = content.split(/\s+/).length;
      const time = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute
      setReadingTime(time);
    }
  }, [newsData, locale]);

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  // Copy share URL functionality
  const handleShareClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL: ', err);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background-100 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background-100 flex flex-col items-center justify-center">
        <h2 className="text-2xl text-white mb-4">Error loading news article</h2>
        <p className="text-gray-300 mb-6">{error}</p>
        <Link href={getLocalizedHref('/news')}>
          <Button variant="outline">{t('backToNews')}</Button>
        </Link>
      </div>
    );
  }

  if (!newsData) {
    return (
      <div className="min-h-screen bg-background-100 flex flex-col items-center justify-center">
        <h2 className="text-2xl text-white mb-4">News article not found</h2>
        <Link href={getLocalizedHref('/news')}>
          <Button variant="outline">{t('backToNews')}</Button>
        </Link>
      </div>
    );
  }

  const title = locale === 'ar' ? newsData.title.ar : newsData.title.en;
  const content = locale === 'ar' ? newsData.content.ar : newsData.content.en;

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      className="min-h-screen bg-background-100"
    >
      {/* Hero Banner with Parallax Effect */}
      <div className="relative h-[60vh] lg:h-[80vh] bg-background-300 flex items-end overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image 
            src={newsData.image.secure_url}
            alt={title} 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </motion.div>
        <div className="relative z-10 container mx-auto px-4 pb-12 max-w-5xl">
          <motion.h1 
            {...fadeIn}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-3xl sm:text-2xl font-bold text-white leading-tight tracking-tight"
          >
            {title}
          </motion.h1>
     
        </div>
      </div>

      {/* Progress Bar */}
      <motion.div 
        className="sticky top-0 z-20 w-full h-1 bg-background-300"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: "linear" }}
      >
        <motion.div 
          className="h-full bg-primary origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 30, ease: "linear" }}
        />
      </motion.div>

      {/* Article Content Section */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Article Content */}
        <motion.div 
          variants={staggerContainer}
          className="prose prose-xl prose-invert max-w-none mb-16"
        >
          {content.split('\n\n').map((paragraph, index) => (
            <motion.p 
              key={index} 
              className="text-gray-300 mb-8 leading-relaxed text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.05,
                ease: "easeOut" 
              }}
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>
        
        {/* Share Section */}
        <motion.div 
          {...fadeIn}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-gray-700 relative"
        >
          <h3 className="text-white font-medium mb-5 flex items-center">
            <Share2 className="mr-2 h-5 w-5 text-primary" /> {t('shareArticle')}
          </h3>
          <div className="flex flex-wrap gap-4">
       
            <button 
              onClick={handleShareClick}
              className="group flex items-center gap-2 bg-background-300 py-2 px-4 rounded-full text-white hover:bg-primary transition-colors duration-300 relative"
            >
              <Share2 size={18} />
              <span className="text-sm">{t('copyLink')}</span>
              
              <AnimatePresence>
                {showShareTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs py-1 px-3 rounded shadow-lg whitespace-nowrap"
                  >
                    {t('linkCopied')}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>
        
        {/* Back Button */}
        <motion.div 
          {...fadeIn}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14"
        >
          <Link href={getLocalizedHref('/news')}>
            <Button 
              variant="outline" 
              className="text-white border-gray-700 hover:bg-background-300 group transition-all py-6 px-8 text-base"
            >
              <ChevronLeft className="mr-2 h-5 w-5 group-hover:mr-3 transition-all" /> 
              <span>{t('backToNews')}</span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
} 