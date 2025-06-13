'use client'
import Mock from '@/assets/mock.png'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Minus, Plus, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
export default function Checkout() {
  const router = useRouter()
  return (
    <div className='py-8 px-4 md:px-6 space-y-6 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_325px] gap-8'>
      <div className='space-y-8'>
        <Link href='/shop' className='text-xl flex items-center gap-2 font-bold'>
          <ChevronLeft className='w-5 h-5' />
          Cart (1)
        </Link>
        <>
          {[...Array(10)].map((_, index) => (
            <CheckoutItem key={index} />
          ))}
        </>
      </div>
      <div className='p-6 bg-[#121212] h-fit space-y-3 text-[#9091A0] border text-sm'>
        <div className='flex items-center justify-between text-xs md:text-sm'>
          <span>Subtotal</span>
          <span>250.000 VNĐ</span>
        </div>
        <div className='flex items-center justify-between text-xs md:text-sm'>
          <span>Shipping fee</span>
          <span>Free</span>
        </div>
        <div className='flex items-center justify-between text-xs md:text-sm'>
          <span>Discount</span>
          <span>-0 VNĐ</span>
        </div>
        <div className='h-px w-full bg-Border-border-primary'></div>
        <div className='flex items-center justify-between text-white text-base ms:text-lg font-bold '>
          <span>Total</span>
          <span>250.000 VNĐ</span>
        </div>
        <Button
          className='w-full justify-center'
          onClick={() => {
            router.push('/checkout')
          }}>
          Checkout
        </Button>
      </div>
    </div>
  )
}
const CheckoutItem = () => {
  return (
    <div className='grid grid-cols-[5fr_1fr] md:grid-cols-[5fr_1fr_1fr] items-center md:gap-6'>
      <div className='flex items-center gap-6'>
        <Image src={Mock} alt='Product' width={100} height={100} className='w-20 h-20 md:w-32 md:h-32 object-cover' />
        <div className='space-y-2'>
          <div className='font-medium text-sm md:text-lg'>Polo thể thao nam Promax Sideflow</div>
          <div className='flex items-center gap-2 text-xs md:text-sm'>
            <span>250.000 VNĐ</span>
          </div>
          <div className='self-stretch h-[22px] inline-flex justify-start items-center gap-1.5'>
            <div className='size- flex justify-start items-center gap-1'>
              <div className="justify-start text-[#9091a0] text-sm font-normal font-['Inter'] leading-tight">Size:</div>
              <div className="justify-start text-white text-sm font-medium font-['Inter'] leading-tight">S</div>
            </div>
            <div className="justify-start text-[#9091a0] text-sm font-normal font-['Inter'] leading-tight">|</div>
            <div className='size- flex justify-start items-center gap-1'>
              <div className="justify-start text-[#9091a0] text-sm font-normal font-['Inter'] leading-tight">
                Color:
              </div>
              <div className="justify-start text-white text-sm font-medium font-['Inter'] leading-tight">White</div>
            </div>
          </div>
          <div className='flex items-center gap-1 text-[#9091A0] hover:text-red-500 cursor-pointer text-xs md:text-sm'>
            <Trash className='w-5 h-5' />
            Remove
          </div>
        </div>
      </div>
      <div className='border px-2 py-3 text-xs md:text-sm w-fit min-w-20 text-center'>
        <div className='flex items-center gap-2'>
          <button className='w-5 h-5 md:w-6 md:h-6 flex items-center justify-center cursor-pointer'>
            <Minus className='w-4 h-4' />
          </button>
          <span>1</span>
          <button className='w-5 h-5 md:w-6 md:h-6 flex items-center justify-center cursor-pointer'>
            <Plus className='w-4 h-4' />
          </button>
        </div>
      </div>
      <div className='md:hidden'></div>
      <div className='flex items-center gap-2 justify-end whitespace-nowrap'>
        <span>250.000 VNĐ</span>
      </div>
    </div>
  )
}
