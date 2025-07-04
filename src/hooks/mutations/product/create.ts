import { addToast } from '@heroui/react'
import { useMutation } from '@tanstack/react-query'

import type { WithoutEntityBaseProperties } from '@/helpers/without-entity-base-properties'
import type { IProduct } from '@/hooks/query/products/types'
import { api } from '@/service/api'

type Product = WithoutEntityBaseProperties<IProduct>

interface Params {
  product: Product
}

async function post({ product }: Params) {
  const formData = new FormData()

  formData.append('thumbnail', product.thumbnail)
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
        title: 'Erro ao criar o produto',
      })
    },
  })
}
