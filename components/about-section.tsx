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
    <section className="py-20 bg-background overflow-x-hidden" id="about">
      <div className="container mx-auto px-4 max-w-full">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-stretch relative"
        >
          {/* Image Column */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative h-60 xs:h-72 sm:h-96 md:h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="./about.jpg"
                alt={t('imageAlt')}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-40"></div>
              
              {/* Decorative element */}
              <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-primary opacity-70"></div>
              <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-primary opacity-70"></div>
            </div>
            <div className="absolute right-2 bottom-2 sm:-bottom-6 sm:-right-6 bg-primary p-3 sm:p-6 rounded-lg shadow-xl w-28 sm:w-auto transform hover:scale-105 transition-transform duration-300">
              <div className="text-white text-center">
                <p className="text-3xl sm:text-5xl font-bold">2021</p>
                <p className="text-xs sm:text-sm uppercase tracking-wide">{t('established')}</p>
              </div>
            </div>
          </motion.div>

          {/* Text Column */}
          <motion.div 
            variants={itemVariants} 
            className="flex flex-col h-full"
          >
            <div className="h-full flex flex-col">
              <div className="mb-6">
                <div className="w-12 h-1 bg-primary mb-4"></div>
                <h2 className="text-primary text-base sm:text-lg font-medium tracking-wider">{t('aboutUs')}</h2>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2 leading-tight">
                  {t('title')}
                </h3>
              </div>
              
              <div className="bg-background-300 p-6 sm:p-8 rounded-2xl border-l-4 border-primary flex-grow flex flex-col justify-center shadow-lg backdrop-blur-sm bg-opacity-30 relative">
                {/* Decorative dots */}
                <div className="absolute top-6 right-6 grid grid-cols-2 gap-1 opacity-30">
                  <div className="w-1 h-1 rounded-full bg-primary"></div>
                  <div className="w-1 h-1 rounded-full bg-primary"></div>
                  <div className="w-1 h-1 rounded-full bg-primary"></div>
                  <div className="w-1 h-1 rounded-full bg-primary"></div>
                </div>
                
                <p className="text-gray-300 leading-relaxed">
                  {t('description1')}
                </p>
                <div className="my-4 w-12 h-0.5 bg-primary/30"></div>
                <p className="text-gray-300 leading-relaxed">
                  {t('description2')}
                </p>
                
                {/* <div className="mt-6 pt-4 border-t border-gray-700/30">
                  <Link href="/about" className="inline-flex items-center text-primary hover:text-primary-light transition-colors">
                    {t('learnMore')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div> */}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}