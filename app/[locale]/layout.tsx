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

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  // Get the locale from params
  const locale = params.locale

  // Define the type for our metadata structure
  type LocaleMetadata = {
    title: string
    description: string
    keywords: string
    openGraph: {
      locale: string
      title: string
      images: string[]
      description: string
    }
  }

  // Set locale-specific metadata with proper typing
  const localeMap: Record<string, LocaleMetadata> = {
    en: {
      title: 'Punkga Shop | Original Outfits by Vietnamese Artists',
      description:
        'Explore one-of-a-kind outfits by Vietnamese artists at Punkga Shop. Great quality, unique style, shipped anywhere in Vietnam.',
      keywords: 'Punkga Shop, artist clothing, Vietnamese designers, apparel, fashion, artist collaboration',
      openGraph: {
        locale: 'en_US',
        title: 'Punkga Shop | Original Outfits by Vietnamese Artists',
        images: ['/thumb/en.png'],
        description:
          'Explore one-of-a-kind outfits by Vietnamese artists at Punkga Shop. Great quality, unique style, shipped anywhere in Vietnam.',
      },
    },
    vi: {
      title: 'Punkga Shop | Outfit nghệ sĩ Việt, phong cách độc đáo',
      description:
        'Khám phá outfit độc lạ từ nghệ sĩ Việt tại Punkga Shop. Chất lượng cao, phong cách riêng, giao hàng toàn quốc.',
      keywords: 'Punkga Shop, thời trang nghệ sĩ, nhà thiết kế Việt Nam, quần áo, thời trang, hợp tác nghệ sĩ',
      openGraph: {
        locale: 'vi_VN',
        title: 'Punkga Shop | Outfit nghệ sĩ Việt, phong cách độc đáo',
        images: ['/thumb/vi.png'],
        description:
          'Khám phá outfit độc lạ từ nghệ sĩ Việt tại Punkga Shop. Chất lượng cao, phong cách riêng, giao hàng toàn quốc.',
      },
    },
  }

  // Default to Vietnamese if locale is not supported
  const metadataForLocale = localeMap[locale] || localeMap['vi']

  return {
    ...metadataForLocale,
    authors: [{ name: 'Punkga Shop' }],
    openGraph: {
      ...metadataForLocale.openGraph,
      url: 'https://punkgashop.vn',
      siteName: 'Punkga Shop',
      type: 'website',
    },
  }
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
