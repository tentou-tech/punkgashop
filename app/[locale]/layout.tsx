import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ContextProvider from '@/provider'
import { Toaster } from 'sonner'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { GoogleTagManager } from '@next/third-parties/google'
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Punkga Shop',
  description: 'Punkga Shop',
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  return (
    <html lang={locale}>
      <body className={`${inter.variable} antialiased`}>
        <GoogleTagManager gtmId='GTM-N5SFHS62' />
        <NextIntlClientProvider>
          <ContextProvider>
            <Header />
            {children}
            <Footer />
            <Toaster expand />
          </ContextProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
