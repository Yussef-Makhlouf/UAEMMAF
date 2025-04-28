"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

type Partner = {
  id: number
  name: string
  logo: string
}

export default function PartnersSection() {
  const t = useTranslations('partners')
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const partners: Partner[] = [
    {
      id: 1,
      name: "IMMAF",
      logo: "part.png"
    },
    {
      id: 2,
      name: "UAE Ministry of Sports",
      logo: "part3.png"
    },
    

    {
      id: 4,
      name: "Dubai Sports Council",
      logo: "part4.png"
    },
    {
      id: 5,
      name: "Etihad Airways",
      logo: "part5.png"
    },
    {
      id: 6,
      name: "Dubai Sports Council",
      logo: "part6.png"
    },
    {
      id: 7,
      name: "Dubai Sports Council",
      logo: "part7.png"
    },
    {
      id: 8,
      name: "Dubai Sports Council",
      logo: "part8.png"
    },
    {
      id: 9,
      name: "Dubai Sports Council",
      logo: "part1.png"
    },
     
    
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

  return (
    <section className="py-16 bg-background-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">{t('title')}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{t('description')}</p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.id}
              variants={itemVariants}
              className="flex items-center justify-center"
            >
              <div className="relative h-24 w-full filter grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110 items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain bg-white rounded-[40px] items-center justify-center"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
