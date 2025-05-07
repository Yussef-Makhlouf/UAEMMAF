"use client";

import { useTranslations, useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function LeadershipPage() {
  const t = useTranslations('aboutPage')
  const locale = useLocale()
  
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

  return (
    <div className="min-h-screen bg-background-100">
      {/* Hero Banner */}
      <div className="relative h-[300px] bg-background-300 flex items-center justify-center overflow-hidden">
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
            <Link href={getLocalizedHref('/about')} className="hover:text-primary transition-colors">
              {t('breadcrumbs.about')}
            </Link>
            <span>/</span>
            <span className="text-white">{t('leadership.title')}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* President's Message */}
        <motion.div
          ref={ref1}
          variants={containerVariants}
          initial="hidden"
          animate={inView1 ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <motion.div variants={itemVariants} className="flex flex-col space-y-6 order-2 lg:order-1">
            <div>
              <h2 className="text-primary text-lg font-medium">{t('presidentMessage.badge')}</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white mt-2">
                {t('presidentMessage.title')}
              </h3>
            </div>
            
            <div className="bg-background-300 p-6 rounded-lg border-l-4 border-primary">
              <p className="text-white text-xl">
                {t('presidentMessage.message1')}
              </p>
            </div>
            
            <p className="text-gray-300">
              {t('presidentMessage.message2')}
            </p>
            
            <div className="text-white">
              <p className="font-bold text-lg">{t('presidentMessage.name')}</p>
              <p className="text-primary">{t('presidentMessage.position')}</p>
              <a href={`mailto:${t('presidentMessage.email')}`} className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors mt-2 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                </svg>
                {t('presidentMessage.email')}
              </a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative order-1 lg:order-2">
            <div className="relative h-[400px] w-full mx-auto flex items-center justify-center">
              <div className="relative h-[350px] w-[350px] rounded-full border-4 border-primary overflow-hidden">
                <Image
                  src="/mainperson.png"
                  alt={t('presidentMessage.imageAlt')}
                  fill
                  className="object-cover object-center"
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
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-primary text-lg font-medium">{t('leadership.badge')}</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white mt-2">
              {t('leadership.title')}
            </h3>
            <p className="text-gray-300 max-w-3xl mx-auto mt-4">
              {t('leadership.description')}
            </p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {[0, 1, 2, 3, 4, 5, 6].map(index => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-background-200 rounded-lg p-6 text-center hover:bg-background-300 transition-colors duration-300"
              >
                <div className="relative h-40 w-40 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full border-2 border-primary p-2">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={`/person${index + 1}.jpg`}
                        alt={t(`leadership.members.${index}.name`, {fallback: `Team Member ${index + 1}`})}
                        fill
                        className="object-cover object-center"
                        style={{ objectPosition: '50% 25%' }}
                      />
                    </div>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-white mb-1">{t(`leadership.members.${index}.name`, {fallback: `Team Member ${index + 1}`})}</h4>
                <p className="text-primary mb-2">{t(`leadership.members.${index}.position`, {fallback: 'Team Member'})}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 