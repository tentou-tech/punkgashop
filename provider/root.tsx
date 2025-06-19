'use client'
import { createContext, useCallback, useEffect, useState } from 'react'
import { CartProvider } from './cart'
export const RootContext = createContext({})

export default function RootProvider({ children }: { children: React.ReactNode }) {
  const [initializing, setInitializing] = useState(true)
  const init = useCallback(async () => {
    setInitializing(false)
  }, [])

  useEffect(() => {
    init()
  }, [init])

  if (initializing) return <></>

  return (
    <RootContext.Provider value={{}}>
      <CartProvider>{children}</CartProvider>
    </RootContext.Provider>
  )
}
