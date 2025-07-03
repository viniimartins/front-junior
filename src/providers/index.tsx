'use client'

import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { type PropsWithChildren } from 'react'

import { NextAuthProvider } from './next-auth'
import { ThemeProvider } from './theme'

export function Providers({ children }: PropsWithChildren) {
  return (
    <NextAuthProvider>
      <HeroUIProvider>
        <ThemeProvider>
          <ToastProvider />
          {children}
        </ThemeProvider>
      </HeroUIProvider>
    </NextAuthProvider>
  )
}
