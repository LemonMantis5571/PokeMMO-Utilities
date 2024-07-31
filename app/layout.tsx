import Navbarmain from '@/components/Navbarmain'
import { Analytics } from '@vercel/analytics/react';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://poke-mmo-utilities.vercel.app'),
  title: 'PokeMMO Utilities',
  description: 'Utilities for PokeMMO',
  icons: {
    icon: '/favicon.ico'
  },
  verification: {
    google: 'Ppil16eQLID5WGM_z4roBczMWM6I5Od2CFwYz7hnvK0'
  },
  alternates: {
    canonical: './'
  }

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="Ppil16eQLID5WGM_z4roBczMWM6I5Od2CFwYz7hnvK0" />
      </head>
      <body className={inter.className}>
        <Navbarmain />
        <main>
          {children}
        </main>
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
