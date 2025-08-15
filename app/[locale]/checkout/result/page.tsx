'use client'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

export default function CheckoutResult() {
  const t = useTranslations('checkout')
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'success' | 'failure' | 'pending'>('pending')

  useEffect(() => {
    const resultCode = searchParams.get('resultCode')
    if (resultCode === '0') {
      setStatus('success')
    } else {
      setStatus('failure')
    }
  }, [searchParams])

  return (
    <div className='py-8 px-4 md:px-6 space-y-6 max-w-[1400px] mx-auto'>
      {status === 'pending' && <div>{t('verifyingPayment')}</div>}
      {status === 'success' && (
        <div className='text-center space-y-4'>
          <h1 className='text-2xl font-bold text-green-500'>{t('paymentSuccessful')}</h1>
          <p>{t('thankYouForYourPurchase')}</p>
        </div>
      )}
      {status === 'failure' && (
        <div className='text-center space-y-4'>
          <h1 className='text-2xl font-bold text-red-500'>{t('paymentFailed')}</h1>
          <p>{t('pleaseTryAgain')}</p>
        </div>
      )}
    </div>
  )
}
