import Logo from '@/assets/Logo.svg'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Search, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
export default function Header() {
  return (
    <header className='sticky top-0 z-50 border-b border-Border-border-teriary bg-Surface-Background-bg-body px-6 py-4 flex items-center justify-between'>
      <div className='flex items-center gap-10'>
        <Image src={Logo} alt='Logo' width={100} height={100} className='h-9 w-auto' />
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href='/special-releases'>Special Releases</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Series</NavigationMenuTrigger>
              <NavigationMenuContent className=''>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Apparel</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Accessories</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className='flex gap-6 items-center'>
        <div className='relative'>
          <ShoppingBag className='w-6 h-6' />
          <div className='absolute rounded-full -bottom-1 -right-1 w-4 h-4 flex items-center justify-center bg-Components-Utility-red-utility-red border-2 border-Border-border-teriary text-[10px] text-white'>
            1
          </div>
        </div>
        <Search className='w-6 h-6' />
        <Button>Login</Button>
      </div>
    </header>
  )
}
