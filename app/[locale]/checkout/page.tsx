'use client'
import Momo from '@/assets/payment-method/momo.svg'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { Link } from '@/i18n/navigation'
import { CartItem } from '@/models/shop'
import { useCart } from '@/provider/cart'
import { formatCurrency } from '@/utils/number'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { getSrcImage } from '@/utils/image'
interface Inputs {
  email: string
  name: string
  phone: string
  address: string
  note?: string
}
export default function Checkout() {
  const t = useTranslations('checkout')
  const cartT = useTranslations('cart')
  const commonT = useTranslations('common')
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'cashOnDelivery'>('momo')
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<Inputs>({
    mode: 'onSubmit',
  })

  const onSubmit = (data: Inputs) => {
    console.log(data)
    toast.success(t('checkoutSuccessfully'))
  }

  const onError = (errors: unknown) => {
    console.error(errors)
  }
  const { checkoutItems } = useCart()

  return (
    <div className='py-8 px-4 md:px-6 space-y-6 max-w-[1400px] overflow-hidden mx-auto grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8'>
      <form onSubmit={handleSubmit(onSubmit, onError)} className='space-y-8 order-2 md:order-1'>
        <div className='space-y-4'>
          <div className='text-xl font-bold'>{t('contact')}</div>
          <div className='grid w-full items-center gap-2'>
            <Label htmlFor='email'>
              {t('email')} <span className='text-red-500'>*</span>
            </Label>
            <Input
              type='email'
              id='email'
              placeholder={t('emailPlaceholder')}
              required
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            <span className='text-xs text-[#9091A0]'>{t('emailTrackingInfo')}</span>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='text-xl font-bold'>{t('delivery')}</div>

          <div className='grid w-full items-center gap-2'>
            <Label htmlFor='name'>
              {t('name')} <span className='text-red-500'>*</span>
            </Label>
            <Input
              type='text'
              id='name'
              placeholder={t('namePlaceholder')}
              required
              {...register('name', { required: 'Name is required' })}
            />
          </div>
          <div className='grid w-full items-center gap-2'>
            <Label htmlFor='phone'>
              {t('phone')} <span className='text-red-500'>*</span>
            </Label>
            <Input
              type='text'
              id='phone'
              placeholder={t('phonePlaceholder')}
              required
              {...register('phone', { required: 'Phone number is required' })}
            />
          </div>
          <div className='grid w-full items-center gap-2'>
            <Label htmlFor='address'>
              {t('address')} <span className='text-red-500'>*</span>
            </Label>
            <Input
              type='text'
              id='address'
              placeholder={t('addressPlaceholder')}
              required
              {...register('address', { required: 'Address is required' })}
            />
          </div>
          <div className='grid w-full items-center gap-2'>
            <Label htmlFor='note'>{t('note')}</Label>
            <Textarea id='note' placeholder={t('notePlaceholder')} {...register('note')} />
          </div>
        </div>
        <div className='space-y-4'>
          <div className='text-xl font-bold'>{t('paymentMethod')}</div>
          <RadioGroup
            value={paymentMethod}
            onValueChange={(value) => setPaymentMethod(value as 'momo' | 'cashOnDelivery')}>
            <label
              htmlFor='momo'
              className={cn(
                'flex items-center gap-3 border rounded p-3',
                paymentMethod === 'momo' && 'border-Border-border-brand-solid'
              )}>
              <RadioGroupItem value='momo' id='momo' />
              <div className='flex items-center gap-2'>
                <Image src={Momo} alt='Momo' />
                <Label>Momo</Label>
              </div>
            </label>
            <label
              htmlFor='cashOnDelivery'
              className={cn(
                'flex items-center gap-3 border rounded p-3',
                paymentMethod === 'cashOnDelivery' && 'border-Border-border-brand-solid'
              )}>
              <RadioGroupItem value='cashOnDelivery' id='cashOnDelivery' />
              <div className='flex items-center gap-2'>
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M2.87868 4.87868C3.44129 4.31607 4.20435 4 5 4H15C15.7956 4 16.5587 4.31607 17.1213 4.87868C17.6839 5.44129 18 6.20435 18 7V8H19C20.6569 8 22 9.34315 22 11V17C22 18.6569 20.6569 20 19 20H9C7.34315 20 6 18.6569 6 17V16H5C4.20435 16 3.44129 15.6839 2.87868 15.1213C2.31607 14.5587 2 13.7956 2 13V7C2 6.20435 2.31607 5.44129 2.87868 4.87868ZM8 17C8 17.5523 8.44772 18 9 18H19C19.5523 18 20 17.5523 20 17V11C20 10.4477 19.5523 10 19 10H9C8.44772 10 8 10.4477 8 11V17ZM6 14H5C4.73478 14 4.48043 13.8946 4.29289 13.7071C4.10536 13.5196 4 13.2652 4 13V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H15C15.2652 6 15.5196 6.10536 15.7071 6.29289C15.8946 6.48043 16 6.73478 16 7V8H9C7.34315 8 6 9.34315 6 11V14ZM14 13C13.4477 13 13 13.4477 13 14C13 14.5523 13.4477 15 14 15C14.5523 15 15 14.5523 15 14C15 13.4477 14.5523 13 14 13ZM11 14C11 12.3431 12.3431 11 14 11C15.6569 11 17 12.3431 17 14C17 15.6569 15.6569 17 14 17C12.3431 17 11 15.6569 11 14Z'
                    fill='#737584'
                  />
                </svg>
                <Label>Cash On Delivery</Label>
              </div>
            </label>
          </RadioGroup>
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox checked id='agree-tos' />
          <Label htmlFor='agree-tos'>{t('agreeToTerms')}</Label>
        </div>
        <div className='space-y-3'>
          <Button className='w-full justify-center' type='submit'>
            {t('payNow')}
          </Button>
          <div className='text-center w-full text-xs text-Text-Default-text-tertiary'>{t('or')}</div>
          <Link
            href='/'
            className='mx-auto block text-sm text-center text-Text-Brand-text-brand-primary hover:text-Text-Brand-text-brand-primary/80'>
            {t('continueShopping')}
          </Link>
        </div>
      </form>
      <div className='space-y-4 overflow-hidden order-1 md:order-2'>
        <div className='max-h-[calc(100vh-24rem)] space-y-4 overflow-y-scroll hidden-scrollbar'>
          {checkoutItems.map((item) => (
            <CheckoutItem key={item.internalId || item.product.id} item={item} />
          ))}
        </div>
        <div className='space-y-3 text-sm text-Text-Default-text-tertiary'>
          <div className='flex items-center justify-between'>
            <span>{cartT('subtotal')}</span>
            <span>
              {formatCurrency(
                checkoutItems.reduce((total, item) => total + item.option.price * item.quantity, 0),
                commonT('currency')
              )}
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <span>{cartT('shippingFee')}</span>
            <span>{cartT('free')}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span>{cartT('discount')}</span>
            <span>-0 {commonT('currency')}</span>
          </div>
          <div className='h-px w-full bg-Border-border-primary'></div>
          <div className='flex items-center justify-between text-white text-lg font-bold'>
            <span>{cartT('total')}</span>
            <span className='inline-flex items-center gap-2'>
              {formatCurrency(
                checkoutItems.reduce((total, item) => total + item.option.price * item.quantity, 0),
                commonT('currency')
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
const CheckoutItem = ({ item }: { item: CartItem }) => {
  const commonT = useTranslations('common')
  return (
    <div className='flex gap-4 items-center overflow-hidden'>
      <Image
        src={getSrcImage(item.product.thumbnail)}
        alt='Product'
        width={100}
        height={100}
        className='w-14 h-14 object-cover shrink-0'
      />
      <div className='space-y-0.5 flex-1 overflow-hidden'>
        <div className='text-sm font-medium flex overflow-hidden items-center'>
          <span className='whitespace-nowrap overflow-hidden truncate'>{item.product.name}</span>
          <span className='ml-1 text-xs text-Text-Default-text-tertiary'>x{item.quantity}</span>
        </div>
        <div className='text-xs capitalize text-Text-Default-text-tertiary'>
          {Object.keys(item.option.option)
            .filter((key) => typeof item.option.option[key as keyof typeof item.option.option] === 'string')
            .map((key) => item.option.option[key as keyof typeof item.option.option])
            .concat(item.option.subOptions.map((subOption) => subOption.value))
            .join(', ')}
        </div>
      </div>
      <div className='shrink-0 text-sm'>{formatCurrency(item.option.price * item.quantity, commonT('currency'))}</div>
    </div>
  )
}
