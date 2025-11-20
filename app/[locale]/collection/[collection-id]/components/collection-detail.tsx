'use client'
import DefaultAvatar from '@/assets/Avatar.png'
import Discord from '@/assets/icons/discord'
import Facebook from '@/assets/icons/facebook'
import Instagram from '@/assets/icons/instagram'
import Tiktok from '@/assets/icons/tiktok'
import X from '@/assets/icons/x'
import Youtube from '@/assets/icons/youtube'
// import { Button } from '@/components/ui/button'
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
// import { sizeOrder } from '@/config'
import { useRouter } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { ProductCollectionDetail } from '@/models/shop'
// import { useCart } from '@/provider/cart'
import { getCollectionById } from '@/services/shop'
import { getSrcImage } from '@/utils/image'
import { formatCurrency } from '@/utils/number'
// import { Minus, PlusIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
// import { useState } from 'react'
import useSWR from 'swr'
// import SizeGuideImage from '@/assets/size-guide.png'
export default function CollectionDetail() {
  const t = useTranslations('collection')
  const params = useParams()
  const collectionId = Number(params['collection-id'])
  const { data } = useSWR({ key: 'getCollectionById', id: collectionId }, ({ id }) => getCollectionById(id))
  return (
    <main>
      <div className=''>
        <Image
          src={getSrcImage(data?.detail_image)}
          alt={data?.name || ''}
          width={4000}
          height={4000}
          className='w-full h-full object-cover'
        />
      </div>
      <div className='bg-black py-6 md:py-10 flex flex-col items-center justify-center gap-4'>
        <Image
          src={getSrcImage(data?.creator.avatar_url) || DefaultAvatar}
          alt={data?.name || ''}
          width={300}
          height={300}
          className='w-[120px] h-[120px] object-cover rounded-full overflow-hidden'
        />
        <div className='text-center flex items-center gap-1 justify-start text-white text-2xl md:text-3xl font-bold'>
          {data?.creator.pen_name || data?.creator.name}
          <Link href={`https://punkga.me/creator/${data?.creator.slug}`} target='_blank'>
            <svg xmlns='http://www.w3.org/2000/svg' width='38' height='39' viewBox='0 0 38 39' fill='none'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M9.50069 11.7089C9.50068 10.8344 10.2096 10.1255 11.084 10.1255L26.8805 10.2477C27.3004 10.2477 27.7031 10.4145 28.0001 10.7114C28.297 11.0083 28.4638 11.4111 28.4638 11.831L28.4636 27.542C28.4636 28.4164 27.7547 29.1253 26.8803 29.1253C26.0058 29.1253 25.2969 28.4164 25.2969 27.542L25.2972 15.6535L12.3259 28.6248C11.7075 29.2431 10.705 29.2431 10.0867 28.6248C9.46837 28.0065 9.46837 27.0039 10.0867 26.3856L23.0579 13.4144L11.084 13.2922C10.2096 13.2922 9.50071 12.5833 9.50069 11.7089Z'
                fill='white'
              />
            </svg>
          </Link>
        </div>
        <div className='flex gap-4 md:gap-8 items-center justify-center'>
          {data?.creator.socials?.discord && (
            <Link href={data?.creator.socials.discord} target='_blank'>
              <Discord className='w-5 h-5 md:w-6 md:h-6' />
            </Link>
          )}
          {data?.creator.socials?.facebook && (
            <Link href={data?.creator.socials.facebook} target='_blank'>
              <Facebook className='w-5 h-5 md:w-6 md:h-6' />
            </Link>
          )}
          {data?.creator.socials?.instagram && (
            <Link href={data?.creator.socials.instagram} target='_blank'>
              <Instagram className='w-5 h-5 md:w-6 md:h-6' />
            </Link>
          )}
          {data?.creator.socials?.tiktok && (
            <Link href={data?.creator.socials.tiktok} target='_blank'>
              <Tiktok className='w-5 h-5 md:w-6 md:h-6' />
            </Link>
          )}
          {data?.creator.socials?.twitter && (
            <Link href={data?.creator.socials.twitter} target='_blank'>
              <X className='w-5 h-5 md:w-6 md:h-6' />
            </Link>
          )}
          {data?.creator.socials?.youtube && (
            <Link href={data?.creator.socials.youtube} target='_blank'>
              <Youtube className='w-5 h-5 md:w-6 md:h-6' />
            </Link>
          )}
        </div>
      </div>
      {!!data?.paragraphs?.length && (
        <div>
          {data?.paragraphs
            .sort((a, b) => a.sort - b.sort)
            .map((paragraph, index) => (
              <div style={{ backgroundColor: index % 2 === 1 ? '#000' : '' }} key={index} className='p-4 md:p-6 '>
                <div
                  className={cn(
                    'max-w-[1248px] mx-auto flex items-center flex-col justify-center gap-4 lg:gap-[96px]',
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  )}>
                  <Image
                    src={getSrcImage(paragraph.image)}
                    alt={paragraph.title}
                    width={100}
                    height={100}
                    className='w-full h-full object-cover lg:w-[500px] lg:h-[550px]'
                  />
                  <div className='space-y-2'>
                    <h2 className='text-2xl md:text-5xl uppercase text-Text-Brand-text-brand-primary font-bold'>
                      {paragraph.title}
                    </h2>
                    <p className='text-Text-Default-text-secondary md:text-lg'>{paragraph.text}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      <div className='p-4 md:p-6 space-y-4 md:space-y-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl md:text-3xl font-bold'>{t('shop')}</h1>
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
  const t = useTranslations('collection')
  const commonT = useTranslations('common')
  // const [quantity, setQuantity] = useState(1)
  const params = useParams()
  // const [open, setOpen] = useState(false)
  // const { addItem, setCheckoutItems } = useCart()
  const { push } = useRouter()
  // const optionKeys = product?.product_options[0].option ? Object.keys(product.product_options[0].option) : []
  // const subOptionKeys = optionKeys.filter((key) => typeof (product?.product_options[0].option as any)[key] !== 'string')
  // const [selectedOption, setSelectedOption] = useState({
  //   ...product?.product_options[0],
  //   subOptions: subOptionKeys.map((key) => ({
  //     key,
  //     value: (product?.product_options[0].option as any)[key][0],
  //   })),
  // })
  // const onOptionSelect = (option: string, key: string, optionType: string) => {
  //   if (optionType === 'main') {
  //     const newOption = product?.product_options.find((opt) => {
  //       return (opt.option as any)[key].toLowerCase() === option.toLowerCase()
  //     })
  //     if (newOption) {
  //       setSelectedOption((prev) => {
  //         if (
  //           subOptionKeys.some((subKey) => {
  //             const oldValue = prev.subOptions.find((subOption) => subOption.key === subKey)?.value

  //             if (!(prev.option as any)[subKey].includes(oldValue)) {
  //               return true
  //             }
  //             return false
  //           })
  //         ) {
  //           return {
  //             ...newOption,
  //             subOptions: subOptionKeys.map((key) => ({
  //               key,
  //               value: (newOption.option as any)[key][0],
  //             })),
  //           }
  //         }
  //         return {
  //           ...newOption,
  //           subOptions: prev.subOptions,
  //         }
  //       })
  //     }
  //   } else {
  //     setSelectedOption((prev) => {
  //       const newSubOptions = prev.subOptions.filter((subOption) => subOption.key !== key)
  //       newSubOptions.push({ key, value: option })
  //       return {
  //         ...prev,
  //         subOptions: newSubOptions,
  //       }
  //     })
  //   }
  // }
  return (
    <div
      onClick={() => push(`/collection/${params['collection-id']}/product/${product.id}`)}
      className='relative pb-4 md:pb-6 [&:hover_.add-to-cart]:block cursor-pointer'>
      <div className='h-5 md:h-6 px-1 py-0.5 bg-[#00e160] rounded-xs inline-flex justify-center items-center absolute top-2 left-2 z-10'>
        <div className='px-1 flex justify-center items-center gap-2'>
          <div className='text-center justify-center text-[#09090a] text-[10px] md:text-xs font-bold'>
            {t('preOrder')}
          </div>
        </div>
      </div>
      <div className='h-5 md:h-6 px-1 py-0.5 bg-[#323239] rounded-xs inline-flex justify-center items-center absolute top-10 left-2 z-10'>
        <div className='px-1 flex justify-center items-center gap-2'>
          <div className='text-center justify-center text-white text-[10px] md:text-xs font-bold'>{t('soldOut')}</div>
        </div>
      </div>
      <div className='w-full aspect-square relative'>
        {/* <div className='add-to-cart absolute bottom-2.5 right-2.5 hidden'>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  setOpen(true)
                }}>
                <PlusIcon /> {t('addToCart')}
              </Button>
            </DialogTrigger>
            <DialogContent
              onClick={(e) => {
                e.stopPropagation()
              }}>
              <DialogHeader>
                <DialogTitle className='hidden'>{t('addToCart')}</DialogTitle>
              </DialogHeader>
              <div className='space-y-4'>
                <div className='flex gap-3 md:gap-6 items-center'>
                  <Image
                    src={getSrcImage(selectedOption.product_images[0].image)}
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
                  let options = [
                    ...new Set(
                      product.product_options.map((option) => option.option[key as keyof typeof option.option])
                    ),
                  ]
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
                      {key === 'size' && (
                        <>
                          <Dialog>
                            <DialogTrigger className='text-Text-Default-text-tertiary text-sm underline'>
                              Size Guide
                            </DialogTrigger>
                            <DialogContent className='!max-w-5xl'>
                              <DialogTitle className='hidden'>Size Guide</DialogTitle>
                              <Image
                                src={SizeGuideImage}
                                alt='Size Guide'
                                width={400}
                                height={400}
                                className='w-full h-auto object-contain'
                              />
                            </DialogContent>
                          </Dialog>
                        </>
                      )}
                    </div>
                  )
                })}
                <div className='space-y-2 md:space-y-3'>
                  <div className='text-xs md:text-sm text-text-secondary capitalize'>{t('quantity')}</div>
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
                    {t('addToCart')}
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
                      push('/checkout')
                    }}>
                    {t('checkout')}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div> */}
        <Image
          src={getSrcImage(product.thumbnail)}
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
          {formatCurrency(product.lowest_price, commonT('currency'))}
        </div>
      </div>
    </div>
  )
}
