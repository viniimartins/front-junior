import { Button } from '@heroui/react'
import Link from 'next/link'

export default function PamelPage() {
  return (
    <div>
      <Link href="/products">
        <Button>Acessar meus Produtos</Button>
      </Link>
    </div>
  )
}
