import { addToast } from '@heroui/react'
import { useMutation } from '@tanstack/react-query'

import type { WithoutEntityBaseProperties } from '@/helpers/without-entity-base-properties'
import type { IProduct } from '@/hooks/query/products/types'
import { api } from '@/service/api'

type ProductUpdate = Omit<
  WithoutEntityBaseProperties<IProduct>,
  'thumbnail'
> & {
  thumbnail: File | null
}
interface Params {
  id: IProduct['id']
  product: ProductUpdate
}

async function post({ product, id }: Params) {
  const formData = new FormData()

  if (product.thumbnail) {
    formData.append('thumbnail', product.thumbnail)
  }

  formData.append('title', product.title)
  formData.append('description', product.description)

  const { data } = await api.put(`/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return data
}

export function useUpdateProduct() {
  return useMutation({
    mutationKey: ['update-product'],
    mutationFn: post,
    onSuccess: () => {
      addToast({
        title: 'Produto editado com sucesso',
      })
    },
    onError: () => {
      addToast({
        title: 'Erro ao editar o produto',
      })
    },
  })
}
