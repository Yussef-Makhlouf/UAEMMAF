"use client"

import { useTranslations, useLocale } from "next-intl"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarDays, ChevronLeft, Share2, Facebook, Twitter, Instagram, Clock, User, Eye } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

type NewsItem = {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
  image: string
  category: string
  author: string
  authorImage: string
}

export default function NewsArticlePage() {
  const t = useTranslations('news')
  const locale = useLocale()
  const params = useParams<{ slug: string }>()
  const slug = params?.slug
  const [readingTime, setReadingTime] = useState<number>(0)
  const [activeSection, setActiveSection] = useState<string>('intro')
  const [showShareTooltip, setShowShareTooltip] = useState<boolean>(false)
  
  // Create localized href
  const getLocalizedHref = (path: string) => {
    if (path.startsWith('http')) {
      return path;
    }
    return `/${locale}${path.startsWith('/') ? path : `/${path}`}`;
  };

  // In a real application, you would fetch the article based on the slug from an API or CMS
  // Here we're using mock data
  const article: NewsItem = {
    id: 1,
    title: t('fullArticle.title'),
    excerpt: t('fullArticle.excerpt'),
    content: t('fullArticle.content'),
    date: "2025-05-15",
    image: "/main.jpg",
    category: "championships",
    author: t('fullArticle.author'),
    authorImage: "/main.jpg"
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

  // Calculate reading time
  useEffect(() => {
    const wordCount = article.content.split(/\s+/).length;
    const time = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute
    setReadingTime(time);
  }, [article.content]);

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
            src={article.image}
            alt={article.title} 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </motion.div>
        <div className="relative z-10 container mx-auto px-4 pb-16 max-w-5xl">
          <motion.div 
            {...fadeIn}
            className="bg-primary inline-block px-4 py-1.5 rounded-full text-sm font-medium text-white mb-5 shadow-lg shadow-primary/30"
          >
            {t(`categories.${article.category}`)}
          </motion.div>
          <motion.h1 
            {...fadeIn}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            {article.title}
          </motion.h1>
          <motion.div 
            {...fadeIn}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-wrap items-center gap-6 text-gray-300 text-sm md:text-base"
          >
            <div className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-2 text-primary" />
              <span>{formatDate(article.date)}</span>
            </div>
            {/* <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-primary" />
              <span>{readingTime} {t('minuteRead')}</span>
            </div>
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-2 text-primary" />
              <span>{Math.floor(Math.random() * 2000) + 500} {t('views')}</span>
            </div> */}
          </motion.div>
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
        {/* Author Info Card */}
        {/* <motion.div 
          {...fadeIn}
          className="flex items-center gap-5 mb-12 p-6 bg-background-200 rounded-xl shadow-xl"
        >
          <div className="relative h-16 w-16 rounded-full overflow-hidden ring-2 ring-primary ring-offset-2 ring-offset-background-200">
            <Image
              src={article.authorImage}
              alt={article.author}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <User className="h-4 w-4 text-primary" />
              <p className="text-gray-400 text-sm">{t('byAuthor')}</p>
            </div>
            <p className="text-white font-semibold text-lg">{article.author}</p>
          </div>
        </motion.div> */}
        
        {/* Article Intro */}
        <motion.div 
          {...fadeIn}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-12"
        >
          <p className="text-gray-200 text-xl leading-relaxed font-medium italic border-l-4 border-primary pl-6 py-2">
            {article.excerpt}
          </p>
        </motion.div>
        
        {/* Article Content */}
        <motion.div 
          variants={staggerContainer}
          className="prose prose-xl prose-invert max-w-none mb-16"
        >
          {article.content.split('\n\n').map((paragraph, index) => (
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