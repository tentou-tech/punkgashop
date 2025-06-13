import Image from "next/image";
import HeroBanner from '@/assets/hero-banner.png'
import Link from 'next/link'
export default function Home() {
  return (
    <main>
      <Image src={HeroBanner} alt='Hero Banner' width={2000} height={1000} className='w-full h-auto' />
      <div className='p-6 space-y-6'>
        <div>
          <h1 className='text-3xl font-bold'>All Collections</h1>
        </div>
        <div className='grid grid-cols-6 gap-6'>
          {[...Array(36)].map((_, index) => (
            <Collection key={index} />
          ))}
        </div>
      </div>
    </main>
  )
}
const Collection = () => {
  return (
    <Link href='/collection/summer-party' className='relative'>
      <div className='w-full aspect-square bg-gray-200'></div>
      <div className='self-stretch inline-flex flex-col justify-start items-start mt-4'>
        <div className='self-stretch justify-start text-white text-xl font-bold'>Bất tử collection</div>
        <div className='self-stretch inline-flex justify-start items-center gap-1'>
          <div className='justify-start text-[#9091a0] text-sm font-normal'>by</div>
          <div className='justify-start text-white text-sm font-normal'>Artist Name</div>
        </div>
      </div>
      <div className='self-stretch justify-start text-[#9091a0] text-sm font-normal mt-3 line-clamp-3'>
        Tứ Bất Tử | TiredCity x Simple.handxăm Bộ sưu tập &quot;Tứ Bất Tử&quot; khắc hoa hình anh bon vị Thanh bat tử
        trong tin ngưong dân gian Việt Nam. Họ là những vị Thánh sống mãi trong tâm thức của người ...
      </div>
    </Link>
  )
}