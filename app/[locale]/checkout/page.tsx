'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CartItem } from '@/models/shop'
import { useCart } from '@/provider/cart'
import { formatCurrency } from '@/utils/number'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Momo from '@/assets/payment-method/momo.svg'
import { Checkbox } from '@/components/ui/checkbox'
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
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<Inputs>({
    mode: 'onSubmit',
  })

  const onSubmit = (data: Inputs) => {
    console.log(data)
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
          <RadioGroup defaultValue='momo'>
            <div className='flex items-center gap-3 border-Border-border-brand-solid border rounded p-3'>
              <RadioGroupItem value='momo' id='momo' />
              <div className='flex items-center gap-2'>
                <Image src={Momo} alt='Momo' />
                <Label htmlFor='momo'>Momo</Label>
              </div>
            </div>
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
        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${item.product.thumbnail}`}
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
