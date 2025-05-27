"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { cn } from "@/lib/utils";

interface SocialMediaStyledProps {
  className?: string;
  followText?: string;
}

export default function SocialMediaStyled({ className = "", followText = "Follow Us" }: SocialMediaStyledProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  
  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/share/1KqkSucYDU/",
      icon: <FaFacebook size={28} />,
      color: "#1877F2",
      gradient: "linear-gradient(135deg, #18ACFE, #0165E1)",
      hoverGradient: "linear-gradient(135deg, #0165E1, #18ACFE)",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/uaemmaf?igsh=MTZ6c2xic2tzZWV5dA==",
      icon: <FaInstagram size={28} />,
      color: "#E1306C",
      gradient: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
      hoverGradient: "linear-gradient(45deg, #bc1888, #cc2366, #dc2743, #e6683c, #f09433)",
    },
    {
      name: "X",
      url: "https://x.com/UAEMMAF?t=Zw8Gkof-X7A9XRbinT1PLA&s=09",
      icon: <FaXTwitter size={28} />,
      color: "#000000", 
      gradient: "linear-gradient(135deg, #000000, #333333)",
      hoverGradient: "linear-gradient(135deg, #333333, #000000)",
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@UAEMMAF",
      icon: <FaYoutube size={28} />,
      color: "#FF0000",
      gradient: "linear-gradient(135deg, #FF0000, #CC0000)",
      hoverGradient: "linear-gradient(135deg, #CC0000, #FF0000)",
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@uaemmaf",
      icon: <FaTiktok size={28} />,
      color: "#000000",
      gradient: "linear-gradient(135deg, #25F4EE, #FE2C55, #000000)",
      hoverGradient: "linear-gradient(135deg, #000000, #FE2C55, #25F4EE)",
    }
  ];

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const iconHoverVariants = {
    hover: {
      scale: 1.2,
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={cn(
      "p-8 rounded-2xl bg-gradient-to-br from-background-200 to-background-300 shadow-2xl border border-gray-700/30 backdrop-blur-md", 
      className
    )}>
      <motion.h3 
        className="text-3xl font-extrabold mb-8 text-white bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {followText}
      </motion.h3>
      
      <motion.div 
        className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {socialLinks.map((social) => (
          <motion.div 
            key={social.name}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              href={social.url}
              target="_blank" 
              rel="noopener noreferrer"
              className="block h-full"
            >
              <motion.div 
                className="relative h-20 w-20 rounded-full overflow-hidden shadow-xl backdrop-blur-lg group"
                style={{
                  backgroundImage: social.gradient,
                  backgroundSize: "200% 200%",
                }}
                whileHover={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                  scale: 1.1,
                  transition: { duration: 1.5, ease: "easeInOut" }
                }}
              >
                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-10">
                  <motion.div 
                    className="absolute w-24 h-24 rounded-full bg-white"
                    style={{ top: "-10%", right: "-5%" }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="absolute w-16 h-16 rounded-full bg-white"
                    style={{ bottom: "-5%", left: "10%" }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.1, 0.15, 0.1],
                    }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  />
                </div>
                
                {/* Content container */}
                <div className="absolute inset-0 flex items-center justify-center transition-all">
                  <motion.div 
                    className="flex items-center justify-center w-full h-full"
                    variants={iconHoverVariants}
                    whileHover="hover"
                  >
                    <span className="text-white">
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        {social.icon}
                      </motion.div>
                    </span>
                  </motion.div>
                </div>
       
                {/* No hover overlay effect */}
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
    
  );
}