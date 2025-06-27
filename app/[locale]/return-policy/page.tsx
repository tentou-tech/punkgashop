'use client'
import { useTranslations } from 'next-intl'

export default function ReturnPolicyPage() {
  const t = useTranslations('returnPolicy')

  return (
    <main className='container mx-auto px-4 md:px-6 py-8 md:py-12'>
      <h1 className='text-2xl md:text-4xl font-bold mb-6 md:mb-8'>{t('title')}</h1>

      <div className='space-y-8 text-Text-Default-text-secondary'>
        <section>
          <h2 className='text-xl font-semibold mb-4'>{t('scopeTitle')}</h2>
          <p className='mb-4'>{t('scopeContent')}</p>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-4'>{t('conditionsTitle')}</h2>
          <ul className='list-disc pl-6 space-y-2'>
            {t.raw('conditionsDetails').map((detail: string, index: number) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-4'>{t('beforeDeliveryTitle')}</h2>
          <p className='mb-4'>{t('beforeDeliveryContent')}</p>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-4'>{t('afterDeliveryTitle')}</h2>
          
          <div className='mb-6 pl-4'>
            <h3 className='font-semibold mb-2'>{t('defectiveTitle')}</h3>
            <ul className='list-disc pl-6 space-y-2'>
              {t.raw('defectiveDetails').map((detail: string, index: number) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
          
          <div className='mb-6 pl-4'>
            <h3 className='font-semibold mb-2'>{t('nonDefectiveTitle')}</h3>
            <p className='mb-2'>{t('nonDefectiveContent')}</p>
            <ul className='list-disc pl-6 space-y-2'>
              {t.raw('nonDefectiveDetails').map((detail: string, index: number) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-4'>{t('contactTitle')}</h2>
          <p className='mb-2'>{t('hotline')}</p>
          <p>{t('feedback')}</p>
        </section>
      </div>
    </main>
  )
}
