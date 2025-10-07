"use client"

import { Navbar, NavItem } from "@/components/ui/navbar"
import LanguageSwitcher from "@/components/LanguageSwitcher"
import { useTranslations, useLocale } from 'next-intl'

// Example navigation items for UAEMMAF
const createNavItems = (t: any, locale: string): NavItem[] => [
  {
    label: t('home'),
    href: locale === 'en' ? '/' : `/${locale}`
  },
  {
    label: t('about'),
    children: [
      {
        label: t('mission'),
        href: `/${locale}/mission`
      },
      {
        label: t('leadership'),
        href: `/${locale}/leadership`
      }
    ]
  },
  {
    label: t('news'),
    href: `/${locale}/news`
  },
  {
    label: t('events'),
    children: [
      {
        label: t('upcomingEvents'),
        href: "https://uaemmaf.smoothcomp.com/en/federation/187/events/upcoming",
        external: true
      },
      {
        label: t('pastEvents'),
        href: "https://uaemmaf.smoothcomp.com/en/federation/187/events/past",
        external: true
      }
    ]
  },
  {
    label: t('joinUs'),
    children: [
      {
        label: t('athletes'),
        href: "https://uaemmaf.smoothcomp.com/en/federation/187/membership",
        external: true
      },
      {
        label: t('clubs'),
        href: "https://uaemmaf.smoothcomp.com/en/federation/187/academies",
        external: true
      }
    ]
  },
  {
    label: t('contact'),
    href: `/${locale}/contact`
  }
]

export function NavbarExample() {
  const t = useTranslations('nav')
  const locale = useLocale()
  
  const navItems = createNavItems(t, locale)

  const handleItemClick = (item: NavItem) => {
    console.log('Navigation item clicked:', item.label)
    // Add any custom logic here (analytics, etc.)
  }

  return (
    <div className="space-y-8">
      {/* Default Navbar */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Default Navbar</h3>
        <Navbar
          logo={{
            src: "/mainlogo.svg",
            alt: "UAEMMAF Logo",
            width: 200,
            height: 100
          }}
          items={navItems}
          onItemClick={handleItemClick}
        />
      </div>

      {/* Transparent Navbar */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Transparent Navbar</h3>
        <Navbar
          logo={{
            src: "/mainlogo.svg",
            alt: "UAEMMAF Logo",
            width: 200,
            height: 100
          }}
          items={navItems}
          variant="transparent"
          onItemClick={handleItemClick}
        />
      </div>

      {/* Glass Navbar */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Glass Navbar</h3>
        <Navbar
          logo={{
            src: "/mainlogo.svg",
            alt: "UAEMMAF Logo",
            width: 200,
            height: 100
          }}
          items={navItems}
          variant="glass"
          onItemClick={handleItemClick}
        />
      </div>

      {/* Navbar without Logo */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Navbar without Logo</h3>
        <Navbar
          items={navItems}
          onItemClick={handleItemClick}
        />
      </div>

      {/* Custom Styled Navbar */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Custom Styled Navbar</h3>
        <Navbar
          logo={{
            src: "/mainlogo.svg",
            alt: "UAEMMAF Logo",
            width: 200,
            height: 100
          }}
          items={navItems}
          className="custom-navbar"
          onItemClick={handleItemClick}
        />
      </div>
    </div>
  )
}

// Example of how to extend the navbar with additional components
export function ExtendedNavbarExample() {
  const t = useTranslations('nav')
  const locale = useLocale()
  
  const navItems = createNavItems(t, locale)

  return (
    <div className="relative">
      {/* Main Navbar */}
      <Navbar
        logo={{
          src: "/mainlogo.svg",
          alt: "UAEMMAF Logo",
          width: 200,
          height: 100
        }}
        items={navItems}
      />
      
      {/* Additional components can be added here */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
    </div>
  )
}

// Example of a minimal navbar for specific pages
export function MinimalNavbarExample() {
  const minimalItems: NavItem[] = [
    {
      label: "Home",
      href: "/"
    },
    {
      label: "About",
      href: "/about"
    },
    {
      label: "Contact",
      href: "/contact"
    }
  ]

  return (
    <Navbar
      items={minimalItems}
      variant="glass"
      className="minimal-navbar"
    />
  )
}

// Example of how to create a navbar with custom navigation logic
export function CustomNavbarExample() {
  const t = useTranslations('nav')
  const locale = useLocale()
  
  const navItems = createNavItems(t, locale)

  const handleCustomItemClick = (item: NavItem) => {
    // Custom analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'navigation_click', {
        event_category: 'Navigation',
        event_label: item.label,
        value: 1
      })
    }
    
    // Custom navigation logic
    if (item.external) {
      // Handle external links differently
      console.log('Opening external link:', item.href)
    } else {
      // Handle internal navigation
      console.log('Navigating to:', item.href)
    }
  }

  return (
    <Navbar
      logo={{
        src: "/mainlogo.svg",
        alt: "UAEMMAF Logo",
        width: 200,
        height: 100
      }}
      items={navItems}
      onItemClick={handleCustomItemClick}
    />
  )
}
