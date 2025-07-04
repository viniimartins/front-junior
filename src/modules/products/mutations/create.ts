import { addToast } from '@heroui/react'
import { useMutation } from '@tanstack/react-query'

import type { WithoutEntityBaseProperties } from '@/helpers/without-entity-base-properties'
import type { IProduct } from '@/modules/products/model'
import { api } from '@/service/api'

type ProductCreate = Omit<
  WithoutEntityBaseProperties<IProduct>,
  'thumbnail'
> & {
  thumbnail: File | null
}
interface Params {
  product: ProductCreate
}

async function post({ product }: Params) {
  const formData = new FormData()

  if (product.thumbnail) {
    formData.append('thumbnail', product.thumbnail)
  }

  formData.append('title', product.title)
  formData.append('description', product.description)

  const { data } = await api.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return data
}

export function useCreateProduct() {
  return useMutation({
    mutationKey: ['create-product'],
    mutationFn: post,
    onSuccess: () => {
      addToast({
        title: 'Produto criado com sucesso',
      })
    },
    onError: () => {
      addToast({
        title: 'Opss, algo deu errado!',
        description: 'Erro ao criar o produto',
      })
    },
  })
}
