'use client'
import OrderFailImage from '@/assets/order-fail-image.png'
import OrderSuccessImage from '@/assets/order-success-image.png'
import { Button } from '@/components/ui/button'
import { useRouter } from '@/i18n/navigation'
import { CreateOrderResponse } from '@/models/shop'
import { useCart } from '@/provider/cart'
import { getOrderById } from '@/services/shop'
import { formatCurrency } from '@/utils/number'
import moment from 'moment'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import useSWR from 'swr'
export default function CheckoutResult() {
  const t = useTranslations('checkout')
  const searchParams = useSearchParams()
  const { removeItem } = useCart()
  const { push } = useRouter()
  const orderId = searchParams.get('orderId')

  // Fetch order data using orderId
  const { data: orderData, isLoading } = useSWR(orderId ? { key: 'getOrderById', id: orderId } : null, ({ id }) =>
    getOrderById(id)
  )
  console.log(orderData)
  const status = orderData?.order?.status
  useEffect(() => {
    if (status === 'success') {
      const checkoutItems = JSON.parse(localStorage.getItem('checkoutItems') || '[]')
      checkoutItems.forEach((item: any) => {
        removeItem(item.internalId || '')
      })
      localStorage.removeItem('checkoutItems')
    }
  }, [status, removeItem])

  if (isLoading) return null

  if (orderData?.order.status && orderData?.order.status !== 'paid') {
    return (
      <div className='py-8 px-4 md:px-6 space-y-4 max-w-[1400px] mx-auto'>
        <div className='text-center space-y-4'>
          <div className='text-center mb-4'>
            <div className='relative w-64 h-64 mx-auto mb-4'>
              <Image src={OrderFailImage} alt='Order Failed' fill className='object-contain' />
            </div>
            <h1 className='text-2xl font-bold text-orange-400 mb-2'>{t('somethingWentWrong')}</h1>
          </div>
          <p className='text-sm text-Text-Default-text-tertiary'>{t('orderProcessingError')}</p>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button onClick={() => push('/')} className='min-w-40' data-gtm-click='back_to_home'>
            {t('backToHome')}
          </Button>
        </div>
      </div>
    )
  }

  if (status === 'paid' && orderData) {
    return <OrderSuccessPage orderData={orderData} />
  }

  return (
    <div className='py-8 px-4 md:px-6 space-y-6 max-w-[1400px] mx-auto'>
      <div className='text-center'>
        <p>{t('loadingOrderDetails')}</p>
      </div>
    </div>
  )
}

function OrderSuccessPage({ orderData }: { orderData: CreateOrderResponse }) {
  const t = useTranslations('checkout')
  const commonT = useTranslations('common')
  const { push } = useRouter()
  const order = orderData.order

  // const handleSaveInvoice = () => {
  //   // Implement save invoice functionality
  //   window.print()
  // }

  const handleBackToHome = () => {
    push('/')
  }

  return (
    <div className=''>
      <div className='max-w-4xl mx-auto px-4 py-8'>
        {/* Success Image and Title */}
        <div className='text-center mb-8'>
          <div className='relative w-64 h-64 mx-auto mb-6'>
            <Image src={OrderSuccessImage} alt='Order Success' fill className='object-contain' />
          </div>
          <h1 className='text-2xl font-bold text-green-400 mb-2'>{t('thankYouForYourPurchase')}</h1>
        </div>

        {/* Order Details */}
        <div className='text-sm mb-6 grid grid-cols-2 space-y-3.5'>
          <div className='font-semibold'>{t('orderCode')}</div>
          <div className='justify-self-end text-Text-Brand-text-brand-primary'>{order.code}</div>
          <div className='font-semibold'>{t('date')}</div>
          <div className='justify-self-end '>{moment(order.created_at).format('DD/MM/YYYY')}</div>
          <div className='font-semibold'>{t('payment')}</div>
          <div className='justify-self-end'>MoMo</div>
          <div className='font-semibold'>{t('total')}</div>
          <div className='justify-self-end text-Text-Brand-text-brand-primary'>
            {formatCurrency(order.total_price, commonT('currency'))}
          </div>
          <div className='font-semibold'>{t('address')}</div>
          <div className='justify-self-end'>{order.contacts.address}</div>
        </div>

        {/* Products Table */}
        <div className='border border-secondary rounded-lg overflow-hidden mb-6'>
          <table className='w-full'>
            <thead>
              <tr className=''>
                <th className='text-left p-4 text-gray-400 font-medium'>{t('product')}</th>
                <th className='text-center p-4 text-gray-400 font-medium'>{t('size')}</th>
                <th className='text-center p-4 text-gray-400 font-medium'>{t('amount')}</th>
                <th className='text-right p-4 text-gray-400 font-medium'>{t('price')}</th>
              </tr>
            </thead>
            <tbody>
              {order.order_products.map((product, index) => (
                <tr key={index} className='border-t border-secondary'>
                  <td className='p-4 text-white'>{product.product.name}</td>
                  <td className='p-4 text-center text-white'>{product.size || 'S'}</td>
                  <td className='p-4 text-center text-white'>{product.quantity}</td>
                  <td className='p-4 text-right text-white'>{formatCurrency(product.price, commonT('currency'))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Email Confirmation */}
        <div className='text-center mb-8 text-gray-400 text-sm'>
          {t('emailConfirmation')} <span className='text-white'>{order.contacts.email}</span>.
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          {/* <Button
            variant='secondary'
            onClick={handleSaveInvoice}
            className='min-w-40'
            data-gtm-click='save_invoice'
            data-gtm-order-id={order.id}
            data-gtm-order-code={order.code}>
            {t('saveInvoice')}
          </Button> */}
          <Button
            onClick={handleBackToHome}
            className='min-w-40'
            data-gtm-click='back_to_home'
            data-gtm-order-id={order.id}
            data-gtm-order-code={order.code}>
            {t('backToHome')}
          </Button>
        </div>
      </div>
    </div>
  )
}
