"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
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
      icon: <FaFacebook size={22} />,
      color: "#1877F2",
      iconColor: "#1877F2",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/uaemmaf?igsh=MTZ6c2xic2tzZWV5dA==",
      icon: <FaInstagram size={22} />,
      color: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
      iconColor: "#E1306C",
    },
    {
      name: "Twitter",
      url: "https://x.com/UAEMMAF?t=Zw8Gkof-X7A9XRbinT1PLA&s=09",
      icon: <FaTwitter size={22} />,
      color: "#1DA1F2", 
      iconColor: "#1DA1F2",
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@UAEMMAF",
      icon: <FaYoutube size={22} />,
      color: "#FF0000",
      iconColor: "#FF0000",
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@uaemmaf",
      icon: <FaTiktok size={22} />,
      color: "#000000",
      iconColor: "#FFFFFF",
    }
  ];

  return (
    <div className={cn("p-4 rounded-lg bg-background-200", className)}>
      <h4 className="text-xl font-bold mb-6 text-white">
        {followText}
      </h4>
      <div className="flex flex-wrap gap-4 max-w-full mx-auto justify-center">
        {socialLinks.map((social) => (
          <Link 
            href={social.url} 
            key={social.name}
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
            style={{ width: 'calc(50% - 1rem)', minWidth: '250px', maxWidth: '350px' }}
          >
            <motion.div 
              className="relative w-full h-14 rounded-md overflow-hidden shadow-md border border-background-300"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.15 }}
            >
              <div className="absolute inset-0 flex">
                {/* Left section with icon */}
                <div className="w-[67%] flex items-center h-full relative bg-background-300">
                  <div className="absolute left-5 z-10">
                    <div style={{ color: social.iconColor }} className="flex items-center gap-2  font-bold">
                    {social.icon}
                    {social.name}
                    
                    </div>
                  </div>
                  
                  {/* Custom wave shape divider */}
                  <div className="absolute right-0 top-0 h-full overflow-hidden" style={{ width: "20px" }}>
                    <svg 
                      height="100%" 
                      width="100%"
                      viewBox="0 0 20 100" 
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M0,0 C10,33 20,67 0,100" 
                        fill="#262626" 
                      />
                    </svg>
                  </div>
                </div>
                
                {/* Right colored section with username */}
                <div 
                  className="w-[60%] h-full flex items-center justify-center"
                  style={{
                    background: social.color,
                    boxShadow: "inset 0 0 8px rgba(0,0,0,0.25)"
                  }}
                >
                  <span className="font-bold text-base text-white">
                    @UAEMMAF
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
} 