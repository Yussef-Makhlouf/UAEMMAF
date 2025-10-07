# Navbar Component

A modern, accessible, and customizable navbar component built with React, TypeScript, and Framer Motion.

## Features

- ✨ **Modern Design**: Clean, Apple-inspired design with glass morphism effects
- 🎯 **Accessible**: Full ARIA support, keyboard navigation, and screen reader compatibility
- 📱 **Responsive**: Mobile-first design with hamburger menu for smaller screens
- 🎨 **Customizable**: Multiple variants and easy styling customization
- ⚡ **Performance**: Optimized animations and efficient re-renders
- 🌍 **Internationalization**: Built-in support for multiple languages
- 🔗 **External Links**: Support for external links with proper security attributes

## Installation

The navbar component is part of the UAEMMAF design system and is located at `components/ui/navbar.tsx`.

## Basic Usage

```tsx
import { Navbar, NavItem } from "@/components/ui/navbar"

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "About",
    children: [
      {
        label: "Mission",
        href: "/mission"
      },
      {
        label: "Leadership",
        href: "/leadership"
      }
    ]
  },
  {
    label: "Contact",
    href: "/contact"
  }
]

function MyComponent() {
  return (
    <Navbar
      logo={{
        src: "/logo.svg",
        alt: "Company Logo",
        width: 200,
        height: 100
      }}
      items={navItems}
    />
  )
}
```

## Props

### NavbarProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | `LogoConfig \| undefined` | `undefined` | Logo configuration object |
| `items` | `NavItem[]` | `[]` | Array of navigation items |
| `className` | `string \| undefined` | `undefined` | Additional CSS classes |
| `variant` | `'default' \| 'transparent' \| 'glass'` | `'default'` | Visual variant of the navbar |
| `onItemClick` | `(item: NavItem) => void \| undefined` | `undefined` | Callback when navigation item is clicked |

### NavItem

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Display text for the navigation item |
| `href` | `string \| undefined` | URL for the navigation item |
| `children` | `NavItem[] \| undefined` | Sub-items for dropdown menus |
| `external` | `boolean \| undefined` | Whether the link opens in a new tab |

### LogoConfig

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Path to the logo image |
| `alt` | `string` | - | Alt text for the logo |
| `width` | `number \| undefined` | `200` | Width of the logo |
| `height` | `number \| undefined` | `100` | Height of the logo |

## Variants

### Default
The standard navbar with red gradient background and backdrop blur.

```tsx
<Navbar items={navItems} variant="default" />
```

### Transparent
A transparent navbar with no background.

```tsx
<Navbar items={navItems} variant="transparent" />
```

### Glass
A glass morphism effect with subtle transparency and blur.

```tsx
<Navbar items={navItems} variant="glass" />
```

## Examples

### Basic Navigation

```tsx
const basicItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
]

<Navbar items={basicItems} />
```

### Navigation with Dropdowns

```tsx
const itemsWithDropdowns: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    children: [
      { label: "Product A", href: "/products/a" },
      { label: "Product B", href: "/products/b" }
    ]
  },
  { label: "Contact", href: "/contact" }
]

<Navbar items={itemsWithDropdowns} />
```

### External Links

```tsx
const itemsWithExternalLinks: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Resources",
    children: [
      { label: "Documentation", href: "https://docs.example.com", external: true },
      { label: "Support", href: "https://support.example.com", external: true }
    ]
  }
]

<Navbar items={itemsWithExternalLinks} />
```

### Custom Click Handler

```tsx
const handleItemClick = (item: NavItem) => {
  // Analytics tracking
  analytics.track('navigation_click', { item: item.label })
  
  // Custom logic
  if (item.external) {
    console.log('Opening external link:', item.href)
  }
}

<Navbar items={navItems} onItemClick={handleItemClick} />
```

### Internationalization Support

```tsx
import { useTranslations, useLocale } from 'next-intl'

function InternationalizedNavbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  
  const navItems: NavItem[] = [
    {
      label: t('home'),
      href: locale === 'en' ? '/' : `/${locale}`
    },
    {
      label: t('about'),
      href: `/${locale}/about`
    }
  ]
  
  return <Navbar items={navItems} />
}
```

## Styling

### Custom CSS Classes

You can add custom CSS classes to override default styles:

```tsx
<Navbar 
  items={navItems} 
  className="custom-navbar"
/>
```

```css
.custom-navbar {
  /* Custom styles */
}

.custom-navbar nav {
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
}
```

### CSS Variables

The component uses CSS custom properties that can be overridden:

```css
:root {
  --navbar-height: 64px;
  --navbar-bg: linear-gradient(to right, #7f1d1d, #450a0a);
  --navbar-text: rgba(255, 255, 255, 0.9);
  --navbar-hover: #ffffff;
  --navbar-accent: #22c55e;
}
```

## Accessibility

The navbar component includes comprehensive accessibility features:

- **ARIA Attributes**: Proper `aria-expanded`, `aria-haspopup`, and `aria-label` attributes
- **Keyboard Navigation**: Full keyboard support with Tab, Enter, Space, and Escape keys
- **Focus Management**: Proper focus trapping and restoration
- **Screen Reader Support**: Semantic HTML and descriptive labels
- **Reduced Motion**: Respects user's motion preferences

## Performance

The component is optimized for performance:

- **Efficient Animations**: Uses CSS transforms and opacity for smooth animations
- **Event Cleanup**: Proper cleanup of event listeners and timeouts
- **Memoization**: Optimized re-renders with React best practices
- **Lazy Loading**: Images are loaded with proper loading attributes

## Browser Support

- **Modern Browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **IE11+**: Limited support (basic functionality without animations)
- **Mobile Browsers**: Full support with touch-optimized interactions

## Troubleshooting

### Common Issues

1. **Dropdowns not working**: Ensure the parent container has `position: relative`
2. **Mobile menu not showing**: Check z-index values and ensure no overlapping elements
3. **Animations not smooth**: Verify that the device supports CSS transforms

### Debug Mode

Enable debug mode by adding the `data-debug` attribute:

```tsx
<Navbar items={navItems} data-debug />
```

This will log navigation events and state changes to the console.

## Contributing

When contributing to the navbar component:

1. Follow the existing code style and patterns
2. Add proper TypeScript types for new features
3. Include accessibility considerations
4. Test on multiple devices and browsers
5. Update documentation for new features

## License

This component is part of the UAEMMAF design system and follows the project's licensing terms.
