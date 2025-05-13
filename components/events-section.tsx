"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Sparkles, Calendar, Trophy } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

export default function EventsSection() {
  const t = useTranslations("events");
  const locale = useLocale();
  const isRtl = locale === "ar";
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const shimmerEffect = {
    initial: { backgroundPosition: "0 0" },
    animate: { 
      backgroundPosition: ["0 0", "200% 0"],
      transition: {
        repeat: Infinity,
        repeatType: "mirror" as const,
        duration: 3,
        ease: "linear",
      }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/event.jpg" 
          alt="Events background" 
          fill 
          className="object-cover object-center opacity-20 h-full w-full bg-no-repeat"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-background/70 backdrop-blur-sm"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "mirror" 
          }}
        />
        <motion.div 
          className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "mirror",
            delay: 1 
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block"
          >
            <span className="bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full inline-flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4" />
              {t("upcomingEvents")}
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {t("title")}
          </h2>
          
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {t("eventsDescription") || 
              "All our events are managed through Smoothcomp. Click the links below to view and register for upcoming events or check past events."}
          </motion.p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {/* Upcoming Events Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="relative group h-full"
          >
            {/* <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary-dark/40 rounded-2xl blur-sm group-hover:blur-md transform group-hover:scale-[1.02] transition-all duration-300"></div> */}
            <div className="relative bg-background-300/80 backdrop-blur-sm rounded-xl overflow-hidden border border-primary/20 group-hover:border-primary/40 transition-colors h-full flex flex-col">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                {...shimmerEffect}
              />
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Calendar className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 text-center">
                  {t("upcomingEvents")}
                </h3>
                
                <p className="text-gray-300 mb-8 text-center flex-grow">
                  {t("upcomingEventsDescription") ||
                    "View and register for all upcoming UAE MMA Federation events."}
                </p>
                
                <div className="flex justify-center mt-auto">
                  <Link
                    href="https://uaemmaf.smoothcomp.com/en/federation/187/events/upcoming"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-primary hover:bg-primary-dark text-white px-6 py-3 h-auto text-lg rounded-xl group">
                      <span>{t("viewUpcoming")}</span>
                      <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Past Events Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="relative group h-full"
          >
            {/* <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/40 to-primary/30 rounded-2xl blur-sm group-hover:blur-md transform group-hover:scale-[1.02] transition-all duration-300"></div> */}
            <div className="relative bg-background-300/80 backdrop-blur-sm rounded-xl overflow-hidden border border-primary/20 group-hover:border-primary/40 transition-colors h-full flex flex-col">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                {...shimmerEffect}
              />
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Trophy className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 text-center">
                  {t("pastEvents")}
                </h3>
                
                <p className="text-gray-300 mb-8 text-center flex-grow">
                  {t("pastEventsDescription") ||
                    "Browse our past events, results, and achievements."}
                </p>
                
                <div className="flex justify-center mt-auto">
                  <Link
                    href="https://uaemmaf.smoothcomp.com/en/federation/187/events"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="border-2 border-primary/50 text-white hover:bg-primary/20 px-6 py-3 h-auto text-lg rounded-xl group"
                    >
                      <span>{t("viewPast")}</span>
                      <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Social Media Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-20 text-center"
        >
          <h4 className="text-xl font-bold text-white mb-8">
            {t("followUs") || "Follow Us"}
          </h4>
          <div className={`flex flex-nowrap justify-center ${isRtl ? 'gap-4' : 'space-x-6'}`}>
            <Link
              href="https://www.facebook.com/share/1KqkSucYDU/"
              target="_blank"
              rel="noopener noreferrer"
              className={`group ${isRtl ? 'mx-2' : ''}`}
            >
              <motion.div 
                whileHover={{ y: -5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="bg-background-300/80 backdrop-blur-sm p-4 rounded-full border border-gray-800 group-hover:border-primary/50 group-hover:bg-background-400/80"
              >
                <FaFacebook className="h-6 w-6 text-gray-400 group-hover:text-primary" />
              </motion.div>
            </Link>
            <Link
              href="https://www.instagram.com/uaemmaf?igsh=MTZ6c2xic2tzZWV5dA=="
              target="_blank"
              rel="noopener noreferrer"
              className={`group ${isRtl ? 'mx-2' : ''}`}
            >
              <motion.div 
                whileHover={{ y: -5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="bg-background-300/80 backdrop-blur-sm p-4 rounded-full border border-gray-800 group-hover:border-primary/50 group-hover:bg-background-400/80"
              >
                <FaInstagram className="h-6 w-6 text-gray-400 group-hover:text-primary" />
              </motion.div>
            </Link>
            <Link
              href="https://x.com/UAEMMAF?t=Zw8Gkof-X7A9XRbinT1PLA&s=09"
              target="_blank"
              rel="noopener noreferrer"
              className={`group ${isRtl ? 'mx-2' : ''}`}
            >
              <motion.div 
                whileHover={{ y: -5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="bg-background-300/80 backdrop-blur-sm p-4 rounded-full border border-gray-800 group-hover:border-primary/50 group-hover:bg-background-400/80"
              >
                <FaTwitter className="h-6 w-6 text-gray-400 group-hover:text-primary" />
              </motion.div>
            </Link>
            <Link
              href="https://youtube.com/@UAEMMAF"
              target="_blank"
              rel="noopener noreferrer"
              className={`group ${isRtl ? 'mx-2' : ''}`}
            >
              <motion.div 
                whileHover={{ y: -5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="bg-background-300/80 backdrop-blur-sm p-4 rounded-full border border-gray-800 group-hover:border-primary/50 group-hover:bg-background-400/80"
              >
                <FaYoutube className="h-6 w-6 text-gray-400 group-hover:text-primary" />
              </motion.div>
            </Link>
            <Link
              href="https://www.tiktok.com/@uaemmaf"
              target="_blank"
              rel="noopener noreferrer"
              className={`group ${isRtl ? 'mx-2' : ''}`}
            >
              <motion.div 
                whileHover={{ y: -5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="bg-background-300/80 backdrop-blur-sm p-4 rounded-full border border-gray-800 group-hover:border-primary/50 group-hover:bg-background-400/80"
              >
                <FaTiktok className="h-6 w-6 text-gray-400 group-hover:text-primary" />
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 
