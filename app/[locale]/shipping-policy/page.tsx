'use client'
import { useTranslations } from 'next-intl'

export default function ShippingPolicyPage() {
  const t = useTranslations('shippingPolicy')

  return (
    <main className='container mx-auto px-4 md:px-6 py-8 md:py-12'>
      <h1 className='text-2xl md:text-4xl font-bold mb-6 md:mb-8'>{t('title')}</h1>

      <div className='space-y-8 text-Text-Default-text-secondary'>
        <section>
          <p className='mb-2'><span className='font-semibold'>{t('deliveryTitle')}</span> {t('deliveryContent')}</p>
          <p className='mb-4'><span className='font-semibold'>{t('feeTitle')}</span> {t('feeContent')}</p>
        </section>

        <section>
          <h2 className='text-xl md:text-2xl font-bold mb-4 text-Text-Default-text-primary'>{t('returnTitle')}</h2>
          
          <div className='mb-6'>
            <h3 className='font-semibold mb-2'>{t('eligibleTitle')}</h3>
            <ul className='list-disc pl-6 mb-4 space-y-2'>
              <li>{t('defectiveProduct')}</li>
              <li>{t('wrongItem')}</li>
            </ul>
          </div>
          
          <div className='mb-6'>
            <h3 className='font-semibold mb-2'>{t('conditionsTitle')}</h3>
            <ul className='list-disc pl-6 mb-4 space-y-2'>
              <li>{t('unusedProduct')}</li>
              <li>{t('unboxingVideo')}</li>
            </ul>
          </div>
          
          <div className='mb-6'>
            <h3 className='font-semibold mb-2'>{t('processTitle')}</h3>
            <ul className='list-disc pl-6 mb-4 space-y-2'>
              <li>{t('contactUs')}</li>
              <li>{t('returnItem')}</li>
              <li>{t('inspection')}</li>
            </ul>
          </div>
          
          <div className='mb-6'>
            <h3 className='font-semibold mb-2'>{t('refundTitle')}</h3>
            <ul className='list-disc pl-6 mb-4 space-y-2'>
              <li>{t('fullRefund')}</li>
              <li>{t('refundMethod')}</li>
              <li>{t('processingTime')}</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  )
}
