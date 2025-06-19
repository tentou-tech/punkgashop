// context/index.tsx
'use client'

import { type ReactNode } from 'react'
import RootProvider from './root'

function ContextProvider({ children }: { children: ReactNode }) {
  return <RootProvider>{children}</RootProvider>
}

export default ContextProvider
