'use client'
import { useTranslations } from 'next-intl'

export default function PrivacyPolicyPage() {
  const t = useTranslations('privacyPolicy')
  
  return (
    <main className='container mx-auto px-4 md:px-6 py-8 md:py-12'>
      <h1 className='text-2xl md:text-4xl font-bold mb-6 md:mb-8'>{t('title')}</h1>

      <div className='space-y-8 text-Text-Default-text-secondary'>
        <section>
          <p className='mb-4'>{t('intro')}</p>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-4'>{t('purpose')}</h2>
          <ul className='list-disc pl-6 space-y-2'>
            {t.raw('purposeDetails').map((detail: string, index: number) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-4'>{t('dataCollected')}</h2>
          <p className='mb-4'>{t('dataCollectedDetails')}</p>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-4'>{t('retentionPeriod')}</h2>
          <p className='mb-4'>{t('retentionPeriodDetails')}</p>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-4'>{t('usageScope')}</h2>
          <ul className='list-disc pl-6 space-y-2'>
            {t.raw('usageScopeDetails').map((detail: string, index: number) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-4'>{t('security')}</h2>
          <ul className='list-disc pl-6 space-y-2'>
            {t.raw('securityDetails').map((detail: string, index: number) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-4'>{t('contact')}</h2>
          <ul className='list-disc pl-6 space-y-2'>
            {t.raw('contactDetails').map((detail: string, index: number) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-4'>{t('complaint')}</h2>
          <ul className='list-disc pl-6 space-y-2'>
            {t.raw('complaintDetails').map((detail: string, index: number) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
