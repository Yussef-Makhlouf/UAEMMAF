"use client"

import { useState, useEffect, Suspense } from "react"
import { useTranslations, useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useSearchParams } from "next/navigation"
import { 
  ChevronLeft, 
  ChevronRight, 
  CalendarDays, 
  Search, 
  MapPin, 
  Clock, 
  Users 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type EventItem = {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  participants: string
  image: string
  slug: string
  category: string
}

// Create a separate component for the content that uses useSearchParams
function EventsContent() {
  const t = useTranslations('events')
  const locale = useLocale()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  
  const [searchQuery, setSearchQuery] = useState("")
  const [currentCategory, setCurrentCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  
  // Set initial category based on URL parameter
  useEffect(() => {
    if (categoryParam) {
      setCurrentCategory(categoryParam)
    }
  }, [categoryParam])
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Mock events data - in a real application, this would come from an API or CMS
  const allEvents: EventItem[] = [
    {
      id: 1,
      title: t('event1.title'),
      description: t('event1.description'),
      date: "2025-06-20",
      time: "18:00",
      location: "Etihad Arena, Abu Dhabi",
      participants: "250+",
      image: "/main.jpg",
      slug: "uae-mma-championship-2025",
      category: "championships"
    },
    {
      id: 2,
      title: t('event2.title'),
      description: t('event2.description'),
      date: "2025-07-15",
      time: "16:00",
      location: "Dubai World Trade Centre",
      participants: "180+",
      image: "/main2.jpg",
      slug: "immaf-world-championship-qualifiers-2025",
      category: "qualifiers"
    },
    {
      id: 3,
      title: "UAEMMAF Youth Tournament 2025",
      description: "A special tournament showcasing the next generation of MMA talent, focused on youth development and providing a stepping stone to professional competition.",
      date: "2025-08-05",
      time: "14:00",
      location: "Mubadala Arena, Abu Dhabi",
      participants: "120+",
      image: "/main3.jpg",
      slug: "uaemmaf-youth-tournament-2025",
      category: "youth"
    },
    {
      id: 4,
      title: "UAE Fight Night Series",
      description: "An exciting night of professional MMA fights featuring both established fighters and rising stars from across the UAE and international guests.",
      date: "2025-08-25",
      time: "19:00",
      location: "Coca-Cola Arena, Dubai",
      participants: "32+",
      image: "/main4.jpg",
      slug: "uae-fight-night-series-2025",
      category: "professional"
    },
    {
      id: 5,
      title: "Women's MMA Championship 2025",
      description: "The premier women's MMA event in the UAE showcasing the incredible talent and growth of women's mixed martial arts in the region.",
      date: "2025-09-10",
      time: "17:00",
      location: "Etihad Arena, Abu Dhabi",
      participants: "64+",
      image: "/main5.jpg",
      slug: "womens-mma-championship-2025",
      category: "championships"
    },
    {
      id: 6,
      title: "UAEMMAF Referee and Judges Seminar",
      description: "A professional development event for referees and judges to ensure the highest standards of officiating in MMA competitions across the UAE.",
      date: "2025-09-25",
      time: "09:00",
      location: "Abu Dhabi National Exhibition Centre",
      participants: "50+",
      image: "/main6.jpg",
      slug: "referee-judges-seminar-2025",
      category: "seminar"
    }
  ]

  const categories = [
    { id: "all", label: t('categories.all') },
    { id: "championships", label: t('categories.championships') },
    { id: "qualifiers", label: t('categories.qualifiers') },
    { id: "youth", label: t('categories.youth') },
    { id: "professional", label: t('categories.professional') },
    { id: "seminar", label: t('categories.seminar') }
  ]

  const itemsPerPage = 4
  
  // Add isPastEvent function to filter events by past or upcoming status
  const isPastEvent = (dateString: string) => {
    const eventDate = new Date(dateString)
    const today = new Date()
    return eventDate < today
  }
  
  // Filter events based on search query and category (including past/upcoming)
  const filteredEvents = allEvents.filter(item => {
    const matchesSearch = searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    let matchesCategory = true
    
    if (currentCategory === "past") {
      matchesCategory = isPastEvent(item.date)
    } else if (currentCategory === "upcoming") {
      matchesCategory = !isPastEvent(item.date)
    } else if (currentCategory !== "all") {
      matchesCategory = item.category === currentCategory
    }
    
    return matchesSearch && matchesCategory
  })
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedItems = filteredEvents.slice(startIndex, startIndex + itemsPerPage)
  
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

  // Format date to display in the current locale format
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
            src="/main.jpg"
            alt={t('title')} 
            fill 
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('title')}</h1>
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

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <>
            <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {paginatedItems.map((event) => (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  className="bg-background-300 rounded-lg overflow-hidden border border-gray-800 hover:border-primary/50 transition-colors group"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative h-64 md:h-auto md:w-2/5 overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105 duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-white text-sm font-medium px-3 py-1 rounded">
                        {isPastEvent(event.date) ? t('past') : t('upcoming')}
                      </div>
                    </div>
                    <div className="p-6 md:w-3/5">
                      <h4 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-gray-400 mb-4 line-clamp-2">
                        {event.description}
                      </p>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-gray-300">
                          <CalendarDays className="h-4 w-4 mr-3 text-primary" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Clock className="h-4 w-4 mr-3 text-primary" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-start text-gray-300">
                          <MapPin className="h-4 w-4 mr-3 text-primary mt-1" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Users className="h-4 w-4 mr-3 text-primary" />
                          <span>{event.participants} {t('competitors')}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Link href={`/${locale}/events/${event.slug}`}>
                          <Button className="bg-primary hover:bg-primary-dark text-white">
                            {t('learnMore')}
                          </Button>
                        </Link>
                        {!isPastEvent(event.date) && (
                          <Link href={`/${locale}/events/${event.slug}#register`}>
                            <Button variant="outline" className="text-white border-white hover:bg-background-400">
                              {t('register')}
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
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

// Loading component
function EventsLoading() {
  return (
    <div className="min-h-screen bg-background-100 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent align-[-0.125em]" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="mt-4 text-gray-300">Loading events...</p>
      </div>
    </div>
  )
}

export default function EventsPage() {
  return (
    <Suspense fallback={<EventsLoading />}>
      <EventsContent />
    </Suspense>
  )
} 