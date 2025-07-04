import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: {
    template: `Stockly | %s`,
    default: 'Painel',
  },
  description: 'Diga adeus à bagunça no estoque com o Stockly.',
}

export default function AppLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />

      <section className="mt-20 flex h-auto w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-6">
        {children}
      </section>
    </main>
  )
}
