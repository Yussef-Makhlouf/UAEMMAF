"use client"

import { useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChevronLeft, ChevronRight, CalendarDays, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type NewsItem = {
  id: number
  title: string
  excerpt: string
  date: string
  image: string
  slug: string
  category: string
}

export default function NewsPage() {
  const t = useTranslations('news')
  const locale = useLocale()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentCategory, setCurrentCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  
  // إنشاء رابط مع اللغة
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

  // Mock news data - in a real application, this would come from an API or CMS
  const allNewsItems: NewsItem[] = [
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
    },
    {
      id: 4,
      title: t('article4.title'),
      excerpt: t('article4.excerpt'),
      date: "2025-03-22",
      image: "/main3.jpg",
      slug: "mma-equipment-safety-standards-updated",
      category: "regulations"
    },
    {
      id: 5,
      title: t('article5.title'),
      excerpt: t('article5.excerpt'),
      date: "2025-03-15",
      image: "/main4.jpg",
      slug: "women-mma-fighters-excel-at-regional-championships",
      category: "championships"
    },
    {
      id: 6,
      title: t('article6.title'),
      excerpt: t('article6.excerpt'),
      date: "2025-02-28",
      image: "/main5.jpg",
      slug: "referee-training-program-graduates-first-class",
      category: "education"
    },
    {
      id: 7,
      title: t('article7.title'),
      excerpt: t('article7.excerpt'),
      date: "2025-02-15",
      image: "/main6.jpg",
      slug: "new-mma-regulations-effective-soon",
      category: "regulations"
    }
  ]

  const categories = [
    { id: "all", label: t('categories.all') },
    { id: "championships", label: t('categories.championships') },
    { id: "partnerships", label: t('categories.partnerships') },
    { id: "development", label: t('categories.development') },
    { id: "regulations", label: t('categories.regulations') },
    { id: "education", label: t('categories.education') }
  ]

  const itemsPerPage = 6
  
  // Filter news items based on search query and category
  const filteredNewsItems = allNewsItems.filter(item => {
    const matchesSearch = searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    
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
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
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
          
          <div className="flex flex-wrap gap-2">
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
        </div>

        {/* News Grid */}
        {filteredNewsItems.length > 0 ? (
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
                  key={item.id}
                  variants={itemVariants}
                  className="bg-background-200 rounded-lg overflow-hidden border border-gray-800 hover:border-primary/50 transition-colors group"
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-full text-xs font-medium text-white">
                      {t(`categories.${item.category}`)}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-gray-400 text-sm mb-3">
                      <CalendarDays className="h-4 w-4 mr-2" />
                      <span>{formatDate(item.date)}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {item.excerpt}
                    </p>
                    <Link href={getLocalizedHref(`/news/${item.slug}`)} className="text-primary font-medium inline-flex items-center group-hover:underline">
                      {t('readMore')}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination - Updated to match events page style */}
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