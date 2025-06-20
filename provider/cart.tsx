'use client'

import { CartItem, ProductDetail } from '@/models/shop'
import { createContext, ReactNode, useContext, useState } from 'react'
import { toast } from 'sonner'
import { useLocalStorage } from 'usehooks-ts'
import { v4 as uuid } from 'uuid'
type CartContextType = {
  items: CartItem[]
  addItem: (
    item: ProductDetail,
    quantity: number,
    option: ProductDetail['product_options'][number] & {
      subOptions: {
        key: string
        value: string
      }[]
    }
  ) => void
  removeItem: (internalId: string) => void
  updateQuantity: (internalId: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  totalPrice: number
  isInCart: (internalId: string) => boolean
  checkoutItems: CartItem[]
  setCheckoutItems: (items: CartItem[]) => void
  showCartDrawer: boolean
  setShowCartDrawer: (show: boolean) => void
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  itemCount: 0,
  totalPrice: 0,
  isInCart: () => false,
  checkoutItems: [],
  setCheckoutItems: () => {},
  showCartDrawer: false,
  setShowCartDrawer: () => {},
})

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>('cart', [])
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([])
  const [showCartDrawer, setShowCartDrawer] = useState(false)

  // Add item to cart
  const addItem = (
    item: ProductDetail,
    quantity: number,
    option: ProductDetail['product_options'][number] & {
      subOptions: {
        key: string
        value: string
      }[]
    }
  ) => {
    try {
      setItems((prevItems) => {
        const existingItemIndex = prevItems.findIndex(
          (i) =>
            i.product.id === item.id &&
            i.option.id === option.id &&
            i.option.subOptions.every((subOption) =>
              option.subOptions.some(
                (optionSubOption) => optionSubOption.key === subOption.key && optionSubOption.value === subOption.value
              )
            )
        )
        if (existingItemIndex >= 0) {
          const updatedItems = [...prevItems]
          updatedItems[existingItemIndex].quantity += quantity
          return updatedItems
        } else {
          return [...prevItems, { product: item, quantity, option, internalId: uuid() }]
        }
      })
      toast.success(`${item.name} added to cart`)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  // Remove item from cart
  const removeItem = (internalId: string) => {
    setItems((prevItems) => {
      const newItems = prevItems.filter((i) => i.internalId !== internalId)
      return newItems
    })
  }

  // Update item quantity
  const updateQuantity = (internalId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(internalId)
      return
    }

    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) => (item.internalId === internalId ? { ...item, quantity } : item))
      return updatedItems
    })
  }

  // Clear entire cart
  const clearCart = () => {
    setItems([])
    toast.info('Cart cleared')
  }

  // Calculate total number of items
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  // Calculate total price
  const totalPrice = items.reduce((total, item) => total + item.option.price * item.quantity, 0)

  // Check if item is in cart
  const isInCart = (internalId: string) => items.some((item) => item.internalId === internalId)

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    totalPrice,
    isInCart,
    checkoutItems,
    setCheckoutItems,
    showCartDrawer,
    setShowCartDrawer,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
