import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'

import { LoadingSpinner } from '@/components/loading-spinner'

import { FormLogin } from './form'

export const metadata: Metadata = {
  title: 'Login',
}

export default function Login() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-center text-3xl font-bold">Stockly</h1>
        <span className="text-muted-foreground text-sm">
          Com o Stockly, organizar seus produtos nunca foi tão fácil.
        </span>
      </div>
      <div className="mx-auto w-full max-w-md">
        <Suspense fallback={<LoadingSpinner />}>
          <FormLogin />
        </Suspense>
        <div className="mt-4 text-center text-sm">
          <Link href="/nova-conta" className="underline">
            Nova Conta
          </Link>
        </div>
      </div>
    </>
  )
}
