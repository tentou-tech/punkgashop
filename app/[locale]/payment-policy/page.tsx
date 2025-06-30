'use client'
import { useTranslations } from 'next-intl'

export default function PaymentPolicyPage() {
  const t = useTranslations('paymentPolicy')

  return (
    <main className='container mx-auto px-4 md:px-6 py-8 md:py-12'>
      <h1 className='text-2xl md:text-4xl font-bold mb-6 md:mb-8'>{t('title')}</h1>

      <div className='space-y-8 text-Text-Default-text-secondary'>
        {/* Payment Options */}
        <section>
          <h2 className='text-xl font-semibold mb-4'>{t('availableOptions')}</h2>
          <ul className='list-disc pl-6 mb-4 space-y-4'>
            <li>{t('cashOnDelivery')}</li>
            <li>{t('eWallets')}</li>
          </ul>
        </section>

        {/* Conditions */}
        <section>
          <h2 className='text-xl font-semibold mb-4'>{t('conditionsTitle')}</h2>
          <ul className='list-disc pl-6 mb-4 space-y-4'>
            <li>{t('conditionsContent1')}</li>
            <li>{t('conditionsContent2')}</li>
          </ul>
        </section>

        {/* Order Process */}
        <section>
          <h2 className='text-xl font-semibold mb-4'>{t('processTitle')}</h2>
          <div className='space-y-6'>
            <div>
              <p className='font-medium'>{t('step1')}</p>
            </div>
            <div>
              <p className='font-medium'>{t('step2')}</p>
            </div>
            <div>
              <p className='font-medium'>{t('step3')}</p>
              <ul className='list-disc pl-6 mt-2 space-y-2'>
                <li>{t('step3Content1')}</li>
                <li>{t('step3Content2')}</li>
              </ul>
            </div>
            <div>
              <p className='font-medium'>{t('step4')}</p>
              <ul className='list-disc pl-6 mt-2 space-y-2'>
                <li>{t('step4Content1')}</li>
                <li>{t('step4Content2')}</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
