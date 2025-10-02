import Footer from '@/components/footer'
import Header from '@/components/header'
import { routing } from '@/i18n/routing'
import ContextProvider from '@/provider'
import type { Metadata } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { Toaster } from 'sonner'
import '../globals.css'
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  // Get the locale from params
  const { locale } = await params

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
        images: ['https://punkgashop.vn/thumb/en.png'],
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
        images: ['https://punkgashop.vn/thumb/vi.png'],
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
      <Script id='gtm-script' strategy='afterInteractive'>
        {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N5SFHS62');
          `}
      </Script>
      <body className={`${inter.variable} antialiased`}>
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
