"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

interface SocialMediaLinksProps {
  className?: string;
  username?: string;
}

export default function SocialMediaLinks({ className = "", username = "@Yourusername" }: SocialMediaLinksProps) {
  const socialLinks = [
    {
      name: "WhatsApp",
      url: "https://wa.me/yourusername",
      icon: <FaWhatsapp size={24} />,
      color: "#25D366",
      iconColor: "#25D366",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/yourusername",
      icon: <FaTwitter size={24} />,
      color: "#1DA1F2", 
      iconColor: "#1DA1F2",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/yourusername",
      icon: <FaInstagram size={24} />,
      color: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
      iconColor: "#E1306C",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/user/yourusername",
      icon: <FaYoutube size={24} />,
      color: "#FF0000",
      iconColor: "#FF0000",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/yourusername",
      icon: <FaFacebook size={24} />,
      color: "#1877F2",
      iconColor: "#1877F2",
    }
  ];

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {socialLinks.map((social) => (
        <Link 
          href={social.url} 
          key={social.name}
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full block"
        >
          <motion.div 
            className="relative w-full h-16 rounded-md overflow-hidden shadow-md"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 flex">
              {/* Left white section with icon */}
              <div className="w-[45%] bg-white flex items-center h-full relative">
                <div className="absolute left-6 z-10">
                  <div style={{ color: social.iconColor }}>
                    {social.icon}
                  </div>
                </div>
                
                {/* Custom wave shape divider */}
                <div className="absolute right-0 top-0 h-full overflow-hidden" style={{ width: "30px" }}>
                  <svg 
                    height="100%" 
                    width="100%"
                    viewBox="0 0 30 100" 
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M0,0 C15,33 30,67 0,100" 
                      fill="white" 
                    />
                  </svg>
                </div>
              </div>
              
              {/* Right colored section with username */}
              <div 
                className="w-[55%] h-full flex items-center justify-center"
                style={{
                  background: social.color
                }}
              >
                <span className="text-white font-bold text-xl">
                  {username}
                </span>
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
} 