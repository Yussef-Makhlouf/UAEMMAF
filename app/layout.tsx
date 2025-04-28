import type { Metadata, Viewport } from 'next';
import './globals.css';
import './fonts/fonts.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'UAEMMAF - UAE Mixed Martial Arts Federation | Official Website',
  description: 'The official website of the UAE Mixed Martial Arts Federation (UAEMMAF), the governing body for MMA in the United Arab Emirates. Promoting excellence in martial arts since 2021.',
  keywords: [
    'UAE MMA',
    'Mixed Martial Arts',
    'UAE Fighting',
    'Martial Arts UAE',
    'UAEMMAF',
    'UAE MMA Federation',
    'MMA Abu Dhabi',
    'MMA Dubai',
    'MMA Training UAE',
    'MMA Events UAE',
    'MMA Competition UAE',
    'IMMAF UAE',
    'Martial Arts Competition',
    'MMA Athletes UAE',
    'Join MMA UAE'
  ],
  authors: [{ name: 'UAE Mixed Martial Arts Federation' }],
  creator: 'UAE Mixed Martial Arts Federation',
  publisher: 'UAE Mixed Martial Arts Federation',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Sports Federation',
  openGraph: {
    title: 'UAEMMAF - UAE Mixed Martial Arts Federation | Official Website',
    description: 'The official website of the UAE Mixed Martial Arts Federation (UAEMMAF), the governing body for MMA in the United Arab Emirates. Promoting excellence in martial arts since 2021.',
    url: 'https://www.uaemmaf.ae/',
    siteName: 'UAE Mixed Martial Arts Federation',
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UAEMMAF - UAE Mixed Martial Arts Federation',
    description: 'The official governing body for MMA in the UAE',
    creator: '@uaemmaf',
    site: '@uaemmaf',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="canonical" href="https://www.uaemmaf.ae/" />
      </head>
      <body>{children}</body>
    </html>
  );
}

