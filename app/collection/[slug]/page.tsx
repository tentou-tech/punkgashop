'use client'
import Discord from '@/assets/icons/discord'
import Facebook from '@/assets/icons/facebook'
import Instagram from '@/assets/icons/instagram'
import Tiktok from '@/assets/icons/tiktok'
import X from '@/assets/icons/x'
import Youtube from '@/assets/icons/youtube'
import Mock from '@/assets/mock.png'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Minus, PlusIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
export default function CollectionPage() {
  return (
    <main>
      <div className='bg-gray-400 w-full aspect-video'></div>
      <div className='bg-black py-10 flex flex-col items-center justify-center gap-7'>
        <div className='text-center justify-start text-white text-2xl font-bold'>FOLLOW US</div>
        <div className='flex gap-8 items-center justify-center'>
          <Discord />
          <Facebook />
          <Instagram />
          <Tiktok />
          <X />
          <Youtube />
        </div>
      </div>
      <div className='p-6 space-y-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold'>Shop</h1>
          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Theme' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='light'>Light</SelectItem>
              <SelectItem value='dark'>Dark</SelectItem>
              <SelectItem value='system'>System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='grid grid-cols-6 gap-6'>
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
  return (
    <div className='relative pb-6 [&:hover_.add-to-cart]:block'>
      <div className='h-6 px-1 py-0.5 bg-[#00e160] rounded-xs inline-flex justify-center items-center absolute top-2 left-2'>
        <div className='size- px-1 flex justify-center items-center gap-2.5'>
          <div className='text-center justify-center text-[#09090a] text-xs font-bold'>Pre order</div>
        </div>
      </div>
      <div className='w-full aspect-square bg-gray-200 relative'>
        <div className='add-to-cart absolute bottom-2.5 right-2.5 hidden'>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon /> Add to Cart
              </Button>
            </DialogTrigger>
            <DialogContent>
              <div className='space-y-4'>
                <div className='flex gap-6 items-center'>
                  <Image
                    src={Mock}
                    alt='Product'
                    width={500}
                    height={500}
                    className='object-cover w-20 h-20 border border-brand'
                  />
                  <div className='self-stretch inline-flex flex-col justify-start items-start gap-2'>
                    <div className='self-stretch justify-start text-white text-base font-medium'>
                      Polo thể thao nam Promax Sideflow
                    </div>
                    <div className='self-stretch inline-flex justify-start items-center gap-1'>
                      <div className='justify-start text-[#d9d9de] text-sm font-normal'>250.000 VNĐ</div>
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
                            className={`px-3 min-w-20 rounded-xs py-2.5 text-xs md:text-sm border capitalize font-medium`}>
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
                <div className='space-y-3'>
                  <div className='text-xs md:text-sm text-text-secondary capitalize'>Quantity</div>
                  <div className='flex items-center gap-2 border w-fit rounded-xs'>
                    <button className='px-3 py-2.5 cursor-pointer' onClick={() => setQuantity(quantity - 1)}>
                      <Minus className='w-4 h-4' />
                    </button>
                    <span className='text-xs md:text-sm'>{quantity}</span>
                    <button className='px-3 py-2.5 cursor-pointer' onClick={() => setQuantity(quantity + 1)}>
                      <PlusIcon className='w-4 h-4' />
                    </button>
                  </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                  <Button className='flex justify-center'>Add to Cart</Button>
                  <Button className='flex justify-center'>Checkout</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Link href='/collection/summer-party/product/tee-shirt'>
        <div className='self-stretch justify-start text-white text-base font-bold mt-6'>
          Polo thể thao nam Promax Sideflow
        </div>
        <div className='justify-start text-[#d9d9de] text-sm font-normal'>250.000 VNĐ</div>
      </Link>
    </div>
  )
}
