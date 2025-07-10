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

export default function NewsPage() {
  const t = useTranslations('news')
  const locale = useLocale()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentCategory, setCurrentCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<Array<{id: string, label: string}>>([
    { id: "all", label: t('title') }
  ])
  
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://mmaf.onrender.com/news/getallnews')
        const data = await response.json()
        if (data.news) {
          // Sort news items by date in descending order (newest first)
          const sortedNews = [...data.news].sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          setNewsItems(sortedNews)
          
          // Extract unique categories from news items
          const uniqueCategories = Array.from(
            new Set(data.news.map((item: NewsItem) => 
              item.category.name[locale as keyof typeof item.category.name] || item.category.name.en
            ))
          ).filter(Boolean) as string[]
          
          // Transform categories to match the {id, label} structure
          const formattedCategories = uniqueCategories.map(category => ({
            id: category,
            label: category
          }))
          
          setCategories([
            { id: "all", label: t('title') },
            ...formattedCategories
          ])
        }
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchNews()
  }, [t, locale])
  
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

  const itemsPerPage = 9
  
  // Filter news items based on search query and category
  const filteredNewsItems = newsItems.filter(item => {
    const itemTitle = item.title[locale as keyof typeof item.title] || item.title.en
    const itemContent = item.content[locale as keyof typeof item.content] || item.content.en
    const itemCategory = item.category.name[locale as keyof typeof item.category.name] || item.category.name.en
    
    const matchesSearch = searchQuery === "" || 
      itemTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      itemContent.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = currentCategory === "all" || itemCategory === currentCategory
    
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
      {/* Hero Banner (Commented Out) */}
      {/* <div className="relative h-[450px] bg-background-300 flex items-center justify-center overflow-hidden border-y border-primary/40 shadow-lg">
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
        </div>
      </div> */}

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16 lg:py-20 md:py-16 sm:py-12"
      >
        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 md:mb-16 sm:mb-8"
        >
          <div className="relative w-full md:max-w-lg py-12">
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
          <div className="flex flex-wrap gap-3">
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
          </div>
        </motion.div>

        {/* Loading state */}
        {loading ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center py-16"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </motion.div>
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
                  className="bg-background-200 rounded-lg overflow-hidden border border-gray-800 hover:border-primary/50 transition-colors group flex flex-col h-full"
                >
                  <div className="relative h-72 w-full overflow-hidden">
                    <Image
                      src={item.image[0]?.secure_url || '/placeholder-image.jpg'}
                      alt={item.title[locale as keyof typeof item.title] || item.title.en}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                      className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-500"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-full text-xs font-medium text-white">
                      {item.category.name[locale as keyof typeof item.category.name] || item.category.name.en}
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center text-gray-400 text-sm mb-3">
                      <CalendarDays className="h-4 w-4 mr-2" />
                      <span>{formatDate(item.date)}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {item.title[locale as keyof typeof item.title] || item.title.en}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-3 flex-grow">
                      {getExcerpt(item.content[locale as keyof typeof item.content] || item.content.en)}
                    </p>
                    <Link href={getLocalizedHref(`/news/${item._id}`)} className="text-primary font-medium inline-flex items-center group-hover:underline mt-auto">
                      {t('readMore')}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
<motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center mt-16 gap-3"
              >
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
              </motion.div>
            )}
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-background-200/90 rounded-xl p-10 text-center max-w-2xl mx-auto shadow-lg"
          >
            <h3 className="text-2xl font-bold text-white mb-4">{t('noResults.title')}</h3>
            <p className="text-gray-400 mb-8 text-lg">{t('noResults.description')}</p>
            <Button 
              className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-base"
              onClick={() => {
                setSearchQuery("")
                setCurrentCategory("all")
              }}
            >
              {t('noResults.resetFilters')}
            </Button>
          </motion.div>
        )}
      </motion.main>
    </div>
  )
} 