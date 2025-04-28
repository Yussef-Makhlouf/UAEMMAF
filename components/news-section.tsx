"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { CalendarDays, ArrowRight } from "lucide-react"

type NewsItem = {
  id: number
  title: string
  excerpt: string
  date: string
  image: string
  slug: string
}

export default function NewsSection() {
  const t = useTranslations('news')
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: t('article1.title'),
      excerpt: t('article1.excerpt'),
      date: "2025-05-15",
      image: "hero1.jpeg",
      slug: "uae-mma-championship-success"
    },
    {
      id: 2,
      title: t('article2.title'),
      excerpt: t('article2.excerpt'),
      date: "2025-04-28",
      image: "hero2.jpeg",
      slug: "uaemmaf-signs-partnership-agreement-with-immaf"
    },
    {
      id: 3,
      title: t('article3.title'),
      excerpt: t('article3.excerpt'),
      date: "2025-04-10",
      image: "hero3.jpeg",
      slug: "youth-mma-development-program-launched"
    }
  ]

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
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  return (
    <section className="py-20 bg-background-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-primary text-lg font-medium">{t('latestNews')}</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white mt-2">
              {t('title')}
            </h3>
          </div>
          <Link href="/news" className="mt-4 md:mt-0">
            <Button variant="outline" className="text-white border-primary hover:bg-primary/10 group">
              {t('viewAll')}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {newsItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="bg-background rounded-lg overflow-hidden border border-gray-800 hover:border-primary/50 transition-colors group"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105 duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  <span>{formatDate(item.date)}</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {item.excerpt}
                </p>
                <Link href={`/news/${item.slug}`} className="text-primary font-medium inline-flex items-center group-hover:underline">
                  {t('readMore')}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 