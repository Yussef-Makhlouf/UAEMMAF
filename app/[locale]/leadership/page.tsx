"use client";

import { useTranslations, useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState, useEffect } from "react"

type Member = {
  _id: string
  name: {
    ar: string
    en: string
  }
  image: {
    secure_url: string
    public_id: string
  }
  position: {
    ar: string
    en: string
  }
  customId?: string
}

export default function LeadershipPage() {
  const t = useTranslations('aboutPage')
  const locale = useLocale()
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Create link with language
  const getLocalizedHref = (path: string) => {
    if (path === '/') {
      return `/${locale === 'en' ? '' : locale}`;
    }
    return `/${locale}${path.startsWith('/') ? path : `/${path}`}`;
  };

  const [ref1, inView1] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [ref2, inView2] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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

  // Fetch members data from API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://mmaf.onrender.com/members/getallmembers')
        
        if (!response.ok) {
          throw new Error(`Failed to fetch members: ${response.status}`)
        }
        
        const data = await response.json()
        if (data.members) {
          setMembers(data.members)
        } else {
          throw new Error("Failed to fetch members data")
        }
      } catch (err) {
        console.error("Error fetching members:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchMembers()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4  border-r-transparent align-[-0.125em]" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-4 text-gray-300">Loading members...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background-100 flex flex-col items-center justify-center">
        <h2 className="text-2xl text-white mb-4">Error loading members</h2>
        <p className="text-gray-300 mb-6">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-100">
      {/* Hero Banner */}
      {/* <div className="relative h-[450px] bg-background-300 flex items-center justify-center overflow-hidden border-y /30 border-b border-primary/30">
        <div className="absolute inset-0">
          <Image
            src="/subhero.png"
            alt={t('leadership.title')}
            fill
            className="object-cover opacity-20 transition-transform duration-[15000ms] hover:scale-105"
            priority
            quality={85}
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('leadership.title')}</h1>
          <div className="flex items-center justify-center gap-2 text-gray-300">
            <Link href={getLocalizedHref('/')} className="hover:text-primary transition-colors">
              {t('breadcrumbs.home')}
            </Link>
            <span>/</span>
         
            <span className="text-white">{t('leadership.title')}</span>
          </div>
        </div>
      </div> */}

      <div className="container mx-auto px-4 py-28">
        {/* President's Message */}
        <motion.div
          ref={ref1}
          variants={containerVariants}
          initial="hidden"
          animate={inView1 ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24"
        >
          <motion.div variants={itemVariants} className="flex flex-col space-y-6 order-2 lg:order-1">
            <div>
              {/* <h2 className="text-primary text-lg font-medium">{t('presidentMessage.badge')}</h2> */}
              <h3 className="text-3xl md:text-4xl font-bold text-white mt-2 ">
                {t('presidentMessage.title')}
              </h3>
            </div>
            
            <div className="bg-background-300 p-8 rounded-lg border-l-4 space-y-6">
              <p className="text-white">
                {t('presidentMessage.message1')}
              </p>
              <br /> <br />
              <p className="text-white">
              {t('presidentMessage.message2')}
            </p>
            <div className="text-white mt-10 pt-6">
              <div className="bg-background-400 p-5 rounded-lg border-l-4 shadow-md">
                <p className="font-bold text-lg">{t('presidentMessage.name')}</p>
                <p className="text-primary">{t('presidentMessage.position')}</p>
              </div>
            </div>
            </div>
            
         
          
          </motion.div>

          <motion.div variants={itemVariants} className="relative order-1 lg:order-2">
            <div className="relative h-[400px] w-full mx-auto flex items-center justify-center">
              <div className="relative h-[350px] w-[350px] rounded-full border-4  overflow-hidden">
                <Image
                  src="/leader.jpg"
                  alt={t('presidentMessage.imageAlt')}
                  fill
                  className="object-cover "
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Leadership */}
        <motion.div
          ref={ref2}
          variants={containerVariants}
          initial="hidden"
          animate={inView2 ? "visible" : "hidden"}
          className="mb-24"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            {/* <h2 className="text-primary text-lg font-medium">{t('leadership.badge')}</h2> */}
            <h3 className="text-3xl md:text-4xl font-bold text-white mt-2">
              {t('leadership.title')}
            </h3>
            {/* <p className="text-gray-300 max-w-3xl mx-auto mt-6">
              {t('leadership.description')}
            </p> */}
          </motion.div>
          
          {/* Premium Master Card - First Member */}
          {members.length > 0 && (
            <motion.div 
              variants={itemVariants}
              className="mb-12 mx-auto"
            >
              <div className="w-full md:w-[80%] lg:w-[650px] mx-auto rounded-lg p-8 text-center hover:-translate-y-2 transform transition-all duration-500 relative group">
                {/* Animated border effect */}
                
                {/* Main card content with glass effect */}
                <div className="relative z-10  backdrop-blur-sm rounded-lg p-5 ">
             
                  
        
                  {/* Image container with premium styling */}
                  <div className="relative h-48 w-48 sm:h-56 sm:w-56 lg:h-64 lg:w-64 mx-auto mb-6">
                    {/* Pulsating ring */}
                    <div className="absolute inset-0 rounded-full animate-pulse opacity-70 bg-primary p-[3px]"></div>
                    
                    <div className="absolute inset-0 rounded-full  p-2  bg-background-300/90">
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image
                          src={members[0].image.secure_url}
                          alt={locale === 'ar' ? members[0].name.ar : members[0].name.en}
                          fill
                          className="object-cover object-center"
                          style={{ objectPosition: '50% 25%' }}
                          priority
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content with enhanced styling */}
                  <div className="relative">
                    <h4 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors duration-300">
                      {locale === 'ar' ? `سعادة ${members[0].name.ar}` : `H.E. ${members[0].name.en}`}
                    </h4>
                    <div className="inline-block bg-primary/20 px-3 py-1 rounded-full mb-2 backdrop-blur-sm">
                      <p className="text-primary font-semibold">
                        {locale === 'ar' ? members[0].position.ar : members[0].position.en}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Remaining Members Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {members.slice(1).map((member) => (
              <motion.div 
                key={member._id}
                variants={itemVariants}
                className="rounded-xl p-8 text-center hover:bg-background-300/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="relative h-44 w-44 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full   p-2">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={member.image.secure_url}
                        alt={locale === 'ar' ? member.name.ar : member.name.en}
                        fill
                        className="object-cover object-center"
                        style={{ objectPosition: '50% 25%' }}
                      />
                    </div>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-white mb-1">
                  {locale === 'ar'
                    ? `سعادة ${member.name.ar}`
                    : `H.E. ${member.name.en}`}
                </h4>
                <p className="text-primary mb-2">
                  {locale === 'ar' ? member.position.ar : member.position.en}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 