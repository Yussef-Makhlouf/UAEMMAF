"use client"

import { useState, useEffect } from "react"
import { useTranslations, useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChevronLeft, ChevronRight, CalendarDays, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
  }
  category: string
  date: string
}

export default function NewsPage() {
  const t = useTranslations('news')
  const locale = useLocale()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentCategory, setCurrentCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://mmaf.onrender.com/news/getallnews')
        const data = await response.json()
        if (data.news) {
          setNewsItems(data.news)
        }
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchNews()
  }, [])
  
  // Create localized href
  const getLocalizedHref = (path: string) => {
    if (path.startsWith('http')) {
      return path;
    }
    return `/${locale}${path.startsWith('/') ? path : `/${path}`}`;
  };
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const itemsPerPage = 6
  
  // Filter news items based on search query and category
  const filteredNewsItems = newsItems.filter(item => {
    const itemTitle = locale === 'ar' ? item.title.ar : item.title.en
    const itemContent = locale === 'ar' ? item.content.ar : item.content.en
    
    const matchesSearch = searchQuery === "" || 
      itemTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      itemContent.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = currentCategory === "all" || item.category === currentCategory
    
    return matchesSearch && matchesCategory
  })
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredNewsItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedItems = filteredNewsItems.slice(startIndex, startIndex + itemsPerPage)
  
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

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
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date)
    } catch (error) {
      return dateString
    }
  }

  // Extract excerpt from content (first 150 characters)
  const getExcerpt = (content: string) => {
    return content.substring(0, 150) + '...'
  }

  return (
    <div className="min-h-screen bg-background-100">
      {/* Hero Banner */}
      <div className="relative h-[300px] bg-background-300 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/subhero.png"
            alt={t('pageTitle')} 
            fill 
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('pageTitle')}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t('pageDescription')}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="relative max-w-md w-full">
            <Input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1) // Reset to first page on search
              }}
              className="pr-10 bg-background-200 border-gray-700 text-white"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          
          {/* Categories can be uncommented and adapted if needed based on API categories */}
          {/* <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={currentCategory === category.id ? "default" : "outline"}
                className={currentCategory === category.id 
                  ? "bg-primary hover:bg-primary-dark text-white" 
                  : "text-white border-gray-700 hover:bg-background-300"
                }
                onClick={() => {
                  setCurrentCategory(category.id)
                  setCurrentPage(1) // Reset to first page on category change
                }}
              >
                {category.label}
              </Button>
            ))}
          </div> */}
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredNewsItems.length > 0 ? (
          <>
            <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {paginatedItems.map((item) => (
                <motion.div
                  key={item._id}
                  variants={itemVariants}
                  className="bg-background-200 rounded-lg overflow-hidden border border-gray-800 hover:border-primary/50 transition-colors group"
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={item.image.secure_url}
                      alt={locale === 'ar' ? item.title.ar : item.title.en}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-full text-xs font-medium text-white">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-gray-400 text-sm mb-3">
                      <CalendarDays className="h-4 w-4 mr-2" />
                      <span>{formatDate(item.date)}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {locale === 'ar' ? item.title.ar : item.title.en}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {getExcerpt(locale === 'ar' ? item.content.ar : item.content.en)}
                    </p>
                    <Link href={getLocalizedHref(`/news/${item._id}`)} className="text-primary font-medium inline-flex items-center group-hover:underline">
                      {t('readMore')}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center mt-12 gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="text-white border-gray-700 hover:bg-background-300"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      className={currentPage === page 
                        ? "bg-primary hover:bg-primary-dark text-white" 
                        : "text-white border-gray-700 hover:bg-background-300"
                      }
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="text-white border-gray-700 hover:bg-background-300"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-background-200 rounded-lg p-8 text-center">
            <h3 className="text-xl font-medium text-white mb-2">{t('noResults.title')}</h3>
            <p className="text-gray-400 mb-6">{t('noResults.description')}</p>
            <Button 
              className="bg-primary hover:bg-primary-dark text-white"
              onClick={() => {
                setSearchQuery("")
                setCurrentCategory("all")
              }}
            >
              {t('noResults.resetFilters')}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 