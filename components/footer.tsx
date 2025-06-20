'use client'
import Logo from '@/assets/Logo_bnw.svg'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import BadgeBCT from '@/assets/bct.png'
import { useTranslations } from 'next-intl'
export default function Footer() {
  const t = useTranslations('footer')
  return (
    <footer className='pt-8 px-6 bg-Surface-Background-bg-primary'>
      <div className='flex justify-between flex-col gap-5 md:flex-row pb-8 '>
        <Link href='/' className=''>
          <Image src={Logo} alt='footer logo' className='h-[60px] w-auto' />
        </Link>
        <div className='flex gap-20 items-start'>
          <div className='inline-flex flex-col justify-center items-start gap-2'>
            <div className='self-stretch pb-4 inline-flex justify-start items-start'>
              <div className='justify-center text-white text-base font-semibold '>{t('privacy')}</div>
            </div>
            <Link href='/term-of-service' className='self-stretch justify-center text-[#9091a0] text-sm font-normal '>
              {t('termOfService')}
            </Link>
            <Link href='/privacy-policy' className='self-stretch justify-center text-[#9091a0] text-sm font-normal '>
              {t('privacyPolicy')}
            </Link>
            <Link href='/payment-policy' className='self-stretch justify-center text-[#9091a0] text-sm font-normal '>
              {t('paymentPolicy')}
            </Link>
            <Link href='/shipping-policy' className='self-stretch justify-center text-[#9091a0] text-sm font-normal '>
              {t('shippingPolicy')}
            </Link>
          </div>
          <div>
            <Image src={BadgeBCT} alt='badge bct' className='w-[150px] h-auto' />
          </div>
        </div>
      </div>
      <div className='text-Text-Default-text-tertiary text-sm opacity-60 w-full text-center my-5'>
        {`© ${new Date().getFullYear()} Punkga.me . ${t('allRightsReserved')}`}
      </div>
    </footer>
  )
}
