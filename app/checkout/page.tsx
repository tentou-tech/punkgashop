'use client'
import Mock from '@/assets/mock.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

interface Inputs {
  email: string
  name: string
  phone: string
  address: string
  note?: string
}
export default function Checkout() {
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

  return (
    <div className='py-8 px-4 md:px-6 space-y-6 max-w-[1400px] overflow-hidden mx-auto grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8'>
      <form onSubmit={handleSubmit(onSubmit, onError)} className='space-y-8 order-2 md:order-1'>
        <div className='space-y-4'>
          <div className='text-xl font-bold'>Contact</div>
          <div className='grid w-full items-center gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              type='email'
              id='email'
              placeholder='example@mail.com'
              required
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            <span className='text-xs text-[#9091A0]'>Order tracking will be sent via Email</span>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='text-xl font-bold'>Delivery</div>

          <div className='grid w-full items-center gap-2'>
            <Label htmlFor='name'>Name</Label>
            <Input
              type='text'
              id='name'
              placeholder='John'
              required
              {...register('name', { required: 'Name is required' })}
            />
          </div>
          <div className='grid w-full items-center gap-2'>
            <Label htmlFor='phone'>Phone number</Label>
            <Input
              type='text'
              id='phone'
              placeholder='123-456-7890'
              required
              {...register('phone', { required: 'Phone number is required' })}
            />
          </div>
          <div className='grid w-full items-center gap-2'>
            <Label htmlFor='address'>Address</Label>
            <Input
              type='text'
              id='address'
              placeholder='123 Main St'
              required
              {...register('address', { required: 'Address is required' })}
            />
          </div>
          <div className='grid w-full items-center gap-2'>
            <Label htmlFor='note'>Note</Label>
            <Textarea id='note' placeholder='Note' required {...register('note')} />
          </div>

          <Button className='w-full justify-center' type='submit'>
            Pay now
          </Button>
          <div className='text-center w-full'>or</div>
          <Link href='/' className='mx-auto block text-center text-brand hover:text-brand/80'>
            Continue shopping
          </Link>
        </div>
      </form>
      <div className='space-y-4 overflow-hidden order-1 md:order-2'>
        <div className='max-h-[calc(100vh-24rem)] space-y-4 overflow-y-scroll'>
          {[...Array(10)].map((_, index) => (
            <CheckoutItem key={index} />
          ))}
        </div>
        <div className='space-y-3 text-sm text-Text-Default-text-tertiary'>
          <div className='flex items-center justify-between'>
            <span>Subtotal</span>
            <span>250.000 VNĐ</span>
          </div>
          <div className='flex items-center justify-between'>
            <span>Shipping fee</span>
            <span>Free</span>
          </div>
          <div className='flex items-center justify-between'>
            <span>Discount</span>
            <span>-0 VNĐ</span>
          </div>
          <div className='h-px w-full bg-Border-border-primary'></div>
          <div className='flex items-center justify-between text-white text-lg font-bold'>
            <span>Total</span>
            <span className='inline-flex items-center gap-2'>250.000 VNĐ</span>
          </div>
        </div>
      </div>
    </div>
  )
}
const CheckoutItem = () => {
  return (
    <div className='flex gap-4 items-center overflow-hidden'>
      <Image src={Mock} alt='Product' width={100} height={100} className='w-14 h-14 object-cover shrink-0' />
      <div className='space-y-0.5 flex-1 overflow-hidden'>
        <div className='text-sm font-medium flex overflow-hidden items-center'>
          <span className='whitespace-nowrap overflow-hidden truncate'>Polo thể thao nam Promax Sideflow</span>
          <span className='ml-1 text-xs text-Text-Default-text-tertiary'>x3</span>
        </div>
        <div className='text-xs capitalize text-Text-Default-text-tertiary'>S, Whitw</div>
      </div>
      <div className='shrink-0 text-sm'>250.000 VNĐ</div>
    </div>
  )
}
