import type { Metadata } from 'next'

import { getProduct } from '@/service/product'
import { normalizeSlug } from '@/utils/normalized-slug'

import { Content } from './content'

interface Params {
  slug: string[]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params

  const { isEditing } = normalizeSlug(slug)

  return {
    title: isEditing ? 'Editar Produto' : 'Criar Produto',
  }
}

export default async function ProductCreateAndEditPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params

  const { isEditing, id } = normalizeSlug(slug)

  const product = id ? await getProduct({ id }) : null

  return (
    <>
      <Content isEditing={isEditing} />
    </>
  )
}
