'use client'
import { Button } from '@/components/ui/button'
import { sizeOrder } from '@/config'
import { ProductDetail as ProductDetailType } from '@/models/shop'
// import { useCart } from '@/provider/cart'
import { getProductById } from '@/services/shop'
import { formatCurrency } from '@/utils/number'
import useEmblaCarousel from 'embla-carousel-react'
import { Minus, PlusIcon } from 'lucide-react'
import Image from 'next/image'
// import { useRouter } from '@/i18n/navigation'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import { useTranslations } from 'next-intl'
import { getSrcImage } from '@/utils/image'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import SizeGuideImage from '@/assets/size-guide.png'
export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id
  const { data } = useSWR({ key: 'getProductById', id: Number(productId) }, ({ id }) => getProductById(id))
  return (
    <div className='py-8 px-4 md:px-6 space-y-6 max-w-[1400px] overflow-hidden mx-auto'>
      {/* <div data-level='3' className='size- inline-flex justify-start items-center gap-2'>
        <div data-is-active='True' className='size- flex justify-center items-center gap-2.5'>
          <div className="justify-start text-[#00e160] text-sm font-medium font-['Inter'] leading-tight">Home</div>
        </div>
        <svg xmlns='http://www.w3.org/2000/svg' width='8' height='16' viewBox='0 0 8 16' fill='none'>
          <path d='M7 1L1 15' stroke='#323239' />
        </svg>
        <div data-is-active='True' className='size- flex justify-center items-center gap-2.5'>
          <div className="justify-start text-[#00e160] text-sm font-medium font-['Inter'] leading-tight">
            Collection name
          </div>
        </div>
        <svg xmlns='http://www.w3.org/2000/svg' width='8' height='16' viewBox='0 0 8 16' fill='none'>
          <path d='M7 1L1 15' stroke='#323239' />
        </svg>
        <div data-is-active='False' className='size- flex justify-center items-center gap-2.5'>
          <div className="justify-start text-[#9091a0] text-sm font-medium font-['Inter'] leading-tight">
            Polo thể thao nam Promax Sideflow
          </div>
        </div>
      </div> */}
      <div className=' grid grid-cols-1 md:grid-cols-[minmax(0,min(50%,600px))_1fr] gap-8'>
        {data && <ProductDetail data={data} />}
      </div>
    </div>
  )
}
function ProductDetail({ data }: { data: ProductDetailType }) {
  const t = useTranslations('product')
  const commonT = useTranslations('common')
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true })
  // const { addItem, setCheckoutItems } = useCart()
  const [selectedIndex, setSelectedIndex] = useState(0)
  // const { push } = useRouter()
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  })
  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )
  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()

    emblaMainApi.on('select', onSelect).on('reInit', onSelect)
  }, [emblaMainApi, onSelect])
  const optionKeys = data?.product_options[0].option ? Object.keys(data.product_options[0].option) : []
  // const mainOptionKey = optionKeys.find((key) => typeof (data?.product_options[0].option as any)[key] === 'string')
  const subOptionKeys = optionKeys.filter((key) => typeof (data?.product_options[0].option as any)[key] !== 'string')
  const [selectedOption, setSelectedOption] = useState({
    ...data?.product_options[0],
    subOptions: subOptionKeys.map((key) => ({
      key,
      value: (data?.product_options[0].option as any)[key][0],
    })),
  })
  const [quantity, setQuantity] = useState(1)
  const onOptionSelect = (option: string, key: string, optionType: string) => {
    if (optionType === 'main') {
      const newOption = data?.product_options.find((opt) => {
        return (opt.option as any)[key].toLowerCase() === option.toLowerCase()
      })
      const imageIndex = data?.product_images.findIndex((image) => image.product_option_id === newOption?.id)
      if (imageIndex !== undefined) {
        emblaMainApi?.scrollTo(imageIndex)
      }
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
    <>
      <div className='space-y-4'>
        <div className='embla'>
          <div className='embla__viewport' ref={emblaMainRef}>
            <div className='embla__container'>
              {data?.product_images.map((image, index) => {
                // const optionId = image.product_option_id
                // const option = data?.product_options.find((opt) => opt.id === optionId)
                // const label = mainOptionKey && option ? (option?.option as any)[mainOptionKey] : ''
                return (
                  <div className='embla__slide relative' key={index}>
                    <Image
                      src={getSrcImage(image.image)}
                      alt='Product'
                      width={700}
                      height={700}
                      className='w-full aspect-square object-contain'
                    />
                    {/* {label && (
                      <div className='absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center py-2'>
                        {label}
                      </div>
                    )} */}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='embla-thumbs'>
          <div className='embla-thumbs__viewport' ref={emblaThumbsRef}>
            <div className='embla-thumbs__container'>
              {data?.product_images.map((image, index) => (
                <div
                  className={'embla-thumbs__slide'.concat(
                    index === selectedIndex ? ' embla-thumbs__slide--selected' : ''
                  )}
                  key={index}
                  onClick={() => onThumbClick(index)}>
                  <Image
                    src={getSrcImage(image.image)}
                    alt='Product'
                    width={700}
                    height={700}
                    className='w-full aspect-square object-cover'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='space-y-8'>
          <div className='self-stretch inline-flex flex-col justify-start items-start gap-2.5'>
            <div className='self-stretch justify-start text-white text-3xl font-medium'>{data?.name}</div>
            <div className='self-stretch inline-flex justify-start items-center gap-1'>
              <div className='justify-start text-[#d9d9de] text-xl font-normal'>
                {formatCurrency(selectedOption.price || 0, commonT('currency'))}
              </div>
            </div>
          </div>
          {optionKeys.map((key) => {
            let options = [
              ...new Set(data?.product_options.map((option) => option.option[key as keyof typeof option.option])),
            ]
            let optionType = 'main'
            if (options && typeof options?.[0] !== 'string') {
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
                <div className='text-sm text-text-secondary capitalize'>{key}</div>
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
                        className={`px-3 rounded-xs py-2.5 min-w-20 text-sm border capitalize font-medium ${
                          (selectedOption.option as any)[key] === option ||
                          selectedOption.subOptions.some((subOption) => subOption.value === option)
                            ? 'border-Border-border-brand-solid text-Border-border-brand-solid bg-text-primary'
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
          <div className='space-y-3'>
            <div className='text-sm text-text-secondary capitalize'>{t('quantity')}</div>
            <div className='flex items-center gap-2 border rounded-xs w-fit'>
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className='px-3 py-2.5 cursor-pointer'>
                <Minus className='w-4 h-4' />
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((prev) => prev + 1)} className='px-3 py-2.5 cursor-pointer'>
                <PlusIcon className='w-4 h-4' />
              </button>
            </div>
          </div>
          <div className=''>
            <Button variant='secondary' className='w-full'>
              {t('soldOut')}
            </Button>
          </div>
          {/* <div className='grid grid-cols-2 gap-4'>
            <Button variant='outline' onClick={() => addItem(data, quantity, selectedOption)}>
              {t('addToCart')}
            </Button>
            <Button
              onClick={() => {
                setCheckoutItems([{ product: data, quantity, option: selectedOption }])
                push('/checkout')
              }}>
              {t('buyNow')}
            </Button>
          </div> */}
          <div className='space-y-2.5'>
            <div className='text-base font-semibold '>{t('productDetails')}</div>
            <div className='flex flex-col justify-start items-start'>
              <div className='py-2 grid grid-cols-[220px_1fr] gap-4'>
                <div className='text-[#d9d9de] text-sm '>{t('material')}</div>
                <div className='text-[#d9d9de] text-sm '>100% Cotton</div>
              </div>
              <div className='py-2 grid grid-cols-[220px_1fr] gap-4'>
                <div className='text-[#d9d9de] text-sm '>{t('style')}</div>
                <div className='text-[#d9d9de] text-sm '>{t('regular')}</div>
              </div>
              <div className='py-2 grid grid-cols-[220px_1fr] gap-4'>
                <div className='text-[#d9d9de] text-sm '>{t('origin')}</div>
                <div className='text-[#d9d9de] text-sm '>{t('vietnam')}</div>
              </div>
            </div>
          </div>
          <div className='space-y-2.5'>
            <div className='text-white text-base font-semibold '>{t('productDescription')}</div>
            <div
              className='text-sm text-Text-Default-text-secondary'
              dangerouslySetInnerHTML={{ __html: data.description }}></div>
          </div>
        </div>
      </div>
    </>
  )
}
