"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Types for the navbar component
export interface NavItem {
  label: string
  href?: string
  children?: NavItem[]
  external?: boolean
}

export interface NavbarProps {
  logo?: {
    src: string
    alt: string
    width?: number
    height?: number
  }
  items: NavItem[]
  className?: string
  variant?: 'default' | 'transparent' | 'glass'
  onItemClick?: (item: NavItem) => void
}

// Animation variants
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

const underlineVariants = {
  hidden: { 
    width: 0,
    left: "50%",
    transition: { 
      duration: 0.2,
      ease: "easeInOut" 
    }
  },
  visible: { 
    width: "100%",
    left: 0,
    transition: { 
      duration: 0.3,
      ease: "easeOut" 
    }
  }
}

export function Navbar({ 
  logo, 
  items, 
  className, 
  variant = 'default',
  onItemClick 
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set())
  const dropdownRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()

  // Variant styles
  const variantStyles = {
    default: "bg-gradient-to-r from-red-900/95 to-red-950/95 backdrop-blur-sm border-b border-red-800/30",
    transparent: "bg-transparent",
    glass: "bg-white/10 backdrop-blur-md border-b border-white/20"
  }

  const handleMenuClose = () => {
    setIsMenuOpen(false)
    setOpenDropdowns(new Set())
  }

  const handleDropdownOpen = (itemLabel: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }

    // Close other dropdowns
    const newOpenDropdowns = new Set([itemLabel])
    setOpenDropdowns(newOpenDropdowns)
  }

  const handleDropdownMouseLeave = (itemLabel: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
    
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdowns(prev => {
        const newSet = new Set(prev)
        newSet.delete(itemLabel)
        return newSet
      })
      closeTimeoutRef.current = null
    }, 300)
  }

  const handleItemClick = (item: NavItem) => {
    if (onItemClick) {
      onItemClick(item)
    }
    handleMenuClose()
  }

  const isActive = (href?: string) => {
    if (!href) return false
    return pathname === href || pathname.startsWith(href)
  }

  // Handle clicks outside dropdown to close them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      let clickedInside = false
      dropdownRefs.current.forEach((ref) => {
        if (ref.contains(event.target as Node)) {
          clickedInside = true
        }
      })

      if (!clickedInside) {
        setOpenDropdowns(new Set())
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  // Close dropdowns when navigating
  useEffect(() => {
    handleMenuClose()
  }, [pathname])

  const renderNavItem = (item: NavItem, index: number) => {
    const hasChildren = item.children && item.children.length > 0
    const isDropdownOpen = openDropdowns.has(item.label)
    const active = isActive(item.href)

    if (hasChildren) {
      return (
        <div 
          key={`${item.label}-${index}`}
          ref={(el) => {
            if (el) dropdownRefs.current.set(item.label, el)
          }}
          className="relative group"
          onMouseEnter={() => handleDropdownOpen(item.label)}
          onMouseLeave={() => handleDropdownMouseLeave(item.label)}
        >
          <button 
            className="relative font-medium text-white/90 hover:text-white transition-all duration-300 group py-2"
            onClick={() => {
              const newOpenDropdowns = new Set(openDropdowns)
              if (isDropdownOpen) {
                newOpenDropdowns.delete(item.label)
              } else {
                newOpenDropdowns.add(item.label)
              }
              setOpenDropdowns(newOpenDropdowns)
            }}
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            {item.label}
            <motion.div 
              className="absolute bottom-0 left-0 h-0.5 bg-green-500 rounded-full"
              initial={active ? "visible" : "hidden"}
              animate={active ? "visible" : "hidden"}
              variants={underlineVariants}
            />
            <motion.div 
              className="absolute bottom-0 left-0 h-0.5 bg-green-500 rounded-full opacity-0 group-hover:opacity-100"
              initial="hidden"
              whileHover="visible"
              variants={underlineVariants}
            />
          </button>
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={dropdownVariants}
                className="absolute left-0 mt-3 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl py-2 z-50 overflow-hidden border border-white/20"
              >
                {item.children!.map((child, childIndex) => (
                  <Link 
                    key={`${child.label}-${childIndex}`}
                    href={child.href || '#'}
                    target={child.external ? '_blank' : undefined}
                    rel={child.external ? 'noopener noreferrer' : undefined}
                    className="block px-4 py-3 text-sm text-gray-800 hover:bg-green-50 hover:text-green-700 transition-all duration-200 relative group/item"
                    onClick={() => handleItemClick(child)}
                  >
                    {child.label}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 transform scale-y-0 group-hover/item:scale-y-100 transition-transform duration-200" />
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )
    }

    return (
      <Link 
        key={`${item.label}-${index}`}
        href={item.href || '#'}
        target={item.external ? '_blank' : undefined}
        rel={item.external ? 'noopener noreferrer' : undefined}
        className="relative font-medium text-white/90 hover:text-white transition-all duration-300 group py-2"
        onClick={() => handleItemClick(item)}
      >
        {item.label}
        <motion.div 
          className="absolute bottom-0 left-0 h-0.5 bg-green-500 rounded-full"
          initial={active ? "visible" : "hidden"}
          animate={active ? "visible" : "hidden"}
          variants={underlineVariants}
        />
        <motion.div 
          className="absolute bottom-0 left-0 h-0.5 bg-green-500 rounded-full opacity-0 group-hover:opacity-100"
          initial="hidden"
          whileHover="visible"
          variants={underlineVariants}
        />
      </Link>
    )
  }

  const renderMobileNavItem = (item: NavItem, index: number) => {
    const hasChildren = item.children && item.children.length > 0
    const isDropdownOpen = openDropdowns.has(item.label)
    const active = isActive(item.href)

    if (hasChildren) {
      return (
        <div key={`mobile-${item.label}-${index}`} className="py-3 border-b border-white/10">
          <button 
            onClick={() => {
              const newOpenDropdowns = new Set(openDropdowns)
              if (isDropdownOpen) {
                newOpenDropdowns.delete(item.label)
              } else {
                newOpenDropdowns.add(item.label)
              }
              setOpenDropdowns(newOpenDropdowns)
            }}
            className="flex items-center justify-between w-full font-medium text-white/90 hover:text-white transition-all duration-200 relative"
            aria-expanded={isDropdownOpen}
          >
            {item.label}
            {active && (
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-green-500 rounded-full" />
            )}
          </button>
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={mobileDropdownVariants}
                className="mt-2 pl-4 flex flex-col gap-2 overflow-hidden"
              >
                {item.children!.map((child, childIndex) => (
                  <Link 
                    key={`mobile-child-${child.label}-${childIndex}`}
                    href={child.href || '#'}
                    target={child.external ? '_blank' : undefined}
                    rel={child.external ? 'noopener noreferrer' : undefined}
                    className="text-sm text-white/70 hover:text-white py-2 transition-all duration-200 relative group"
                    onClick={() => handleItemClick(child)}
                  >
                    {child.label}
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-green-500 rounded-full group-hover:w-full transition-all duration-300" />
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )
    }

    return (
      <Link 
        key={`mobile-${item.label}-${index}`}
        href={item.href || '#'}
        target={item.external ? '_blank' : undefined}
        rel={item.external ? 'noopener noreferrer' : undefined}
        className="relative font-medium text-white/90 hover:text-white py-3 border-b border-white/10 transition-all duration-200" 
        onClick={() => handleItemClick(item)}
      >
        {item.label}
        {active && (
          <div className="absolute bottom-0 left-0 h-0.5 w-full bg-green-500 rounded-full" />
        )}
      </Link>
    )
  }

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 w-full", className)}>
      {/* Subtle overlay for better contrast */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] pointer-events-none" />
      
      <nav className={cn("relative", variantStyles[variant])}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            {logo && (
              <div className="flex items-center">
                <Link href="/" className="flex-shrink-0 group">
                  <div className="relative overflow-hidden rounded-sm transition-transform duration-300 group-hover:scale-105">
                    <Image 
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.width || 200}
                      height={logo.height || 100}
                      loading="lazy"
                      className="rounded-sm relative z-0"
                    />
                  </div>
                </Link>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                className="text-white p-2 rounded-md hover:bg-white/10 transition-colors duration-200"
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
            <div className="hidden lg:flex items-center space-x-8">
              {items.map((item, index) => renderNavItem(item, index))}
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={mobileMenuVariants}
                  className="fixed inset-0 bg-gradient-to-r from-red-900/98 to-red-950/98 backdrop-blur-md z-50 lg:hidden overflow-y-auto"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                      {logo && (
                        <Link href="/" className="flex-shrink-0 group" onClick={handleMenuClose}>
                          <div className="relative overflow-hidden rounded-sm transition-transform duration-300 group-hover:scale-105">
                            <Image 
                              src={logo.src}
                              alt={logo.alt}
                              width={logo.width || 200}
                              height={logo.height || 100}
                              loading="lazy"
                              className="rounded-sm relative z-0"
                            />
                          </div>
                        </Link>
                      )}
                      <button
                        type="button"
                        className="text-white p-2 rounded-md hover:bg-white/10 transition-colors duration-200"
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
                      {items.map((item, index) => renderMobileNavItem(item, index))}
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
