'use client'
import { useTranslations } from 'next-intl'

export default function ShippingPolicyPage() {
  const t = useTranslations('shippingPolicy')

  return (
    <main className='container mx-auto px-4 md:px-6 py-8 md:py-12'>
      <h1 className='text-2xl md:text-4xl font-bold mb-6 md:mb-8'>{t('title')}</h1>

      <div className='space-y-8 text-Text-Default-text-secondary'>
        <section>
          <h2 className='text-xl font-semibold mb-4'>{t('scopeTitle')}</h2>
          <p className='mb-4'>{t('scopeContent')}</p>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-4'>{t('deliveryTimeTitle')}</h2>
          <ul className='list-disc pl-6 space-y-2'>
            {t.raw('deliveryTimeDetails').map((detail: string, index: number) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-4'>{t('deliveryMethodTitle')}</h2>
          <ul className='list-disc pl-6 space-y-2'>
            {t.raw('deliveryMethodDetails').map((detail: string, index: number) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-4'>{t('logisticsTitle')}</h2>
          <ul className='list-disc pl-6 space-y-2'>
            {t.raw('logisticsDetails').map((detail: string, index: number) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-4'>{t('inspectionTitle')}</h2>
          <ul className='list-disc pl-6 space-y-2'>
            {t.raw('inspectionDetails').map((detail: string, index: number) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
