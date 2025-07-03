'use client'

import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { type PropsWithChildren } from 'react'

import { NextAuthProvider } from './next-auth'
import { ReactQueryProvider } from './react-query'
import { ThemeProvider } from './theme'

export function Providers({ children }: PropsWithChildren) {
  return (
    <NextAuthProvider>
      <HeroUIProvider>
        <ReactQueryProvider>
          <ThemeProvider>
            <ToastProvider />
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
      </HeroUIProvider>
    </NextAuthProvider>
  )
}
