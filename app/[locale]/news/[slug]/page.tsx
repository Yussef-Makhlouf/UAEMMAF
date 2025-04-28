"use client"

import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CalendarDays, ChevronRight, ChevronLeft, Share2, Facebook, Twitter, Instagram } from "lucide-react"

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
  const params = useParams<{ slug: string }>()
  const slug = params?.slug

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
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  // Placeholder for related articles
  const relatedArticles = [
    {
      id: 2,
      title: t('article2.title'),
      excerpt: t('article2.excerpt'),
      date: "2025-04-28",
      image: "/main2.jpg",
      slug: "uaemmaf-signs-partnership-agreement-with-immaf",
      category: "partnerships"
    },
    {
      id: 3,
      title: t('article3.title'),
      excerpt: t('article3.excerpt'),
      date: "2025-04-10",
      image: "/main3.jpg",
      slug: "youth-mma-development-program-launched",
      category: "development"
    }
  ]

  return (
    <div className="min-h-screen bg-background-100 pb-16">
      {/* Hero Banner */}
      <div className="relative h-[400px] md:h-[500px] bg-background-300 flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src={article.image}
            alt={article.title} 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 pb-10">
          <div className="bg-primary inline-block px-3 py-1 rounded-full text-sm font-medium text-white mb-4">
            {t(`categories.${article.category}`)}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-4xl">{article.title}</h1>
          <div className="flex items-center text-gray-300 text-sm">
            <CalendarDays className="h-4 w-4 mr-2" />
            <span>{formatDate(article.date)}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Article Content */}
          <div className="lg:col-span-2">
            <div className="bg-background-200 rounded-lg p-6 md:p-10 mb-10">
              <div className="prose prose-invert max-w-none">
                <p className="text-xl text-gray-300 mb-6 font-medium leading-relaxed">
                  {article.excerpt}
                </p>
                
                <div className="my-8 border-y border-gray-700 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden">
                      <Image 
                        src={article.authorImage}
                        alt={article.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{t('byAuthor')}</p>
                      <p className="text-primary font-bold">{article.author}</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-gray-300 space-y-6 text-lg leading-relaxed">
                  {article.content.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
              
              {/* Share Section */}
              <div className="mt-10 pt-6 border-t border-gray-700">
                <h3 className="text-white font-medium mb-4 flex items-center">
                  <Share2 className="mr-2 h-5 w-5" /> {t('shareArticle')}
                </h3>
                <div className="flex gap-3">
                  <a href="#" className="bg-background-300 p-3 rounded-full text-white hover:text-primary hover:bg-background-400 transition-colors">
                    <Facebook size={20} />
                  </a>
                  <a href="#" className="bg-background-300 p-3 rounded-full text-white hover:text-primary hover:bg-background-400 transition-colors">
                    <Twitter size={20} />
                  </a>
                  <a href="#" className="bg-background-300 p-3 rounded-full text-white hover:text-primary hover:bg-background-400 transition-colors">
                    <Instagram size={20} />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Back Button */}
            <Link href="/news">
              <Button variant="outline" className="text-white border-gray-700 hover:bg-background-300">
                <ChevronLeft className="mr-2 h-4 w-4" /> {t('backToNews')}
              </Button>
            </Link>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Related Articles */}
            <div className="bg-background-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-3">
                {t('relatedArticles')}
              </h3>
              <div className="space-y-6">
                {relatedArticles.map((item) => (
                  <Link key={item.id} href={`/news/${item.slug}`} className="block group">
                    <div className="flex gap-4">
                      <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105 duration-300"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-medium group-hover:text-primary transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                        <div className="flex items-center text-gray-400 text-xs mt-1">
                          <CalendarDays className="h-3 w-3 mr-1" />
                          <span>{formatDate(item.date)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6">
                <Link href="/news">
                  <Button variant="outline" className="w-full text-white border-gray-700 hover:bg-background-300">
                    {t('viewAllNews')}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Categories */}
            <div className="bg-background-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-3">
                {t('categories.title')}
              </h3>
              <div className="space-y-2">
                <Link href="/news?category=championships" className="block text-gray-300 hover:text-primary py-2 border-b border-gray-700 transition-colors">
                  {t('categories.championships')}
                </Link>
                <Link href="/news?category=partnerships" className="block text-gray-300 hover:text-primary py-2 border-b border-gray-700 transition-colors">
                  {t('categories.partnerships')}
                </Link>
                <Link href="/news?category=development" className="block text-gray-300 hover:text-primary py-2 border-b border-gray-700 transition-colors">
                  {t('categories.development')}
                </Link>
                <Link href="/news?category=regulations" className="block text-gray-300 hover:text-primary py-2 border-b border-gray-700 transition-colors">
                  {t('categories.regulations')}
                </Link>
                <Link href="/news?category=education" className="block text-gray-300 hover:text-primary py-2 transition-colors">
                  {t('categories.education')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 