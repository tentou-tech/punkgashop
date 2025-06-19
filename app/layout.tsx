import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ContextProvider from '@/provider'
import { Toaster } from 'sonner'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Punkga Shop',
  description: 'Punkga Shop',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} antialiased`}>
        <ContextProvider>
          <Header />
          {children}
          <Footer />
          <Toaster expand />
        </ContextProvider>
      </body>
    </html>
  )
}
