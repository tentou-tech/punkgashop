'use client'
import { useTranslations } from 'next-intl'

export default function PaymentPolicyPage() {
  const t = useTranslations('paymentPolicy')

  return (
    <main className='container mx-auto px-4 md:px-6 py-8 md:py-12'>
      <h1 className='text-2xl md:text-4xl font-bold mb-6 md:mb-8'>{t('title')}</h1>

      <div className='space-y-8 text-Text-Default-text-secondary'>
        <section>
          <p className='mb-4 font-semibold'>{t('supportedMethods')}</p>
          <ul className='list-disc pl-6 mb-4 space-y-2'>
            <li>{t('bankTransfer')}</li>
            <li>{t('eWallets')}</li>
          </ul>
        </section>

        <section>
          <p className='mb-4'>{t('displayInfo')}</p>
        </section>
      </div>
    </main>
  )
}
