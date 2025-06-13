'use client'
import Mock from '@/assets/mock.png'
import { Button } from '@/components/ui/button'
import useEmblaCarousel from 'embla-carousel-react'
import { Minus, PlusIcon } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
export default function ProductPage() {
  return (
    <div className='py-8 px-4 md:px-6 space-y-6 max-w-[1400px] overflow-hidden mx-auto'>
      <div data-level='3' className='size- inline-flex justify-start items-center gap-2'>
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
      </div>
      <div className=' grid grid-cols-1 md:grid-cols-[minmax(0,min(50%,600px))_1fr] gap-8'>
        <ProductDetail />
      </div>
    </div>
  )
}
function ProductDetail() {
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  })

  const [quantity, setQuantity] = useState(1)

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
  return (
    <>
      <div className='space-y-4'>
        <div className='embla'>
          <div className='embla__viewport' ref={emblaMainRef}>
            <div className='embla__container'>
              {[...Array(10)].map((_, index) => {
                return (
                  <div className='embla__slide relative' key={index}>
                    <Image
                      src={Mock}
                      alt='Product'
                      width={700}
                      height={700}
                      className='w-full aspect-square object-contain'
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='embla-thumbs'>
          <div className='embla-thumbs__viewport' ref={emblaThumbsRef}>
            <div className='embla-thumbs__container'>
              {[...Array(10)].map((_, index) => (
                <div
                  className={'embla-thumbs__slide'.concat(
                    index === selectedIndex ? ' embla-thumbs__slide--selected' : ''
                  )}
                  key={index}
                  onClick={() => onThumbClick(index)}>
                  <Image
                    src={Mock}
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
            <div className='self-stretch justify-start text-white text-3xl font-medium'>
              Polo thể thao nam Promax Sideflow
            </div>
            <div className='self-stretch inline-flex justify-start items-center gap-1'>
              <div className='justify-start text-[#d9d9de] text-xl font-normal'>250.000 VNĐ</div>
            </div>
          </div>
          {['Size', 'Color'].map((key) => {
            const options =
              key === 'Size' ? ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'] : ['Red', 'Blue', 'Green', 'Black', 'White']
            return (
              <div key={key} className='space-y-3'>
                <div className='text-sm text-text-secondary capitalize'>{key}</div>
                <div className='flex gap-3 flex-wrap'>
                  {options.map((option, index) => (
                    <button
                      key={index}
                      className={`px-3 rounded-xs py-2.5 min-w-20 text-sm border capitalize font-medium`}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
          <div className='space-y-3'>
            <div className='text-sm text-text-secondary capitalize'>Quantity</div>
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
          <div className='text-sm text-Text-Default-text-secondary'>
            • Printed art on the front - all over design on Tie Dye look and feel <br />• Short Sleeve Tee <br />•
            Ribbed crew neckline <br />• Comfortable and lightweight <br />• Regular fit <br />• 100% Cotton <br />•
            Officially Licensed Lore Olympus Merchandise The models are wearing a mediumshort sleeve tee.
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <Button>Add to cart</Button>
            <Button>Buy now</Button>
          </div>
        </div>
      </div>
    </>
  )
}
