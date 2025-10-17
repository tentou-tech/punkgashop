import HeroBanner from '@/assets/hero-banner.jpg'
import HeroBannerMobile from '@/assets/hero-banner-mobile.jpg'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import AllCollection from './components/all-collection'
import { useTranslations } from 'next-intl'
import Backdrop from '@/assets/backdrop.png'
// Product images imports
import anhMeoSau01 from '@/assets/product-images/anh_meo_sau_01.png'
import allenLamTruoc02 from '@/assets/product-images/allen_lam_truoc_02.png'
import buckyDukeTruoc02 from '@/assets/product-images/bucky_duke_truoc_02.png'
import aoSauTrang01 from '@/assets/product-images/ao_sau_trang_01.png'
import aoSauTrang1 from '@/assets/product-images/ao_sau_trang_1.png'
import banhRanTruoc02 from '@/assets/product-images/banh_ran_truoc_02.png'
import longXanhSau01 from '@/assets/product-images/long_xanh_sau_01.png'
import cuSanTruoc02 from '@/assets/product-images/cu_san_truoc_02.png'
import cuongSau01 from '@/assets/product-images/cuong_sau_01.png'
import doopleTruoc02 from '@/assets/product-images/doople_truoc_02.png'
import duongTruoc01 from '@/assets/product-images/duong_truoc_01.png'
import echTruoc02 from '@/assets/product-images/ech_truoc_02.png'
import echTruoc05 from '@/assets/product-images/ech_truoc_05.png'
import xamTruoc03 from '@/assets/product-images/xam_truoc_03.png'
import hcc01Sau from '@/assets/product-images/hcc_01_sau.png'
import hackSau01 from '@/assets/product-images/hack_sau_01.png'
import hungSau02 from '@/assets/product-images/hung_sau_02.png'
import iidSau01 from '@/assets/product-images/iid_sau_01.png'
import jokTruoc03 from '@/assets/product-images/jok_truoc_03.png'
import lamVuSau1 from '@/assets/product-images/lam_vu_sau_1.png'
import lcr25Sau03 from '@/assets/product-images/lcr25_sau_03.png'
import lamHoangTrucTruoc03 from '@/assets/product-images/lam_hoang_truc_truoc_03.png'
import linhRabTruoc01 from '@/assets/product-images/linh_rab_truoc_01.png'
import luciferTruoc02 from '@/assets/product-images/lucifer_truoc_02.png'
import mirolesWTruoc01 from '@/assets/product-images/miroles_w_truoc_01.png'
import moffiSau01 from '@/assets/product-images/moffi_sau_01.png'
import moniTruoc01 from '@/assets/product-images/moni_truoc_01.png'
import nachiTruoc02 from '@/assets/product-images/nachi_truoc_02.png'
import nguyenThanhToanTruoc03 from '@/assets/product-images/nguyen_thanh_toan_truoc_03.png'
import nheyiiSau03 from '@/assets/product-images/nheyii_sau_03.png'
import phatBearTruoc01 from '@/assets/product-images/phat_bear_truoc_01.png'
import phylloTruoc02 from '@/assets/product-images/phyllo_truoc_02.png'
import ruoiTruoc04 from '@/assets/product-images/ruoi_truoc_04.png'
import sdpTruoc02 from '@/assets/product-images/sdp_truoc_02.png'
import sauSau04 from '@/assets/product-images/sau_sau_04.png'
import sherloxTruoc03 from '@/assets/product-images/sherlox_truoc_03.png'
import skyfishTruoc02 from '@/assets/product-images/skyfish_truoc_02.png'
import tiniTruoc01 from '@/assets/product-images/tini_truoc_01.png'
import tomoSau01 from '@/assets/product-images/tomo_sau_01.png'
import vuSau03 from '@/assets/product-images/vu_sau_03.png'
import xaviaNgTruoc03 from '@/assets/product-images/xavia_ng_truoc_03.png'
import yattaDTruoc02 from '@/assets/product-images/yatta_d_truoc_02.png'
import yuukoTruoc02 from '@/assets/product-images/yuuko_truoc_02.png'
import chuonTruoc01 from '@/assets/product-images/chuon_truoc_01.png'
import dbTruoc02 from '@/assets/product-images/db_truoc_02.png'
import Link from 'next/link'

export default function Home() {
  const t = useTranslations('home')

  // All 45 product images
  const allProductImages = [
    anhMeoSau01,
    allenLamTruoc02,
    buckyDukeTruoc02,
    aoSauTrang01,
    aoSauTrang1,
    banhRanTruoc02,
    longXanhSau01,
    cuSanTruoc02,
    cuongSau01,
    doopleTruoc02,
    duongTruoc01,
    echTruoc02,
    echTruoc05,
    xamTruoc03,
    hcc01Sau,
    hackSau01,
    hungSau02,
    iidSau01,
    jokTruoc03,
    lamVuSau1,
    lcr25Sau03,
    lamHoangTrucTruoc03,
    linhRabTruoc01,
    luciferTruoc02,
    mirolesWTruoc01,
    moffiSau01,
    moniTruoc01,
    nachiTruoc02,
    nguyenThanhToanTruoc03,
    nheyiiSau03,
    phatBearTruoc01,
    phylloTruoc02,
    ruoiTruoc04,
    sdpTruoc02,
    sauSau04,
    sherloxTruoc03,
    skyfishTruoc02,
    tiniTruoc01,
    tomoSau01,
    vuSau03,
    xaviaNgTruoc03,
    yattaDTruoc02,
    yuukoTruoc02,
    chuonTruoc01,
    dbTruoc02,
  ]

  // Function to shuffle array and select first n elements
  const getRandomImages = (images: any[], count: number) => {
    const shuffled = [...images].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }

  // Divide into 3 groups of 15 images each
  const group1 = allProductImages.slice(0, 15)
  const group2 = allProductImages.slice(15, 30)
  const group3 = allProductImages.slice(30, 45)

  // Randomly select 9 images from each group
  const column1Images = getRandomImages(group1, 9)
  const column2Images = getRandomImages(group2, 9)
  const column3Images = getRandomImages(group3, 9)

  return (
    <main>
      <Image src={HeroBanner} alt='Hero Banner' width={2000} height={1000} className='w-full h-auto hidden lg:block' />
      <Image
        src={HeroBannerMobile}
        alt='Hero Banner'
        width={2000}
        height={1000}
        className='w-full h-auto block lg:hidden'
      />
      <div className='grid grid-cols-1 md:grid-cols-2 bg-black relative'>
        <Image src={Backdrop} alt='Background' fill className='object-cover opacity-20' />
        <div className='flex justify-center flex-col gap-2 px-6 py-8 md:py-0 md:pl-[10%] lg:pl-[20%] relative z-10'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-full max-w-[300px] md:max-w-[350px] lg:max-w-[420px] h-auto pb-2'
            viewBox='0 0 420 49'
            fill='none'>
            <path
              d='M400.221 11.5769C398.945 11.5769 397.91 12.6144 397.91 13.8941V18.0017C397.91 18.6163 398.154 19.2057 398.587 19.6402L401.329 22.3905C402.785 23.8502 405.273 22.8164 405.273 20.752V13.8941C405.273 12.6144 404.239 11.5769 402.963 11.5769H400.221ZM406.907 39.4769C406.005 40.3818 404.542 40.3818 403.64 39.4769L401.854 37.6864C400.399 36.2267 397.91 37.2605 397.91 39.3249V46.1828C397.91 47.4626 396.876 48.5 395.6 48.5H385.494C384.218 48.5 383.184 47.4626 383.184 46.1828V2.81717C383.184 1.53743 384.218 0.5 385.494 0.5H417.69C418.966 0.5 420 1.53743 420 2.81717V25.3864C420 26.0009 419.757 26.5903 419.323 27.0248L406.907 39.4769Z'
              fill='white'
            />
            <path
              d='M357.412 35.1059C357.412 36.3856 358.447 37.4231 359.723 37.4231H362.465C363.741 37.4231 364.776 36.3856 364.776 35.1059V13.8941C364.776 12.6144 363.741 11.5769 362.465 11.5769H359.723C358.447 11.5769 357.412 12.6144 357.412 13.8941V35.1059ZM344.996 48.5C343.72 48.5 342.686 47.4626 342.686 46.1828V2.81717C342.686 1.53743 343.72 0.5 344.996 0.5H377.192C378.468 0.5 379.502 1.53743 379.502 2.81717V46.1828C379.502 47.4626 378.468 48.5 377.192 48.5H344.996Z'
              fill='white'
            />
            <path
              d='M316.915 17.0597C316.915 19.1241 319.403 20.1579 320.859 18.6982L323.601 15.9479C324.034 15.5134 324.278 14.924 324.278 14.3094V2.81717C324.278 1.53744 325.312 0.5 326.588 0.5H336.694C337.97 0.5 339.004 1.53743 339.004 2.81717V46.1828C339.004 47.4626 337.97 48.5 336.694 48.5H326.588C325.312 48.5 324.278 47.4626 324.278 46.1828V35.6326C324.278 33.5682 321.789 32.5344 320.334 33.9941L317.591 36.7444C317.158 37.1789 316.915 37.7683 316.915 38.3829V46.1828C316.915 47.4626 315.88 48.5 314.604 48.5H304.499C303.223 48.5 302.188 47.4626 302.188 46.1828V2.81717C302.188 1.53743 303.223 0.5 304.499 0.5H314.604C315.88 0.5 316.915 1.53743 316.915 2.81717V17.0597Z'
              fill='white'
            />
            <path
              d='M283.78 13.4231C283.78 12.4035 282.956 11.5769 281.939 11.5769H278.727C277.451 11.5769 276.417 12.6144 276.417 13.8941V16.6444C276.417 17.9241 277.451 18.9615 278.727 18.9615H296.196C297.472 18.9615 298.506 19.999 298.506 21.2787V46.1828C298.506 47.4626 297.472 48.5 296.196 48.5H264C262.724 48.5 261.69 47.4626 261.69 46.1828V36.0479C261.69 34.7682 262.724 33.7308 264 33.7308H274.576C275.592 33.7308 276.417 34.5573 276.417 35.5769C276.417 36.5965 277.241 37.4231 278.257 37.4231H281.469C282.745 37.4231 283.78 36.3856 283.78 35.1059V32.3556C283.78 31.0759 282.745 30.0385 281.469 30.0385H264C262.724 30.0385 261.69 29.001 261.69 27.7213V2.81717C261.69 1.53744 262.724 0.5 264 0.5H296.196C297.472 0.5 298.506 1.53743 298.506 2.81717V12.9521C298.506 14.2318 297.472 15.2692 296.196 15.2692H285.621C284.604 15.2692 283.78 14.4427 283.78 13.4231Z'
              fill='white'
            />
            <path
              d='M221.16 41.3787C219.705 39.919 217.216 40.9528 217.216 43.0172V46.1828C217.216 47.4626 216.182 48.5 214.906 48.5H204.8C203.524 48.5 202.49 47.4626 202.49 46.1828V2.81717C202.49 1.53743 203.524 0.5 204.8 0.5H227.304C227.917 0.5 228.504 0.74413 228.938 1.17868L238.629 10.8982C239.062 11.3328 239.306 11.9222 239.306 12.5367V46.1828C239.306 47.4626 238.271 48.5 236.995 48.5H226.89C225.614 48.5 224.579 47.4626 224.579 46.1828V45.7675C224.579 45.1529 224.336 44.5636 223.903 44.129L221.16 41.3787ZM220.635 26.0828C222.091 27.5425 224.579 26.5087 224.579 24.4443V19.9213C224.579 19.3068 224.336 18.7174 223.903 18.2829L221.16 15.5326C219.705 14.0728 217.216 15.1067 217.216 17.1711V21.694C217.216 22.3086 217.46 22.898 217.893 23.3325L220.635 26.0828Z'
              fill='white'
            />
            <path
              d='M180.137 33.4674C181.593 34.9272 184.081 33.8933 184.081 31.8289V28.6633C184.081 27.3836 185.116 26.3462 186.392 26.3462H196.497C197.773 26.3462 198.808 27.3836 198.808 28.6633V46.1828C198.808 47.4626 197.773 48.5 196.497 48.5H173.993C173.381 48.5 172.793 48.2559 172.36 47.8213L162.668 38.1018C162.235 37.6672 161.992 37.0778 161.992 36.4633V2.81717C161.992 1.53743 163.026 0.5 164.302 0.5H196.497C197.773 0.5 198.808 1.53743 198.808 2.81717V9.25975C198.808 10.5395 197.773 11.5769 196.497 11.5769H179.028C177.752 11.5769 176.718 12.6144 176.718 13.8941V29.0787C176.718 29.6932 176.961 30.2826 177.395 30.7171L180.137 33.4674Z'
              fill='white'
            />
            <path
              d='M143.583 2.81717C143.583 1.53744 144.618 0.5 145.894 0.5H155.999C157.276 0.5 158.31 1.53743 158.31 2.81717V25.3864C158.31 26.0009 158.067 26.5903 157.633 27.0248L152.58 32.0923C151.678 32.9972 151.678 34.4643 152.58 35.3693L157.633 40.4367C158.067 40.8713 158.31 41.4606 158.31 42.0752V46.1828C158.31 47.4626 157.276 48.5 155.999 48.5H145.894C144.618 48.5 143.583 47.4626 143.583 46.1828V45.7675C143.583 45.1529 143.34 44.5636 142.907 44.129L140.164 41.3787C138.709 39.919 136.22 40.9528 136.22 43.0172V46.1828C136.22 47.4626 135.186 48.5 133.91 48.5H123.804C122.528 48.5 121.494 47.4626 121.494 46.1828V2.81717C121.494 1.53743 122.528 0.5 123.804 0.5H133.91C135.186 0.5 136.22 1.53743 136.22 2.81717V21.694C136.22 22.3086 136.464 22.898 136.897 23.3325L139.639 26.0828C141.095 27.5425 143.583 26.5087 143.583 24.4443V2.81717Z'
              fill='white'
            />
            <path
              d='M117.135 10.8982C117.569 11.3328 117.812 11.9222 117.812 12.5367V46.1828C117.812 47.4626 116.778 48.5 115.502 48.5H105.396C104.12 48.5 103.086 47.4626 103.086 46.1828V19.9213C103.086 19.3068 102.842 18.7174 102.409 18.2829L99.6666 15.5326C98.2111 14.0728 95.7224 15.1067 95.7224 17.1711V46.1828C95.7224 47.4626 94.688 48.5 93.4119 48.5H83.3064C82.0303 48.5 80.9959 47.4626 80.9959 46.1828V2.81717C80.9959 1.53743 82.0303 0.5 83.3064 0.5H105.81C106.423 0.5 107.011 0.74413 107.444 1.17868L117.135 10.8982Z'
              fill='white'
            />
            <path
              d='M41.1745 38.1018C40.7412 37.6672 40.4978 37.0778 40.4978 36.4633V2.81717C40.4978 1.53743 41.5322 0.5 42.8083 0.5H52.9138C54.1899 0.5 55.2243 1.53743 55.2243 2.81717V29.0787C55.2243 29.6932 55.4677 30.2826 55.901 30.7171L58.6434 33.4674C60.0989 34.9272 62.5876 33.8933 62.5876 31.8289V2.81717C62.5876 1.53743 63.622 0.5 64.898 0.5H75.0036C76.2796 0.5 77.3141 1.53743 77.3141 2.81717V46.1828C77.3141 47.4626 76.2796 48.5 75.0036 48.5H52.4997C51.8869 48.5 51.2993 48.2559 50.866 47.8213L41.1745 38.1018Z'
              fill='white'
            />
            <path
              d='M17.037 11.5769C15.7609 11.5769 14.7265 12.6144 14.7265 13.8941V18.0017C14.7265 18.6163 14.9699 19.2057 15.4032 19.6402L18.1455 22.3905C19.6011 23.8502 22.0898 22.8164 22.0898 20.752V13.8941C22.0898 12.6144 21.0553 11.5769 19.7793 11.5769H17.037ZM23.7235 39.4769C22.8212 40.3818 21.3583 40.3818 20.456 39.4769L18.6707 37.6864C17.2152 36.2267 14.7265 37.2605 14.7265 39.3249V46.1828C14.7265 47.4626 13.6921 48.5 12.416 48.5H2.31047C1.03444 48.5 0 47.4626 0 46.1828V2.81717C0 1.53743 1.03443 0.5 2.31047 0.5H34.5058C35.7818 0.5 36.8163 1.53743 36.8163 2.81717V25.3864C36.8163 26.0009 36.5728 26.5903 36.1396 27.0248L23.7235 39.4769Z'
              fill='white'
            />
          </svg>
          <h1 className='hidden'>Punkga Shop</h1>
          <div className='text-Text-Default-text-secondary mt-3 sm:text-lg md:text-xl lg:text-2xl font-bold'>
            <h2 className='w-full max-w-[315px]'>{t('exclusiveCollection')}</h2>
            <h2 className='mt-3 block w-full max-w-[350px]'>{t('punkgaShopMission')}</h2>
          </div>
          <Button className='w-fit mt-4 sm:mt-6 text-sm sm:text-base' asChild>
            <Link href='#collections'>{t('preOrderNow')}</Link>
          </Button>
        </div>
        <div className='w-full aspect-square sm:h-[400px] md:h-[500px] lg:h-[632px] pr-0 md:pr-5 overflow-hidden relative z-10'>
          <div className='grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 aspect-square ml-auto h-full'>
            {/* First column - moves up */}
            <div className='relative h-full'>
              <div className='flex flex-col gap-2 sm:gap-3 md:gap-4 animate-moveUp absolute w-full'>
                {column1Images.map((image, index) => (
                  <div key={`col1-${index}`} className='aspect-square w-full bg-gray-200'>
                    <Image
                      src={image}
                      alt='decoration'
                      width={2000}
                      height={2000}
                      className='w-full h-full object-cover'
                    />
                  </div>
                ))}
                {/* Duplicate squares for seamless animation */}
                {column1Images.map((image, index) => (
                  <div key={`col1-dup-${index}`} className='aspect-square w-full bg-gray-200'>
                    <Image
                      src={image}
                      alt='decoration'
                      width={2000}
                      height={2000}
                      className='w-full h-full object-cover'
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Second column - moves down */}
            <div className='relative h-full'>
              <div className='flex flex-col gap-2 sm:gap-3 md:gap-4 animate-moveDown absolute w-full'>
                {column2Images.map((image, index) => (
                  <div key={`col2-${index}`} className='aspect-square w-full bg-gray-200'>
                    <Image
                      src={image}
                      alt='decoration'
                      width={2000}
                      height={2000}
                      className='w-full h-full object-cover'
                    />
                  </div>
                ))}
                {/* Duplicate squares for seamless animation */}
                {column2Images.map((image, index) => (
                  <div key={`col2-dup-${index}`} className='aspect-square w-full bg-gray-200'>
                    <Image
                      src={image}
                      alt='decoration'
                      width={2000}
                      height={2000}
                      className='w-full h-full object-cover'
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Third column - moves up */}
            <div className='relative h-full'>
              <div className='flex flex-col gap-2 sm:gap-3 md:gap-4 animate-moveUp absolute w-full'>
                {column3Images.map((image, index) => (
                  <div key={`col3-${index}`} className='aspect-square w-full bg-gray-200'>
                    <Image
                      src={image}
                      alt='decoration'
                      width={2000}
                      height={2000}
                      className='w-full h-full object-cover'
                    />
                  </div>
                ))}
                {/* Duplicate squares for seamless animation */}
                {column3Images.map((image, index) => (
                  <div key={`col3-dup-${index}`} className='aspect-square w-full bg-gray-200'>
                    <Image
                      src={image}
                      alt='decoration'
                      width={2000}
                      height={2000}
                      className='w-full h-full object-cover'
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <AllCollection />
    </main>
  )
}
