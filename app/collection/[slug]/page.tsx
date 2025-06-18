'use client'
import Discord from '@/assets/icons/discord'
import Facebook from '@/assets/icons/facebook'
import Instagram from '@/assets/icons/instagram'
import Tiktok from '@/assets/icons/tiktok'
import X from '@/assets/icons/x'
import Youtube from '@/assets/icons/youtube'
import Mock from '@/assets/mock.png'
import Mock3 from '@/assets/mock-3.png'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Minus, PlusIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
export default function CollectionPage() {
  return (
    <main>
      <div className=''>
        <Image src={Mock3} alt='Mock 2' width={2000} height={2000} className='w-full h-full object-cover' />
      </div>
      <div className='bg-black py-6 md:py-10 flex flex-col items-center justify-center gap-4 md:gap-7'>
        <div className='text-center justify-start text-white text-xl md:text-2xl font-bold'>FOLLOW US</div>
        <div className='flex gap-4 md:gap-8 items-center justify-center'>
          <Discord className='w-5 h-5 md:w-6 md:h-6' />
          <Facebook className='w-5 h-5 md:w-6 md:h-6' />
          <Instagram className='w-5 h-5 md:w-6 md:h-6' />
          <Tiktok className='w-5 h-5 md:w-6 md:h-6' />
          <X className='w-5 h-5 md:w-6 md:h-6' />
          <Youtube className='w-5 h-5 md:w-6 md:h-6' />
        </div>
      </div>
      <div className='p-4 md:p-6 space-y-4 md:space-y-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl md:text-3xl font-bold'>Shop</h1>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6'>
          {[...Array(36)].map((_, index) => (
            <Product key={index} />
          ))}
        </div>
      </div>
    </main>
  )
}
const Product = () => {
  const [quantity, setQuantity] = useState(1)
  const [open, setOpen] = useState(false)
  const { push } = useRouter()
  return (
    <div
      onClick={() => push('/collection/summer-party/product/tee-shirt')}
      className='relative pb-4 md:pb-6 [&:hover_.add-to-cart]:block'>
      <div className='h-5 md:h-6 px-1 py-0.5 bg-[#00e160] rounded-xs inline-flex justify-center items-center absolute top-2 left-2'>
        <div className='px-1 flex justify-center items-center gap-2'>
          <div className='text-center justify-center text-[#09090a] text-[10px] md:text-xs font-bold'>Pre order</div>
        </div>
      </div>
      <div className='w-full aspect-square relative'>
        <div className='add-to-cart absolute bottom-2.5 right-2.5 hidden'>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  setOpen(true)
                }}>
                <PlusIcon /> Add to Cart
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className='hidden'>Add to Cart</DialogTitle>
              </DialogHeader>
              <div className='space-y-4'>
                <div className='flex gap-3 md:gap-6 items-center'>
                  <Image
                    src={Mock}
                    alt='Product'
                    width={500}
                    height={500}
                    className='object-cover w-16 h-16 md:w-20 md:h-20 border border-brand'
                  />
                  <div className='self-stretch inline-flex flex-col justify-start items-start gap-1 md:gap-2'>
                    <div className='self-stretch justify-start text-white text-sm md:text-base font-medium'>
                      Polo thể thao nam Promax Sideflow
                    </div>
                    <div className='self-stretch inline-flex justify-start items-center gap-1'>
                      <div className='justify-start text-[#d9d9de] text-xs md:text-sm font-normal'>250.000 VNĐ</div>
                    </div>
                  </div>
                </div>
                {['Size', 'Color'].map((key) => {
                  const options = key == 'Size' ? ['S', 'M', 'L', 'XL', 'XXL'] : ['Red', 'Blue', 'Green']
                  return (
                    <div key={key} className='space-y-3'>
                      <div className='text-xs md:text-sm text-text-secondary capitalize'>{key}</div>
                      <div className='flex gap-3 flex-wrap'>
                        {options.map((option, index) => (
                          <button
                            key={index}
                            className={`px-2 md:px-3 min-w-16 md:min-w-20 rounded-xs py-2 md:py-2.5 text-xs md:text-sm border capitalize font-medium`}>
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
                <div className='space-y-2 md:space-y-3'>
                  <div className='text-xs md:text-sm text-text-secondary capitalize'>Quantity</div>
                  <div className='flex items-center gap-2 border w-fit rounded-xs'>
                    <button
                      className='px-2 md:px-3 py-2 md:py-2.5 cursor-pointer'
                      onClick={() => setQuantity(quantity - 1)}>
                      <Minus className='w-3 h-3 md:w-4 md:h-4' />
                    </button>
                    <span className='text-xs md:text-sm'>{quantity}</span>
                    <button
                      className='px-2 md:px-3 py-2 md:py-2.5 cursor-pointer'
                      onClick={() => setQuantity(quantity + 1)}>
                      <PlusIcon className='w-3 h-3 md:w-4 md:h-4' />
                    </button>
                  </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                  <Button className='flex justify-center' onClick={() => push('/cart')}>
                    Add to Cart
                  </Button>
                  <Button className='flex justify-center' onClick={() => push('/checkout')}>
                    Checkout
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Image src={Mock} alt='Product' width={500} height={500} className='object-cover w-full h-full' />
      </div>
      <div>
        <div className='self-stretch justify-start text-white text-sm md:text-base font-bold mt-3 md:mt-6'>
          Polo thể thao nam Promax Sideflow
        </div>
        <div className='justify-start text-[#d9d9de] text-xs md:text-sm font-normal'>250.000 VNĐ</div>
      </div>
    </div>
  )
}
