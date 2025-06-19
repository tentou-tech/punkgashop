'use client'
import Discord from '@/assets/icons/discord'
import Facebook from '@/assets/icons/facebook'
import Instagram from '@/assets/icons/instagram'
import Tiktok from '@/assets/icons/tiktok'
import X from '@/assets/icons/x'
import Youtube from '@/assets/icons/youtube'
import { getCollectionById } from '@/services/shop'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import useSWR from 'swr'

import Mock from '@/assets/mock.png'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { sizeOrder } from '@/config'
import { ProductCollectionDetail } from '@/models/shop'
import { useCart } from '@/provider/cart'
import { formatCurrency } from '@/utils/number'
import { Minus, PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
export default function CollectionPage() {
  const params = useParams()
  const collectionId = Number(params['collection-id'])
  const { data } = useSWR({ key: 'getCollectionById', id: collectionId }, ({ id }) => getCollectionById(id))
  return (
    <main>
      <div className=''>
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${data?.detail_image}`}
          alt={data?.name || ''}
          width={2000}
          height={2000}
          className='w-full h-full object-cover'
        />
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
          {data?.products.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </div>
      </div>
    </main>
  )
}

const Product = ({ product }: { product: ProductCollectionDetail['products'][number] }) => {
  const [quantity, setQuantity] = useState(1)
  const params = useParams()
  const [open, setOpen] = useState(false)
  const { addItem, setCheckoutItems } = useCart()
  const { push } = useRouter()
  const optionKeys = product?.product_options[0].option ? Object.keys(product.product_options[0].option) : []
  const subOptionKeys = optionKeys.filter((key) => typeof (product?.product_options[0].option as any)[key] !== 'string')
  const [selectedOption, setSelectedOption] = useState({
    ...product?.product_options[0],
    subOptions: subOptionKeys.map((key) => ({
      key,
      value: (product?.product_options[0].option as any)[key][0],
    })),
  })
  const onOptionSelect = (option: string, key: string, optionType: string) => {
    if (optionType === 'main') {
      const newOption = product?.product_options.find((opt) => {
        return (opt.option as any)[key].toLowerCase() === option.toLowerCase()
      })
      if (newOption) {
        setSelectedOption((prev) => {
          if (
            subOptionKeys.some((subKey) => {
              const oldValue = prev.subOptions.find((subOption) => subOption.key === subKey)?.value

              if (!(prev.option as any)[subKey].includes(oldValue)) {
                return true
              }
              return false
            })
          ) {
            return {
              ...newOption,
              subOptions: subOptionKeys.map((key) => ({
                key,
                value: (newOption.option as any)[key][0],
              })),
            }
          }
          return {
            ...newOption,
            subOptions: prev.subOptions,
          }
        })
      }
    } else {
      setSelectedOption((prev) => {
        const newSubOptions = prev.subOptions.filter((subOption) => subOption.key !== key)
        newSubOptions.push({ key, value: option })
        return {
          ...prev,
          subOptions: newSubOptions,
        }
      })
    }
  }
  return (
    <div
      onClick={() => push(`/collection/${params['collection-id']}/product/${product.id}`)}
      className='relative pb-4 md:pb-6 [&:hover_.add-to-cart]:block cursor-pointer'>
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
            <DialogContent
              onClick={(e) => {
                e.stopPropagation()
              }}>
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
                      {product.name}
                    </div>
                    <div className='self-stretch inline-flex justify-start items-center gap-1'>
                      <div className='justify-start text-[#d9d9de] text-xs md:text-sm font-normal'>
                        {formatCurrency(product.lowest_price, '₫')}
                      </div>
                    </div>
                  </div>
                </div>
                {optionKeys.map((key) => {
                  let options = product.product_options.map(
                    (option) => option.option[key as keyof typeof option.option]
                  )
                  let optionType = 'main'
                  if (typeof options[0] !== 'string') {
                    optionType = 'sub'
                    const newOptions: string[] = []
                    options.forEach((option) => {
                      if (option) {
                        newOptions.push(...option)
                      }
                    })
                    options = [...new Set(newOptions)]
                  }
                  return (
                    <div key={key} className='space-y-3'>
                      <div className='text-xs md:text-sm text-text-secondary capitalize'>{key}</div>
                      <div className='flex gap-3 flex-wrap'>
                        {(options as string[])
                          .sort((a, b) => {
                            if (key === 'size') {
                              return sizeOrder[a as keyof typeof sizeOrder] - sizeOrder[b as keyof typeof sizeOrder]
                            }
                            return a.localeCompare(b)
                          })
                          .map((option, index) => (
                            <button
                              key={index}
                              onClick={() => onOptionSelect(option, key, optionType)}
                              className={`px-2 md:px-3 min-w-16 md:min-w-20 rounded-xs py-2 md:py-2.5 text-xs md:text-sm border capitalize font-medium ${
                                (selectedOption.option as any)[key] === option ||
                                selectedOption.subOptions.some((subOption) => subOption.value === option)
                                  ? 'border-Border-border-brand-solid text-Text-Brand-text-brand-primary bg-text-primary'
                                  : 'border-[#3F3F46]'
                              }`}>
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
                  <Button className='flex justify-center' onClick={() => addItem(product, quantity, selectedOption)}>
                    Add to Cart
                  </Button>
                  <Button
                    className='flex justify-center'
                    onClick={() => {
                      setOpen(false)
                      setCheckoutItems([
                        {
                          product,
                          quantity,
                          option: selectedOption,
                        },
                      ])
                      push('/shop/checkout')
                    }}>
                    Checkout
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${product.thumbnail}`}
          alt='Product'
          width={500}
          height={500}
          className='object-cover w-full h-full'
        />
      </div>
      <div>
        <div className='self-stretch justify-start text-white text-sm md:text-base font-bold mt-3 md:mt-6'>
          {product.name}
        </div>
        <div className='justify-start text-[#d9d9de] text-xs md:text-sm font-normal'>
          {formatCurrency(product.lowest_price, 'VNĐ')}
        </div>
      </div>
    </div>
  )
}
