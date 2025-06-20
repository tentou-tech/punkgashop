'use client'
import { getCollections } from '@/services/shop'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import useSWR from 'swr'
export default function AllCollection() {
  const { data } = useSWR('/collections', getCollections)
  console.log(data)
  return (
    <div className='p-4 md:p-6 space-y-4 md:space-y-6'>
      <div>
        <h1 className='text-2xl md:text-3xl font-bold'>All Collections</h1>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6'>
        {data?.map((collection, index) => (
          <Link key={index} href={`/collection/${collection.id}`} className='relative'>
            <div className='w-full aspect-square '>
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${collection.thumbnail}`}
                alt='Mock 2'
                width={500}
                height={500}
                className='w-full h-full object-cover'
              />
            </div>
            <div className='self-stretch inline-flex flex-col justify-start items-start mt-2 md:mt-4'>
              <div className='self-stretch justify-start text-white text-base md:text-xl font-bold'>
                {collection.name}
              </div>
              <div className='self-stretch inline-flex justify-start items-center gap-1'>
                <div className='justify-start text-[#9091a0] text-xs md:text-sm font-normal'>by</div>
                <div className='justify-start text-white text-xs md:text-sm font-normal'>{collection.creator.name}</div>
              </div>
            </div>
            <div className='self-stretch justify-start text-[#9091a0] text-xs md:text-sm font-normal mt-2 md:mt-3 line-clamp-2 md:line-clamp-3'>
              {collection.description}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
