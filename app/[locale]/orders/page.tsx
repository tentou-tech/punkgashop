'use client'
import { CartItem } from '@/models/shop'
import { useCart } from '@/provider/cart'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

export default function OrderResult() {
  const t = useTranslations('checkout')
  const searchParams = useSearchParams()
  const { removeItem } = useCart()

  const status = searchParams.get('resultCode') === '9000' ? 'success' : 'failure'
  const orderId = searchParams.get('orderId')
  const amount = searchParams.get('amount')
  const message = decodeURIComponent(searchParams.get('message') || '')

  useEffect(() => {
    if (status === 'success') {
      const checkoutItems = JSON.parse(localStorage.getItem('checkoutItems') || '[]') as CartItem[]
      checkoutItems.forEach((item) => {
        removeItem(item.internalId || '')
      })
      localStorage.removeItem('checkoutItems')
    }
  }, [status, removeItem])

  return (
    <div className='py-8 px-4 md:px-6 space-y-6 max-w-[1400px] mx-auto'>
      {status === 'success' && (
        <div className='text-center space-y-4'>
          <h1 className='text-2xl font-bold text-green-500'>{t('paymentSuccessful')}</h1>
          <p>{t('thankYouForYourPurchase')}</p>
          <div className='text-left'>
            <p>
              <strong>{t('orderId')}:</strong> {orderId}
            </p>
            <p>
              <strong>{t('amount')}:</strong> {amount}
            </p>
            <p>
              <strong>{t('message')}:</strong> {message}
            </p>
          </div>
        </div>
      )}
      {status === 'failure' && (
        <div className='text-center space-y-4'>
          <h1 className='text-2xl font-bold text-red-500'>{t('paymentFailed')}</h1>
          <p>{t('pleaseTryAgain')}</p>
          <div className='text-left'>
            <p>
              <strong>{t('orderId')}:</strong> {orderId}
            </p>
            <p>
              <strong>{t('message')}:</strong> {message}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
