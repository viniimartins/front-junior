import { addToast } from '@heroui/react'
import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@/lib/react-query'
import type { IProduct } from '@/modules/products/model'
import { api } from '@/service/api'
import type { QueryKeyProps } from '@/types/queryKeyProps'

interface Params {
  id: IProduct['id']
}

async function remove({ id }: Params) {
  const { data } = await api.delete(`/products/${id}`)

  return data
}

export function useDeleteProduct({ queryKey }: QueryKeyProps) {
  return useMutation({
    mutationKey: ['delete-product'],
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
      addToast({
        title: 'Produto deletado com sucesso',
      })
    },
    onError: () => {
      addToast({
        title: 'Opss, algo deu errado!',
        description: 'Erro ao editar o produto',
      })
    },
  })
}
