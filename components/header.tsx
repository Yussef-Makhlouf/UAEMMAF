"use client"

import { useState } from "react"
import Link from "next/link"
import { useTranslations, useLocale } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isEventsOpen, setIsEventsOpen] = useState(false)
  const [isJoinUsOpen, setIsJoinUsOpen] = useState(false)
  const t = useTranslations('nav')
  const pathname = usePathname()
  const locale = useLocale()

  const getLocalizedHref = (path: string) => {
    // For external URLs (absolute URLs), return as is
    if (path.startsWith('http')) {
      return path;
    }
    
    // Special handling for the home page
    if (path === '/') {
      if (locale === 'en') {
        return '/'; // Default locale - no prefix needed
      } else {
        return `/${locale}`; // For other locales like Arabic, just use the locale
      }
    }
    
    // Normalize path to ensure it starts with a single slash
    let normalizedPath = path;
    if (!normalizedPath.startsWith('/')) {
      normalizedPath = `/${normalizedPath}`;
    }
    
    // Remove any potential trailing slashes except for the root path
    if (normalizedPath !== '/' && normalizedPath.endsWith('/')) {
      normalizedPath = normalizedPath.slice(0, -1);
    }
    
    // Add locale prefix
    return `/${locale}${normalizedPath}`;
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false)
    setIsEventsOpen(false)
    setIsJoinUsOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <nav className="bg-black py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link 
                href={locale === 'en' ? '/' : `/${locale}`} 
                className="flex-shrink-0"
              >
                <Image 
                  src="/logo3.png" 
                  alt="UAEMMAF Logo" 
                  width={120} 
                  height={70} 
                  loading="lazy"
                  className="rounded-sm"
                />
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                className="text-white p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="w-6 flex items-center justify-center relative">
                  <span className={`transform transition-all duration-300 absolute ${isMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-2"} w-full h-0.5 bg-white rounded-lg`}></span>
                  <span className={`transform transition-all duration-300 absolute ${isMenuOpen ? "opacity-0 translate-x-3" : "opacity-100"} w-full h-0.5 bg-white rounded-lg`}></span>
                  <span className={`transform transition-all duration-300 absolute ${isMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-2"} w-full h-0.5 bg-white rounded-lg`}></span>
                </div>
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <Link 
                href={locale === 'en' ? '/' : `/${locale}`}
                className={`font-medium hover:text-primary transition-colors ${
                  pathname === "/" || pathname === `/${locale}` ? "text-primary" : "text-white"
                }`}
              >
                {t('home')}
              </Link>
              <Link 
                href={getLocalizedHref('/about')}
                className={`font-medium hover:text-primary transition-colors ${
                  pathname.includes("/about") ? "text-primary" : "text-white"
                }`}
              >
                {t('about')}
              </Link>
              <Link 
                href={getLocalizedHref('/news')}
                className={`font-medium hover:text-primary transition-colors ${
                  pathname.includes("/news") ? "text-primary" : "text-white"
                }`}
              >
                {t('news')}
              </Link>
              
              {/* Events Dropdown */}
              <div className="relative group">
                <button 
                  onClick={() => setIsEventsOpen(!isEventsOpen)}
                  onMouseEnter={() => setIsEventsOpen(true)}
                  className={`flex items-center gap-1 font-medium hover:text-primary transition-colors ${
                    pathname.includes("/events") ? "text-primary" : "text-white"
                  }`}
                >
                  {t('events')}
                  <ChevronDown size={16} />
                </button>
                <AnimatePresence>
                  {isEventsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-48 bg-background-300 rounded-md shadow-lg py-1 z-50"
                      onMouseLeave={() => setIsEventsOpen(false)}
                    >
                      <Link 
                        href={getLocalizedHref('/events')}
                        className="block px-4 py-2 text-sm text-white hover:bg-background-400 hover:text-primary"
                      >
                        {t('events')}
                      </Link>
                      <Link 
                        href="https://uaemmaf.smoothcomp.com/en/federation/187/events/upcoming" 
                        className="block px-4 py-2 text-sm text-white hover:bg-background-400 hover:text-primary"
                      >
                        {t('upcomingEvents')}
                      </Link>
                      <Link 
                        href="https://uaemmaf.smoothcomp.com/en/federation/187/events/past" 
                        className="block px-4 py-2 text-sm text-white hover:bg-background-400 hover:text-primary"
                      >
                        {t('pastEvents')}
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Join Us Dropdown */}
              <div className="relative group">
                <button 
                  onClick={() => setIsJoinUsOpen(!isJoinUsOpen)}
                  onMouseEnter={() => setIsJoinUsOpen(true)}
                  className={`flex items-center gap-1 font-medium hover:text-primary transition-colors ${
                    pathname.includes("/join-us") ? "text-primary" : "text-white"
                  }`}
                >
                  {t('joinUs')}
                  <ChevronDown size={16} />
                </button>
                <AnimatePresence>
                  {isJoinUsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-48 bg-background-300 rounded-md shadow-lg py-1 z-50"
                      onMouseLeave={() => setIsJoinUsOpen(false)}
                    >
                      <Link 
                        href="https://uaemmaf.smoothcomp.com/en/federation/187/membership" 
                        className="block px-4 py-2 text-sm text-white hover:bg-background-400 hover:text-primary"
                      >
                        {t('athletes')}
                      </Link>
                      <Link 
                        href="https://uaemmaf.smoothcomp.com/en/federation/187/academies" 
                        className="block px-4 py-2 text-sm text-white hover:bg-background-400 hover:text-primary"
                      >
                        {t('clubs')}
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <Link 
                href={getLocalizedHref('/contact')}
                className={`font-medium hover:text-primary transition-colors ${
                  pathname.includes("/contact") ? "text-primary" : "text-white"
                }`}
              >
                {t('contact')}
              </Link>
              
              <div className="ml-4">
                <LanguageSwitcher />
              </div>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, x: "100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "100%" }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-background z-50 lg:hidden overflow-y-auto"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                      <Link 
                        href={locale === 'en' ? '/' : `/${locale}`} 
                        className="flex-shrink-0" 
                        onClick={handleMenuClose}
                      >
                        <Image 
                          src="/logo3.png" 
                          alt="UAEMMAF Logo" 
                          width={120} 
                          height={70} 
                          loading="lazy"
                          className="rounded-sm"
                        />
                      </Link>
                      <button
                        type="button"
                        className="text-white p-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                    
                    <nav className="flex flex-col space-y-6">
                      <Link 
                        href={locale === 'en' ? '/' : `/${locale}`} 
                        className="font-medium text-white hover:text-primary py-3 border-b border-gray-800" 
                        onClick={handleMenuClose}
                      >
                        {t('home')}
                      </Link>
                      <Link href={getLocalizedHref('/about')} className="font-medium text-white hover:text-primary py-3 border-b border-gray-800" onClick={handleMenuClose}>
                        {t('about')}
                      </Link>
                      <Link href={getLocalizedHref('/news')} className="font-medium text-white hover:text-primary py-3 border-b border-gray-800" onClick={handleMenuClose}>
                        {t('news')}
                      </Link>
                      
                      <div className="py-3 border-b border-gray-800">
                        <button 
                          onClick={() => setIsEventsOpen(!isEventsOpen)}
                          className="flex items-center justify-between w-full font-medium text-white hover:text-primary"
                        >
                          {t('events')}
                          <ChevronDown size={16} />
                        </button>
                        {isEventsOpen && (
                          <div className="mt-2 pl-4 flex flex-col gap-2">
                            <Link 
                              href={getLocalizedHref('/events')}
                              className="text-sm text-gray-300 hover:text-primary py-2"
                              onClick={handleMenuClose}
                            >
                              {t('events')}
                            </Link>
                            <Link 
                              href="https://uaemmaf.smoothcomp.com/en/federation/187/events/upcoming" 
                              className="text-sm text-gray-300 hover:text-primary py-2"
                              onClick={handleMenuClose}
                            >
                              {t('upcomingEvents')}
                            </Link>
                            <Link 
                              href="https://uaemmaf.smoothcomp.com/en/federation/187/events/past" 
                              className="text-sm text-gray-300 hover:text-primary py-2"
                              onClick={handleMenuClose}
                            >
                              {t('pastEvents')}
                            </Link>
                          </div>
                        )}
                      </div>
                      
                      <div className="py-3 border-b border-gray-800">
                        <button 
                          onClick={() => setIsJoinUsOpen(!isJoinUsOpen)}
                          className="flex items-center justify-between w-full font-medium text-white hover:text-primary"
                        >
                          {t('joinUs')}
                          <ChevronDown size={16} />
                        </button>
                        {isJoinUsOpen && (
                          <div className="mt-2 pl-4 flex flex-col gap-2">
                            <Link 
                              href="https://uaemmaf.smoothcomp.com/en/federation/187/membership" 
                              className="text-sm text-gray-300 hover:text-primary py-2"
                              onClick={handleMenuClose}
                            >
                              {t('athletes')}
                            </Link>
                            <Link 
                              href="https://uaemmaf.smoothcomp.com/en/federation/187/academies" 
                              className="text-sm text-gray-300 hover:text-primary py-2"
                              onClick={handleMenuClose}
                            >
                              {t('clubs')}
                            </Link>
                          </div>
                        )}
                      </div>
                      
                      <Link href={getLocalizedHref('/contact')} className="font-medium text-white hover:text-primary py-3 border-b border-gray-800" onClick={handleMenuClose}>
                        {t('contact')}
                      </Link>
                      
                      <div className="mt-6">
                        <LanguageSwitcher />
                      </div>
                    </nav>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </header>
  )
}
