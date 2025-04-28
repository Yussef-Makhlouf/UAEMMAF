"use client"

import { useState } from "react"
import Link from "next/link"
import { useTranslations } from 'next-intl'
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

  // Close all dropdowns when menu is closed
  const handleMenuClose = () => {
    setIsMenuOpen(false)
    setIsEventsOpen(false)
    setIsJoinUsOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <nav className="bg-background border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center relative">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Link href="/">
                <div className="font-bold text-primary text-xl">
                  <Image src="/logo3.png" alt="UAEMMAF Logo" width={110} height={32} />
                </div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md border border-gray-700 text-white hover:bg-gray-800 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill="currentColor" />
              </svg>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <Link 
                href="/" 
                className={`font-medium hover:text-primary transition-colors ${
                  pathname === "/" ? "text-primary" : "text-white"
                }`}
              >
                {t('home')}
              </Link>
              <Link 
                href="/about" 
                className={`font-medium hover:text-primary transition-colors ${
                  pathname.startsWith("/about") ? "text-primary" : "text-white"
                }`}
              >
                {t('about')}
              </Link>
              <Link 
                href="/news" 
                className={`font-medium hover:text-primary transition-colors ${
                  pathname.startsWith("/news") ? "text-primary" : "text-white"
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
                    pathname.startsWith("/events") ? "text-primary" : "text-white"
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
                        href="/events" 
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
                    pathname.startsWith("/join-us") ? "text-primary" : "text-white"
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
                href="/contact" 
                className={`font-medium hover:text-primary transition-colors ${
                  pathname.startsWith("/contact") ? "text-primary" : "text-white"
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
                  <div className="container mx-auto px-4 py-6">
                    <div className="flex justify-between items-center mb-8">
                      <div className="font-bold text-primary text-xl">UAEMMAF</div>
                      <button
                        onClick={handleMenuClose}
                        className="p-2 rounded-md border border-gray-700 text-white hover:bg-gray-800 focus:outline-none"
                        aria-label="Close menu"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor" />
                        </svg>
                      </button>
                    </div>
                    <nav className="flex flex-col gap-4">
                      <Link href="/" className="font-medium text-white hover:text-primary py-3 border-b border-gray-800" onClick={handleMenuClose}>
                        {t('home')}
                      </Link>
                      <Link href="/about" className="font-medium text-white hover:text-primary py-3 border-b border-gray-800" onClick={handleMenuClose}>
                        {t('about')}
                      </Link>
                      <Link href="/news" className="font-medium text-white hover:text-primary py-3 border-b border-gray-800" onClick={handleMenuClose}>
                        {t('news')}
                      </Link>
                      
                      {/* Mobile Events Dropdown */}
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
                              href="/events" 
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
                      
                      {/* Mobile Join Us Dropdown */}
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
                      
                      <Link href="/contact" className="font-medium text-white hover:text-primary py-3 border-b border-gray-800" onClick={handleMenuClose}>
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
