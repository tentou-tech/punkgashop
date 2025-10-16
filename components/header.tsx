'use client'
import Logo from '@/assets/Logo.svg'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { useCart } from '@/provider/cart'
import { Check, ChevronDown, Globe, ShoppingBag } from 'lucide-react'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from './ui/navigation-menu'

function LanguageSwitcher({ currentLocale, pathname }: { currentLocale: string; pathname: string }) {
  const router = useRouter()

  const switchLanguage = (locale: string) => {
    router.replace(pathname, { locale })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex items-center gap-2 px-3 py-2 rounded-md border'>
        <Globe className='h-4 w-4' />
        <span className='uppercase text-xs'>{currentLocale}</span>
        <ChevronDown className='h-3 w-3 opacity-50' />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => switchLanguage('en')} className='flex items-center justify-between'>
          <span>English</span>
          {currentLocale === 'en' && <Check className='h-4 w-4 ml-2' />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage('vi')} className='flex items-center justify-between'>
          <span>Tiếng Việt</span>
          {currentLocale === 'vi' && <Check className='h-4 w-4 ml-2' />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function Header() {
  const { items } = useCart()
  const pathname = usePathname()
  const locale = useLocale()
  return (
    <header className='sticky top-0 z-50 border-b border-Border-border-teriary bg-Surface-Background-bg-body px-6 py-4 flex items-center justify-between'>
      <div className='flex items-center gap-4 md:gap-10'>
        <Link href='/'>
          <Image src={Logo} alt='Logo' width={100} height={100} className='h-9 w-auto' />
        </Link>
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href='https://app.punkga.me/' target='_blank'>
                  Manga
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className='flex gap-6 items-center'>
        <Link href='/cart' className='relative'>
          <ShoppingBag className='w-6 h-6' />
          <div className='absolute rounded-full -bottom-1 -right-1 w-4 h-4 flex items-center justify-center bg-Components-Utility-red-utility-red border-2 border-Border-border-teriary text-[10px] text-white'>
            {items.reduce((total, item) => total + item.quantity, 0)}
          </div>
        </Link>
        <div className=''>
          <LanguageSwitcher currentLocale={locale} pathname={pathname} />
        </div>
      </div>
    </header>
  )
}
