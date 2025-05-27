"use client";

import { useTranslations, useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Award, Users, Star, Shield, Lightbulb, HandshakeIcon, Trophy, Eye, Target } from "lucide-react"

export default function MissionPage() {
  const t = useTranslations('aboutPage')
  const locale = useLocale()
  
  // Create link with language
  const getLocalizedHref = (path: string) => {
    if (path === '/') {
      return `/${locale === 'en' ? '' : locale}`;
    }
    return `/${locale}${path.startsWith('/') ? path : `/${path}`}`;
  };

  // Define values data with icons
  const values = [
    {
      icon: Award,
      title: locale === 'ar' ? 'الروح الرياضية والتسامح' : 'Sportsmanship and Tolerance',
      description: locale === 'ar' 
        ? 'ترسيخ ثقافة احترام الخصم والالتزام الراسخ بقواعد اللعب النظيف' 
        : 'Establishing a culture of respect for opponents and a firm commitment to fair play rules'
    },
    {
      icon: Shield,
      title: locale === 'ar' ? 'الولاء' : 'Loyalty',
      description: locale === 'ar' 
        ? 'زرع قيم الولاء والإنتماء في اللاعبين والتفاني في سبيل اعلاء راية الوطن' 
        : 'Instilling values of loyalty and belonging in players and dedication to raising the nation\'s flag'
    },
    {
      icon: Star,
      title: locale === 'ar' ? 'الثقة بالنفس' : 'Self-confidence',
      description: locale === 'ar' 
        ? 'المساهمة في بناء جيل قوي يدافع عن ذاته وأسرته ومجتمعه' 
        : 'Contributing to building a strong generation that defends itself, its family and society'
    },
    {
      icon: Users,
      title: locale === 'ar' ? 'الاحترافية' : 'Professionalism',
      description: locale === 'ar' 
        ? 'العمل على تطوير الأداء والموارد وتأهيل لاعبين ذوي كفاءة واحترافية عالية' 
        : 'Working on developing performance and resources and qualifying players with high efficiency and professionalism'
    },
    {
      icon: Lightbulb,
      title: locale === 'ar' ? 'التميز والابتكار' : 'Excellence and Innovation',
      description: locale === 'ar' 
        ? 'الالتزام بمعايير الجودة والتميز الرياضي المعتمدة على الصعيدين المحلي والدولي' 
        : 'Commitment to quality standards and sporting excellence adopted at local and international levels'
    },
    {
      icon: HandshakeIcon,
      title: locale === 'ar' ? 'العمل الجماعي' : 'Teamwork',
      description: locale === 'ar' 
        ? 'تعزيز ثقافة العمل الجماعي والتعاون والمشاركة وتبادل المعرفة من أجل تحقيق الأهداف' 
        : 'Promoting a culture of teamwork, cooperation, participation and knowledge exchange to achieve goals'
    },
    {
      icon: Trophy,
      title: locale === 'ar' ? 'الاعتراف بالانجازات' : 'Recognition of Achievements',
      description: locale === 'ar' 
        ? 'تقدير الانجازات والاحتفاء بها والتحفيز على مواصلة مسيرة النجاح' 
        : 'Appreciating achievements, celebrating them and motivating the continuation of the success journey'
    }
    
  ];

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
  
  const [refVIP, inViewVIP] = useInView({
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
  
  const floatVariants = {
    hidden: { y: 0 },
    visible: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className={`min-h-screen bg-background-100 ${locale === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Hero Banner */}
      <div className="relative h-[450px] bg-background-300 flex items-center justify-center overflow-hidden border-b border-primary/30">
        <div className="absolute inset-0">
          <Image
            src="/subhero.png"
            alt={locale === 'ar' ? 'القيم' : 'About UAEMMAF'}
            fill
            className="object-cover opacity-20 transition-transform duration-[15000ms] hover:scale-105"
            priority
            quality={85}
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {locale === 'ar' ? 'عن اتحاد الإمارات للفنون القتالية المختلطة' : 'About UAEMMAF'}
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-300">
            <Link href={getLocalizedHref('/')} className="hover:text-primary transition-colors">
              {t('breadcrumbs.home')}
            </Link>
            <span>/</span>
            {/* <Link href={getLocalizedHref('/about')} className="hover:text-primary transition-colors">
              {t('breadcrumbs.about')}
            </Link> */}
           
            <span className="text-white truncate max-w-[200px] md:max-w-[300px]">{locale === 'ar' ? 'عن اتحاد الإمارات للفنون القتالية المختلطة' : 'About UAEMMAF'}</span>
            
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
 {/* VIP Vision & Mission Section */}
      <motion.div 
        ref={refVIP}
        variants={containerVariants}
        initial="hidden"
        animate={inViewVIP ? "visible" : "hidden"}
        className="bg-gradient-to-r from-background-300 to-background-400 py-16 border-y border-primary/30"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Gold Accent Divider */}
            <div className="flex items-center justify-center mb-12">
              <div className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent w-full"></div>
            </div>
            
            {/* Vision & Mission Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Vision Card */}
              <motion.div 
                variants={itemVariants}
                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-background-300 to-background-400 border border-primary/30 group"
              >
                {/* Corner Decorations */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/60"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/60"></div>
                
                <div className="p-8 relative z-10">
                  {/* Icon */}
                  <motion.div 
                    variants={floatVariants}
                    animate="visible"
                    className="w-20 h-20 bg-gradient-to-br from-primary to-primary/60 rounded-full mx-auto flex items-center justify-center mb-6 shadow-lg shadow-primary/20"
                  >
                    <Eye className="h-10 w-10 text-background-300" />
                  </motion.div>
                  
                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 mb-6">
                    {locale === 'ar' ? 'الرؤية' : 'Vision'}
                  </h2>
                  
                  {/* Content */}
                  <p className="text-white text-center text-xl font-semibold leading-relaxed">
                    {locale === 'ar' 
                      ? 'الريادة العالمية في رياضة الفنون القتالية المختلطة'
                      : 'Becoming a Global Leader in MMA Sports'}
                  </p>
                  
                  {/* Background Element */}
                  <div className="absolute -bottom-8 -right-8 opacity-10">
                    <Eye className="w-32 h-32 text-primary" />
                  </div>
                </div>
                
                {/* Shiny Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>
              
              {/* Mission Card */}
              <motion.div 
                variants={itemVariants}
                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-background-300 to-background-400 border border-primary/30 group"
              >
                {/* Corner Decorations */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary/60"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary/60"></div>
                
                <div className="p-8 relative z-10">
                  {/* Icon */}
                  <motion.div 
                    variants={floatVariants}
                    animate="visible"
                    className="w-20 h-20 bg-gradient-to-br from-primary to-primary/60 rounded-full mx-auto flex items-center justify-center mb-6 shadow-lg shadow-primary/20"
                  >
                    <Target className="h-10 w-10 text-background-300" />
                  </motion.div>
                  
                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 mb-6">
                    {locale === 'ar' ? 'الرسالة' : 'Mission'}
                  </h2>
                  
                  {/* Content */}
                  <p className="text-white text-lg leading-relaxed">
                    {locale === 'ar'
                      ? 'تعزيز نمو رياضة الفنون القتالية المختلطة من خلال البرامج التدريبية الهادفة إلى تنمية قدرات الرياضيين في جميع الفئات بهدف تحقيق الانجازات في المحافل العالمية، وتنظيم واستضافة بطولات محلية ودولية وفقاً لأفضل المعايير العالمية.'
                      : 'Organize national and international MMA competitions, nurture MMA athletes across all categories, and foster the growth of MMA within the local community.'}
                  </p>
                  
                  {/* Background Element */}
                  <div className="absolute -bottom-8 -right-8 opacity-10">
                    <Target className="w-32 h-32 text-primary" />
                  </div>
                </div>
                
                {/* Shiny Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>
            </div>
            
            {/* Gold Accent Divider */}
            <div className="flex items-center justify-center mt-12">
              <div className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent w-full"></div>
            </div>
          </div>
        </div>
      </motion.div>
        {/* Values Section Title */}
        <motion.div
          ref={ref1}
          variants={containerVariants}
          initial="hidden"
          animate={inView1 ? "visible" : "hidden"}
          className="text-center max-w-4xl mx-auto mb-16 py-10"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {locale === 'ar' ? 'القيم' : 'Our Values'}
            </h2>
            <div className="h-1 w-24 bg-primary mb-6 mx-auto"></div>
          </motion.div>
          <motion.h3 variants={itemVariants} className="text-primary text-xl font-bold mb-4">
            {locale === 'ar' 
              ? 'يسعى اتحاد الإمارات العربية المتحدة لفنون القتال المختلطة إلى تعزيز القيم التالية' 
              : 'The UAE Mixed Martial Arts Federation seeks to promote the following values'}
          </motion.h3>
          {/* <motion.p variants={itemVariants} className="text-gray-300 text-lg">
            {locale === 'ar'
              ? 'قيمنا هي الأساس الذي نبني عليه مستقبل رياضة فنون القتال المختلطة في دولة الإمارات. من خلال هذه القيم، نسعى لتطوير رياضيين يتميزون ليس فقط بالمهارة الفنية، ولكن أيضًا بالأخلاق والانضباط والروح الرياضية العالية.'
              : 'Our values are the foundation upon which we build the future of mixed martial arts in the UAE. Through these values, we aim to develop athletes who excel not only in technical skill but also in ethics, discipline, and high sportsmanship.'}
          </motion.p> */}
        </motion.div>

        {/* Values Cards - Special Design */}
        <motion.div
          ref={ref2}
          variants={containerVariants}
          initial="hidden"
          animate={inView2 ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="bg-gradient-to-br from-background-300 to-background-400 rounded-lg overflow-hidden transition-all duration-300 
                hover:scale-105 hover:shadow-lg hover:shadow-primary/20 group relative"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/60"></div>
                <div className="p-8">
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="text-primary h-8 w-8 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                      {value.title}
                    </h3>
                  </div>
                  <div className="relative">
                    <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                      {value.description}
                    </p>
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 opacity-10 text-primary">
                      <Icon className="w-full h-full" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        

      </div>



    </div>
  )
} 