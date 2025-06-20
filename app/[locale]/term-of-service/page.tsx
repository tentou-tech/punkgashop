'use client'
import { useTranslations } from 'next-intl'

export default function TermsOfServicePage() {
  const t = useTranslations('termOfService')

  return (
    <main className='container mx-auto px-4 md:px-6 py-8 md:py-12'>
      <h1 className='text-2xl md:text-4xl font-bold mb-6 md:mb-8'>{t('title')}</h1>

      <div className='space-y-8 text-Text-Default-text-secondary'>
        <section>
          <p className='mb-4'>{t('intro')}</p>
        </section>

        <section>
          <p className='mb-4'>{t('noIllegalUse')}</p>
        </section>

        <section>
          <p className='mb-4'>{t('noInterference')}</p>
        </section>

        <section>
          <p className='mb-4'>{t('ownership')}</p>
        </section>

        <section>
          <p className='mb-4'>{t('disputes')}</p>
        </section>
      </div>
    </main>
  )
}
