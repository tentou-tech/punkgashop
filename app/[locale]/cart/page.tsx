'use client'
import { Button } from '@/components/ui/button'
import { CartItem } from '@/models/shop'
import { useCart } from '@/provider/cart'
import { formatCurrency } from '@/utils/number'
import { ChevronLeft, Minus, Plus, Trash } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { getSrcImage } from '@/utils/image'
export default function Checkout() {
  const t = useTranslations('cart')
  const commonT = useTranslations('common')
  const router = useRouter()
  const { items, setCheckoutItems } = useCart()
  const { back } = useRouter()
  return (
    <div className='py-8 px-4 md:px-6 space-y-6 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_325px] gap-8'>
      <div className='space-y-8'>
        <button onClick={back} className='text-xl cursor-pointer flex items-center gap-2 font-bold'>
          <ChevronLeft className='w-5 h-5' />
          {t('cart')} ({items.length})
        </button>
        <>
          {items.map((item) => (
            <CheckoutItem key={item.internalId} item={item} />
          ))}
        </>
      </div>
      <div className='p-6 bg-[#121212] h-fit space-y-3 text-[#9091A0] border text-sm'>
        <div className='flex items-center justify-between text-xs md:text-sm'>
          <span>{t('subtotal')}</span>
          <span>
            {formatCurrency(
              items.reduce((total, item) => total + item.option.price * item.quantity, 0),
              commonT('currency')
            )}
          </span>
        </div>
        <div className='flex items-center justify-between text-xs md:text-sm'>
          <span>{t('shippingFee')}</span>
          <span>{t('free')}</span>
        </div>
        <div className='flex items-center justify-between text-xs md:text-sm'>
          <span>{t('discount')}</span>
          <span>-0 {commonT('currency')}</span>
        </div>
        <div className='h-px w-full bg-Border-border-primary'></div>
        <div className='flex items-center justify-between text-white text-base ms:text-lg font-bold '>
          <span>{t('total')}</span>
          <span>
            {formatCurrency(
              items.reduce((total, item) => total + item.option.price * item.quantity, 0),
              commonT('currency')
            )}
          </span>
        </div>
        <Button
          className='w-full justify-center'
          onClick={() => {
            router.push('/checkout')
            setCheckoutItems(items)
          }}>
          {t('checkout')}
        </Button>
      </div>
    </div>
  )
}
const CheckoutItem = ({ item }: { item: CartItem }) => {
  const t = useTranslations('cart')
  const commonT = useTranslations('common')
  const { removeItem, updateQuantity } = useCart()

  return (
    <div className='grid grid-cols-[5fr_1fr] md:grid-cols-[5fr_1fr_1fr] items-center md:gap-6'>
      <div className='flex items-center gap-6'>
        <Image
          src={getSrcImage(item.product.thumbnail)}
          alt={item.product.name}
          width={100}
          height={100}
          className='w-20 h-20 md:w-32 md:h-32 object-cover'
        />
        <div className='space-y-2'>
          <div className='font-medium text-sm md:text-lg'>{item.product.name}</div>
          <div className='flex items-center gap-2 text-xs md:text-sm'>
            <span>{formatCurrency(item.option.price, commonT('currency'))}</span>
          </div>
          <div className='capitalize text-sm h-[22px] inline-flex justify-start items-center gap-1.5'>
            {Object.keys(item.option.option)
              .filter((key) => typeof item.option.option[key as keyof typeof item.option.option] === 'string')
              .map((key) => `${key}: ${item.option.option[key as keyof typeof item.option.option]}`)
              .concat(item.option.subOptions?.map((subOption) => `${subOption.key}: ${subOption.value}`))
              .join(' | ')}
          </div>
          <div
            onClick={() => removeItem(item.internalId!)}
            className='flex items-center gap-1 text-[#9091A0] hover:text-red-500 cursor-pointer text-xs md:text-sm'>
            <Trash className='w-5 h-5' />
            {t('remove')}
          </div>
        </div>
      </div>
      <div className='border px-2 py-3 text-xs md:text-sm w-fit min-w-20 text-center'>
        <div className='flex items-center gap-2'>
          <button
            onClick={() => updateQuantity(item.internalId!, item.quantity - 1)}
            className='w-5 h-5 md:w-6 md:h-6 flex items-center justify-center cursor-pointer'>
            <Minus className='w-4 h-4' />
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.internalId!, item.quantity + 1)}
            className='w-5 h-5 md:w-6 md:h-6 flex items-center justify-center cursor-pointer'>
            <Plus className='w-4 h-4' />
          </button>
        </div>
      </div>
      <div className='md:hidden'></div>
      <div className='flex items-center gap-2 justify-end whitespace-nowrap'>
        <span>{formatCurrency(item.option.price * item.quantity, commonT('currency'))}</span>
      </div>
    </div>
  )
}
