'use client'
import Logo from '@/assets/Logo_bnw.svg'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { Input } from './ui/input'

export default function Footer() {
  return (
    <footer className='pt-8 px-6 bg-Surface-Background-bg-primary'>
      <div className='flex justify-between border-b-[1px] flex-col gap-5 md:flex-row pb-8 border-Border-border-primary'>
        <Link href='/' className=''>
          <Image src={Logo} alt='footer logo' className='h-[60px] w-auto' />
        </Link>
        <div className=''>
          <div className='text-xs leading-[18px] font-medium text-Text-Default-text-secondary flex items-start mb-1.5'>
            Subscribe to get fresh news update
          </div>
          <div className='flex w-full items-center'>
            <Input
              type='email'
              placeholder='Email'
              className='w-72 !text-sm px-3.5  py-2.5 placeholder:text-Text-Disabled-text-disabled border-none bg-Surface-Background-bg-secondary rounded-r-none'
            />
            <Button
              type='submit'
              className='rounded-l-none py-2.5 px-6 text-sm font-semibold bg-Surface-Background-bg-brand-priamry text-Text-Default-On-white-text-primary'>
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      <div className='flex justify-between py-5 flex-col md:flex-row items-center gap-5'>
        <div className='items-center gap-4 flex'>
          <Link className='cursor-pointer' target='_blank' href='https://www.facebook.com/PunkgaMeManga/'>
            <svg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <circle cx='12.5' cy='12' r='9' fill='#F6F6F6' />
              <path
                d='M15.1069 14.3738L15.4178 11.6796H13.4726V9.93204C13.4726 9.1948 13.7438 8.47573 14.6151 8.47573H15.5V6.18204C15.5 6.18204 14.6973 6 13.9301 6C12.3274 6 11.2808 7.29064 11.2808 9.62621V11.6796H9.5V14.3738H11.2808V20.8871C11.6384 20.9618 12.0041 21 12.3767 21C12.7493 21 13.1151 20.9618 13.4726 20.8871V14.3738H15.1069Z'
                fill='#0B0B0B'
              />
            </svg>
          </Link>
          <Link className='cursor-pointer' target='_blank' href='https://twitter.com/PunkgaMeManga'>
            <svg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M3.5416 4L10.1418 12.8249L3.5 20H4.99492L10.8099 13.718L15.5081 20H20.595L13.6233 10.6788L19.8055 4H18.3106L12.9555 9.78545L8.6285 4H3.5416ZM5.73994 5.10103H8.07684L18.3964 18.899H16.0595L5.73994 5.10103Z'
                fill='#F6F6F6'
              />
            </svg>
          </Link>
          <Link className='cursor-pointer' target='_blank' href='https://www.youtube.com/@AppPunkgaMe'>
            <svg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M2.18338 7.45583C2.27978 5.97175 3.47296 4.80867 4.95835 4.73508C7.10929 4.62852 10.1836 4.5 12.5 4.5C14.8164 4.5 17.8907 4.62852 20.0417 4.73508C21.527 4.80867 22.7202 5.97175 22.8166 7.45583C22.909 8.8777 23 10.6272 23 12C23 13.3728 22.909 15.1223 22.8166 16.5442C22.7202 18.0283 21.527 19.1913 20.0417 19.2649C17.8907 19.3715 14.8164 19.5 12.5 19.5C10.1836 19.5 7.10929 19.3715 4.95835 19.2649C3.47296 19.1913 2.27978 18.0283 2.18338 16.5442C2.09102 15.1223 2 13.3728 2 12C2 10.6272 2.09102 8.87769 2.18338 7.45583Z'
                fill='#F6F6F6'
              />
              <path d='M10.25 9V15L16.25 12L10.25 9Z' fill='#0B0B0B' />
            </svg>
          </Link>
        </div>
        <div className='text-Text-Default-text-tertiary text-sm opacity-60'>
          {`© ${new Date().getFullYear()} Punkga.me . All rights reserved.`}
        </div>
      </div>
    </footer>
  )
}
