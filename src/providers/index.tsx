'use client'

import { HeroUIProvider } from '@heroui/react'
import { type PropsWithChildren } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: PropsWithChildren) {
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  )
}
