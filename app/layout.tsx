import Navbarmain from '@/components/Navbarmain'
import { Analytics } from '@vercel/analytics/react';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://poke-mmo-utilities.vercel.app'),
  title: 'PokeMMO Utilities',
  description: 'Utilities for PokeMMO',
  icons: {
    icon: '/favicon.ico'
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
      <Head>
        <meta name="google-site-verification" content="Ppil16eQLID5WGM_z4roBczMWM6I5Od2CFwYz7hnvK0" />
      </Head>
      <body className={inter.className}>
        <Navbarmain />
        <main className="flex flex-col items-center">
          {children}
        </main>
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
