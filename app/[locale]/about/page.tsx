"use client";

import { useTranslations, useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import ContactSection from "@/components/contact-section"
import AboutSection from "@/components/about-section"
export default function AboutPage() {
  const t = useTranslations('aboutPage')
  const locale = useLocale()
  
  // إنشاء رابط مع اللغة
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
  
  const [ref3, inView3] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [ref4, inView4] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [ref5, inView5] = useInView({
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
              alt={t('heroTitle')}
              fill
              className="object-cover opacity-20 transition-transform duration-[15000ms] hover:scale-105"
              priority
              quality={85}
            />
          </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('heroTitle')}</h1>
          <div className="flex items-center justify-center gap-2 text-gray-300">
            <Link href={getLocalizedHref('/')} className="hover:text-primary transition-colors">
              {t('breadcrumbs.home')}
            </Link>
            <span>/</span>
            <span className="text-white">{t('breadcrumbs.about')}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* About Us Section */}
        <motion.div
          ref={ref1}
          variants={containerVariants}
          initial="hidden"
          animate={inView1 ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <motion.div variants={itemVariants} className="relative">
            <div className="relative h-[400px] lg:h-[500px] w-full rounded-lg overflow-hidden">
              <Image
                src="/main5.jpg" 
                alt={t('aboutUs.imageAlt')}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-40"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary p-6 rounded-lg shadow-xl">
              <div className="text-white text-center">
                <p className="text-5xl font-bold">2021</p>
                <p className="text-sm uppercase tracking-wide">{t('aboutUs.established')}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col space-y-6">
            <div>
              <h2 className="text-primary text-lg font-medium">{t('aboutUs.badge')}</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white mt-2">
                {t('aboutUs.title')}
              </h3>
            </div>
            
            <div className="bg-background-300 p-6 rounded-lg border-l-4 border-primary">
              <p className="text-white italic">
                {t('aboutUs.mission')}
              </p>
              <p className="text-gray-300">
              {t('aboutUs.paragraph1')}
            </p>
            
            <p className="text-gray-300">
              {t('aboutUs.paragraph2')}
            </p>
            </div>
            
       
          </motion.div>
        </motion.div>
{/* <AboutSection /> */}

        {/* Vision and Goals */}
        <motion.div
          ref={ref2}
          variants={containerVariants}
          initial="hidden"
          animate={inView2 ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <motion.div variants={itemVariants} className="flex flex-col space-y-6 order-2 lg:order-1">
            <div>
              <h2 className="text-primary text-lg font-medium">{t('vision.badge')}</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white mt-2">
                {t('vision.title')}
              </h3>
            </div>
            
            <p className="text-gray-300">
              {t('vision.description')}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {[0, 1, 2, 3].map(index => (
                <div key={index} className="bg-background-300 p-4 rounded-lg">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mb-2">
                    <span className="text-primary font-bold">{index + 1}</span>
                  </div>
                  <p className="text-white font-medium">{t(`vision.goals.${index}`)}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative order-1 lg:order-2">
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
              <Image
                src="/main.jpg"
                alt={t('vision.imageAlt')}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-40"></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Mission and Values */}
        <motion.div
          ref={ref3}
          variants={containerVariants}
          initial="hidden"
          animate={inView3 ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <motion.div variants={itemVariants} className="relative">
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
              <Image
                src="/main2.jpg"
                alt={t('mission.imageAlt')}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-40"></div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col space-y-6">
            <div>
              <h2 className="text-primary text-lg font-medium">{t('mission.badge')}</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white mt-2">
                {t('mission.title')}
              </h3>
            </div>
            
            <p className="text-gray-300">
              {t('mission.description')}
            </p>
            
            <div className="space-y-4 mt-6">
              {[0, 1, 2, 3].map(index => (
                <div key={index} className="flex items-start">
                  <div className="mr-4 mt-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-white">{t(`mission.values.${index}`)}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* President's Message */}
        <motion.div
          ref={ref5}
          variants={containerVariants}
          initial="hidden"
          animate={inView5 ? "visible" : "hidden"}
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
              <p className="text-white text-xl" >
                {t('presidentMessage.message1')}
              </p>
            </div>
            
            <p className="text-gray-300" >
              {t('presidentMessage.message2')}
            </p>
            
            <div className="text-white ">
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
              {/* <div className="absolute bottom-0 right-0 bg-primary p-4 rounded-full w-24 h-24 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">الرئيس</span>
              </div> */}
            </div>
          </motion.div>
        </motion.div>
        {/* Leadership */}
        <motion.div
          ref={ref4}
          variants={containerVariants}
          initial="hidden"
          animate={inView4 ? "visible" : "hidden"}
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
                {/* <p className="text-gray-300 text-sm">{t(`leadership.members.${index}.bio`, {fallback: ''})}</p> */}
                {/* <div className="flex justify-center gap-3 mt-4">
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                </svg>
                  </a>
              
                </div> */}
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-center mt-10">
            {/* <Link href="/team">
              <Button className="bg-primary hover:bg-primary-dark text-white">
                {t('leadership.viewFullTeam')}
              </Button>
            </Link> */}
          </motion.div>
        </motion.div>
      </div>
      
      <ContactSection />
    </div>
  )
}