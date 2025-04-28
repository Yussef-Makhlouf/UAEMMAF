"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function AboutSection() {
  const t = useTranslations('about')
  
  const [ref, inView] = useInView({
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
    <section className="py-20 bg-background" id="about">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Image Column */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative h-[500px] w-full rounded-lg overflow-hidden">
              <Image
                src="./main5.jpg"
                alt={t('imageAlt')}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-40"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary p-6 rounded-lg shadow-xl">
              <div className="text-white text-center">
                <p className="text-5xl font-bold">2021</p>
                <p className="text-sm uppercase tracking-wide">{t('established')}</p>
              </div>
            </div>
          </motion.div>

          {/* Text Column */}
          <motion.div variants={itemVariants} className="flex flex-col space-y-6">
            <div>
              <h2 className="text-primary text-lg font-medium">{t('aboutUs')}</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white mt-2">
                {t('title')}
              </h3>
            </div>
            
            <div className="bg-background-300 p-6 rounded-lg border-l-4 border-primary">
              <p className="text-white italic">
                {t('mission')}
              </p>
            </div>
            
            <p className="text-gray-300">
              {t('description1')}
            </p>
            
            <p className="text-gray-300">
              {t('description2')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/about">
                <Button className="bg-primary hover:bg-primary-dark text-white">
                  {t('learnMore')}
                </Button>
              </Link>
              <Link href="/https://uaemmaf.smoothcomp.com/en/federation/187/membership">
                <Button variant="outline" className="text-white border-white hover:bg-background-400">
                  {t('joinUs')}
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mt-6">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center px-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-medium">{t('feature1.title')}</h4>
                  <p className="text-gray-400 text-sm">{t('feature1.description')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center ">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary ">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                    <line x1="4" x2="4" y1="22" y2="15"></line>
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-medium px-2">{t('feature2.title')}</h4>
                  <p className="text-gray-400 text-sm">{t('feature2.description')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}