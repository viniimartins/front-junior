'use client'

import { HeroUIProvider } from '@heroui/react'
import { type PropsWithChildren } from 'react'

export function Providers({ children }: PropsWithChildren) {
  return <HeroUIProvider>{children}</HeroUIProvider>
}
