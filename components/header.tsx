"use client"

import { useState, useRef, useEffect } from "react"
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
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  
  const eventsRef = useRef<HTMLDivElement>(null)
  const joinUsRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  
  const t = useTranslations('nav')
  const pathname = usePathname()
  const locale = useLocale()

  // Animation variants for dropdowns
  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -5,
      transition: { 
        duration: 0.2,
        ease: "easeInOut" 
      }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut" 
      }
    }
  }

  // Mobile dropdown animation variants
  const mobileDropdownVariants = {
    hidden: { 
      height: 0, 
      opacity: 0,
      transition: {
        height: { duration: 0.3, ease: "easeInOut" },
        opacity: { duration: 0.2 }
      }
    },
    visible: { 
      height: "auto", 
      opacity: 1,
      transition: {
        height: { duration: 0.4, ease: "easeOut" },
        opacity: { duration: 0.3, delay: 0.1 }
      }
    }
  }

  // Mobile menu animation variants
  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

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
    setIsAboutOpen(false)
  }

  // Add delay before closing dropdown to improve UX
  const handleDropdownMouseLeave = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    // Small delay before closing to allow user to move cursor to dropdown content
    setTimeout(() => {
      setter(false)
    }, 150)
  }

  // Handle clicks outside dropdown to close them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (eventsRef.current && !eventsRef.current.contains(event.target as Node)) {
        setIsEventsOpen(false)
      }
      if (joinUsRef.current && !joinUsRef.current.contains(event.target as Node)) {
        setIsJoinUsOpen(false)
      }
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setIsAboutOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Close dropdowns when navigating
  useEffect(() => {
    handleMenuClose()
  }, [pathname])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <nav className="bg-black py-3">
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
                  width={160} 
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
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation menu"
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
              
              {/* About Dropdown */}
              <div 
                ref={aboutRef}
                className="relative group"
                onMouseEnter={() => setIsAboutOpen(true)}
                onMouseLeave={() => handleDropdownMouseLeave(setIsAboutOpen)}
              >
                <button 
                  className={`flex items-center gap-1 font-medium hover:text-primary transition-colors ${
                    pathname.includes("/about") ? "text-primary" : "text-white"
                  }`}
                  onClick={() => setIsAboutOpen(!isAboutOpen)}
                  aria-expanded={isAboutOpen}
                  aria-haspopup="true"
                >
                  {t('about')}
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-300 ease-in-out ${isAboutOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                <AnimatePresence>
                  {isAboutOpen && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                      className="absolute left-0 mt-2 w-48 bg-background-300 rounded-md shadow-lg py-1 z-50 overflow-hidden"
                    >
                      <Link 
                        href={getLocalizedHref('/mission')}
                        className="block px-4 py-2 text-sm text-white hover:bg-background-400 hover:text-primary transition-colors duration-200"
                      >
                        {t('mission')}
                      </Link>
                      <Link 
                        href={getLocalizedHref('/leadership')}
                        className="block px-4 py-2 text-sm text-white hover:bg-background-400 hover:text-primary transition-colors duration-200"
                      >
                        {t('leadership')}
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <Link 
                href={getLocalizedHref('/news')}
                className={`font-medium hover:text-primary transition-colors ${
                  pathname.includes("/news") ? "text-primary" : "text-white"
                }`}
              >
                {t('news')}
              </Link>
              
              {/* Events Dropdown */}
              <div 
                ref={eventsRef}
                className="relative group"
                onMouseEnter={() => setIsEventsOpen(true)}
                onMouseLeave={() => handleDropdownMouseLeave(setIsEventsOpen)}
              >
                <button 
                  className={`flex items-center gap-1 font-medium hover:text-primary transition-colors ${
                    pathname.includes("/events") ? "text-primary" : "text-white"
                  }`}
                  onClick={() => setIsEventsOpen(!isEventsOpen)}
                  aria-expanded={isEventsOpen}
                  aria-haspopup="true"
                >
                  {t('events')}
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-300 ease-in-out ${isEventsOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                <AnimatePresence>
                  {isEventsOpen && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                      className="absolute left-0 mt-2 w-48 bg-background-300 rounded-md shadow-lg py-1 z-50 overflow-hidden"
                    >
                      <Link 
                        href="https://uaemmaf.smoothcomp.com/en/federation/187/events/upcoming" 
                        target="_blank"
                        className="block px-4 py-2 text-sm text-white hover:bg-background-400 hover:text-primary transition-colors duration-200"
                      >
                        {t('upcomingEvents')}
                      </Link>
                      <Link 
                        href="https://uaemmaf.smoothcomp.com/en/federation/187/events/past" 
                        target="_blank"
                        className="block px-4 py-2 text-sm text-white hover:bg-background-400 hover:text-primary transition-colors duration-200"
                      >
                        {t('pastEvents')}
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Join Us Dropdown */}
              <div 
                ref={joinUsRef}
                className="relative group"
                onMouseEnter={() => setIsJoinUsOpen(true)}
                onMouseLeave={() => handleDropdownMouseLeave(setIsJoinUsOpen)}
              >
                <button 
                  className={`flex items-center gap-1 font-medium hover:text-primary transition-colors ${
                    pathname.includes("/join-us") ? "text-primary" : "text-white"
                  }`}
                  onClick={() => setIsJoinUsOpen(!isJoinUsOpen)}
                  aria-expanded={isJoinUsOpen}
                  aria-haspopup="true"
                >
                  {t('joinUs')}
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-300 ease-in-out ${isJoinUsOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                <AnimatePresence>
                  {isJoinUsOpen && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                      className="absolute left-0 mt-2 w-48 bg-background-300 rounded-md shadow-lg py-1 z-50 overflow-hidden"
                    >
                      <Link 
                        href="https://uaemmaf.smoothcomp.com/en/federation/187/membership" 
                        className="block px-4 py-2 text-sm text-white hover:bg-background-400 hover:text-primary transition-colors duration-200"
                      >
                        {t('athletes')}
                      </Link>
                      <Link 
                        href="https://uaemmaf.smoothcomp.com/en/federation/187/academies" 
                        className="block px-4 py-2 text-sm text-white hover:bg-background-400 hover:text-primary transition-colors duration-200"
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
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={mobileMenuVariants}
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
                          width={150} 
                          height={70} 
                          loading="lazy"
                          className="rounded-sm"
                        />
                      </Link>
                      <button
                        type="button"
                        className="text-white p-2"
                        onClick={() => setIsMenuOpen(false)}
                        aria-label="Close menu"
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
                        className="font-medium text-white hover:text-primary py-3 border-b border-gray-800 transition-colors duration-200" 
                        onClick={handleMenuClose}
                      >
                        {t('home')}
                      </Link>
                      
                      <div className="py-3 border-b border-gray-800">
                        <button 
                          onClick={() => setIsAboutOpen(!isAboutOpen)}
                          className="flex items-center justify-between w-full font-medium text-white hover:text-primary transition-colors duration-200"
                          aria-expanded={isAboutOpen}
                        >
                          {t('about')}
                          <ChevronDown 
                            size={16} 
                            className={`transition-transform duration-300 ease-in-out ${isAboutOpen ? 'rotate-180' : ''}`} 
                          />
                        </button>
                        <AnimatePresence>
                          {isAboutOpen && (
                            <motion.div
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              variants={mobileDropdownVariants}
                              className="mt-2 pl-4 flex flex-col gap-2 overflow-hidden"
                            >
                              <Link 
                                href={getLocalizedHref('/mission')}
                                className="text-sm text-gray-300 hover:text-primary py-2 transition-colors duration-200"
                                onClick={handleMenuClose}
                              >
                                {t('mission')}
                              </Link>
                              <Link 
                                href={getLocalizedHref('/leadership')}
                                className="text-sm text-gray-300 hover:text-primary py-2 transition-colors duration-200"
                                onClick={handleMenuClose}
                              >
                                {t('leadership')}
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      <Link 
                        href={getLocalizedHref('/news')} 
                        className="font-medium text-white hover:text-primary py-3 border-b border-gray-800 transition-colors duration-200" 
                        onClick={handleMenuClose}
                      >
                        {t('news')}
                      </Link>
                      
                      <div className="py-3 border-b border-gray-800">
                        <button 
                          onClick={() => setIsEventsOpen(!isEventsOpen)}
                          className="flex items-center justify-between w-full font-medium text-white hover:text-primary transition-colors duration-200"
                          aria-expanded={isEventsOpen}
                        >
                          {t('events')}
                          <ChevronDown 
                            size={16} 
                            className={`transition-transform duration-300 ease-in-out ${isEventsOpen ? 'rotate-180' : ''}`} 
                          />
                        </button>
                        <AnimatePresence>
                          {isEventsOpen && (
                            <motion.div
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              variants={mobileDropdownVariants}
                              className="mt-2 pl-4 flex flex-col gap-2 overflow-hidden"
                            >
                              <Link 
                                href="https://uaemmaf.smoothcomp.com/en/federation/187/events/upcoming" 
                                className="text-sm text-gray-300 hover:text-primary py-2 transition-colors duration-200"
                                onClick={handleMenuClose}
                              >
                                {t('upcomingEvents')}
                              </Link>
                              <Link 
                                href="https://uaemmaf.smoothcomp.com/en/federation/187/events/past" 
                                className="text-sm text-gray-300 hover:text-primary py-2 transition-colors duration-200"
                                onClick={handleMenuClose}
                              >
                                {t('pastEvents')}
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      <div className="py-3 border-b border-gray-800">
                        <button 
                          onClick={() => setIsJoinUsOpen(!isJoinUsOpen)}
                          className="flex items-center justify-between w-full font-medium text-white hover:text-primary transition-colors duration-200"
                          aria-expanded={isJoinUsOpen}
                        >
                          {t('joinUs')}
                          <ChevronDown 
                            size={16} 
                            className={`transition-transform duration-300 ease-in-out ${isJoinUsOpen ? 'rotate-180' : ''}`} 
                          />
                        </button>
                        <AnimatePresence>
                          {isJoinUsOpen && (
                            <motion.div
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              variants={mobileDropdownVariants}
                              className="mt-2 pl-4 flex flex-col gap-2 overflow-hidden"
                            >
                              <Link 
                                href="https://uaemmaf.smoothcomp.com/en/federation/187/membership" 
                                className="text-sm text-gray-300 hover:text-primary py-2 transition-colors duration-200"
                                onClick={handleMenuClose}
                              >
                                {t('athletes')}
                              </Link>
                              <Link 
                                href="https://uaemmaf.smoothcomp.com/en/federation/187/academies" 
                                className="text-sm text-gray-300 hover:text-primary py-2 transition-colors duration-200"
                                onClick={handleMenuClose}
                              >
                                {t('clubs')}
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      <Link 
                        href={getLocalizedHref('/contact')} 
                        className="font-medium text-white hover:text-primary py-3 border-b border-gray-800 transition-colors duration-200" 
                        onClick={handleMenuClose}
                      >
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
