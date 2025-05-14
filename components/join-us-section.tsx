"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { User, Users, Medal, ArrowRight, Building, Award } from "lucide-react"

export default function JoinUsSection() {
  const t = useTranslations('joinUs')
  
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
    <section className="py-20 bg-background-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-primary text-lg font-medium">{t('joinTheFederation')}</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
            {t('title')}
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12"
        >
          {/* Athletes Card */}
          <motion.div 
            variants={itemVariants}
            className="bg-background rounded-lg overflow-hidden border border-gray-800 hover:border-primary transition-colors group"
          >
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src="/main.jpg"
                alt={t('athletes.title')}
                fill
                loading="lazy"
                className="object-cover transition-transform group-hover:scale-105 duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <h4 className="text-2xl font-bold text-white mb-2 flex items-center px-2">
                  <User className="mr-2 h-6 w-6 text-primary " />
                  {t('athletes.title')}
                </h4>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-300 mb-6">
                {t('athletes.description')}
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="mr-3 mt-1 text-primary px-2">
                    <Medal size={20} />
                  </div>
                  <div>
                    <h5 className="text-white font-medium">{t('athletes.benefit1.title')}</h5>
                    <p className="text-gray-400 text-sm">{t('athletes.benefit1.description')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 mt-1 text-primary px-2">
                    <Users size={20} />
                  </div>
                  <div>
                    <h5 className="text-white font-medium">{t('athletes.benefit2.title')}</h5>
                    <p className="text-gray-400 text-sm">{t('athletes.benefit2.description')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 mt-1 text-primary px-2">
                    <Award size={20} />
                  </div>
                  <div>
                    <h5 className="text-white font-medium">{t('athletes.benefit3.title')}</h5>
                    <p className="text-gray-400 text-sm">{t('athletes.benefit3.description')}</p>
                  </div>
                </div>
              </div>
              
              <Link href="https://uaemmaf.smoothcomp.com/en/federation/187/membership" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="w-full bg-primary hover:bg-primary-dark text-white">
                  {t('athletes.joinNow')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
          
          {/* Clubs Card */}
          <motion.div 
            variants={itemVariants}
            className="bg-background rounded-lg overflow-hidden border border-gray-800 hover:border-primary transition-colors group"
          >
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src="/main2.jpg"
                alt={t('clubs.title')}
                fill
                loading="lazy"
                className="object-cover transition-transform group-hover:scale-105 duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <h4 className="text-2xl font-bold text-white mb-2 flex items-center ">
                  <Building className="mr-2 h-6 w-6 text-primary " />
                  {t('clubs.title')}
                </h4>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-300 mb-6">
                {t('clubs.description')}
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="mr-3 mt-1 text-primary px-2">
                    <Award size={20} />
                  </div>
                  <div>
                    <h5 className="text-white font-medium">{t('clubs.benefit1.title')}</h5>
                    <p className="text-gray-400 text-sm">{t('clubs.benefit1.description')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                      <div className="mr-3 mt-1 text-primary px-2">
                    <Medal size={20} />
                  </div>
                  <div>
                    <h5 className="text-white font-medium">{t('clubs.benefit2.title')}</h5>
                    <p className="text-gray-400 text-sm">{t('clubs.benefit2.description')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 mt-1 text-primary px-2 ">
                    <Users size={20} />
                  </div>
                  <div>
                    <h5 className="text-white font-medium">{t('clubs.benefit3.title')}</h5>
                    <p className="text-gray-400 text-sm">{t('clubs.benefit3.description')}</p>
                  </div>
                </div>
              </div>
              
              <Link href="https://uaemmaf.smoothcomp.com/en/federation/187/academies" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="w-full bg-primary hover:bg-primary-dark text-white">
                  {t('clubs.registerNow')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 