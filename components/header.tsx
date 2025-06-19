'use client'
import Logo from '@/assets/Logo.svg'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { useState } from 'react'
import { useCart } from '@/provider/cart'
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { items } = useCart()
  return (
    <header className='sticky top-0 z-50 border-b border-Border-border-teriary bg-Surface-Background-bg-body px-6 py-4 flex items-center justify-between'>
      <div className='flex items-center gap-10'>
        <Link href='/'>
          <Image src={Logo} alt='Logo' width={100} height={100} className='h-9 w-auto' />
        </Link>
        {/* Desktop Navigation - Hidden on mobile */}
        <div className='hidden md:block'>
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
      </div>
      <div className='flex gap-6 items-center'>
        <Link href='/cart' className='relative'>
          <ShoppingBag className='w-6 h-6' />
          <div className='absolute rounded-full -bottom-1 -right-1 w-4 h-4 flex items-center justify-center bg-Components-Utility-red-utility-red border-2 border-Border-border-teriary text-[10px] text-white'>
            {items.reduce((total, item) => total + item.quantity, 0)}
          </div>
        </Link>
        <Search className='w-6 h-6' />
        <Button className='hidden md:flex'>Login</Button>
        {/* Mobile Menu Button - Only visible on mobile */}
        <button className='md:hidden flex items-center justify-center' onClick={() => setMobileMenuOpen(true)}>
          <Menu className='w-6 h-6' />
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden'>
          <div className='fixed inset-y-0 right-0 w-full max-w-xs bg-Surface-Background-bg-body shadow-lg p-6 flex flex-col'>
            <div className='flex items-center justify-between mb-8'>
              <Link href='/' onClick={() => setMobileMenuOpen(false)}>
                <Image src={Logo} alt='Logo' width={100} height={100} className='h-9 w-auto' />
              </Link>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className='w-6 h-6' />
              </button>
            </div>

            <nav className='flex flex-col space-y-6'>
              <Link href='/special-releases' className='text-lg font-medium' onClick={() => setMobileMenuOpen(false)}>
                Special Releases
              </Link>
              <Link href='/series' className='text-lg font-medium' onClick={() => setMobileMenuOpen(false)}>
                Series
              </Link>
              <Link href='/apparel' className='text-lg font-medium' onClick={() => setMobileMenuOpen(false)}>
                Apparel
              </Link>
              <Link href='/accessories' className='text-lg font-medium' onClick={() => setMobileMenuOpen(false)}>
                Accessories
              </Link>
            </nav>

            <div className='mt-auto'>
              <Button className='w-full mt-6' onClick={() => setMobileMenuOpen(false)}>
                Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
