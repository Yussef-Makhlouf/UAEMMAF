"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { CalendarDays, MapPin, Clock, Users, ArrowRight } from "lucide-react"

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
}

export default function EventsSection() {
  const t = useTranslations('events')
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const events: EventItem[] = [
    {
      id: 1,
      title: t('event1.title'),
      description: t('event1.description'),
      date: "2025-06-20",
      time: "18:00",
      location: "Etihad Arena, Abu Dhabi",
      participants: "250+",
      image: "/main.jpg",
      slug: "uae-mma-championship-2025"
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
      slug: "immaf-world-championship-qualifiers-2025"
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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-primary text-lg font-medium">{t('upcomingEvents')}</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white mt-2">
              {t('title')}
            </h3>
          </div>
          <Link href="/events" className="mt-4 md:mt-0">
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {events.map((event) => (
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
                    {t('upcoming')}
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
                    <Link href={`/events/${event.slug}`}>
                      <Button className="bg-primary hover:bg-primary-dark text-white">
                        {t('learnMore')}
                      </Button>
                    </Link>
                    <Link href="https://uaemmaf.smoothcomp.com/en/federation/187/events/upcoming">
                      <Button variant="outline" className="text-white border-white hover:bg-background-400">
                        {t('register')}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 