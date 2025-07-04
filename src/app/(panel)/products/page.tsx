import type { Metadata } from 'next'

import { Content } from './content'

export const metadata: Metadata = {
  title: 'Produtos',
}

export default function ProductsPag() {
  return <Content />
}
