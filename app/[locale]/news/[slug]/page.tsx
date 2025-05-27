"use client"

import { useTranslations, useLocale } from "next-intl"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarDays, ChevronLeft, Share2, Facebook, Twitter, Instagram, Clock, User, Eye, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Loader from "@/components/loader"

// Add custom scrollbar styling
const scrollbarHideStyles = `
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

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
  image: Array<{
    secure_url: string
    public_id: string
    _id: string
  }>
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  
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
          console.log('News Data Images:', data.news.image);
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
      {/* Apply custom scrollbar styles */}
      <style jsx global>{scrollbarHideStyles}</style>
      
      {/* Hero Banner with Parallax Effect */}
      <div className="relative h-[450px] bg-background-300 flex items-center justify-center overflow-hidden border-y border-primary/40 shadow-lg ">
        <div className="absolute inset-0">
          <Image 
            src="/subhero.png"
            alt={title} 
            fill 
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{formatDate(newsData.date)}</p>
        </div>
      </div>

      {/* Progress Bar */}
 

      {/* Article Content Section */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">

        {/* Article Content */}
        <motion.div 
          variants={staggerContainer}
          className="prose prose-xl prose-invert max-w-none mb-16"
        >
          {/* Article Featured Image or Image Gallery */}
          {newsData.image.length === 1 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative w-full h-[450px] mb-12 rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => setSelectedImage(newsData.image[0].secure_url)}
            >
              <Image 
                src={newsData.image[0].secure_url}
                alt={title} 
                fill
                className="object-contain hover:scale-105 transition-transform duration-700 rounded-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-100/80 to-transparent"></div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex overflow-x-auto scrollbar-hide md:grid md:grid-cols-3 gap-4 mb-12 pb-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {newsData.image.map((img, index) => (
                <motion.div
                  key={img._id}
                  className="relative h-[280px] min-w-[280px] md:min-w-0 overflow-hidden rounded-xl cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedImage(img.secure_url)}
                >
                  <Image
                    src={img.secure_url}
                    alt={`${title} - image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110 "
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-100/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
              ))}
            </motion.div>
          )}

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

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[80vh]">
                <Image 
                  src={selectedImage}
                  alt="Expanded image"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority
                />
              </div>
              <Button 
                className="absolute -top-4 -right-4 rounded-full p-2 bg-primary hover:bg-primary/90" 
                size="icon"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
} 