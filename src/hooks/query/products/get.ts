import { addToast } from '@heroui/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import type { Paginated } from '@/helpers/paginated'
import { api } from '@/service/api'
import { ProductMock } from '@/shared/mock/product'

import type { IProduct } from './types'

async function get(params: Paginated.Params) {
  const { data } = await api.get<Paginated.Response<IProduct>>('/products', {
    params,
  })

  return data
}

export function useGetProducts(params: Paginated.Params) {
  const queryKey = ['get-products', params]

  const query = useQuery({
    queryKey,
    queryFn: () => get(params),
    placeholderData: ProductMock,
  })

  const { isError } = query

  useEffect(() => {
    if (isError) {
      addToast({
        title: 'Erro ao carregar produtos',
        description: 'Não foi possível buscar os produtos. Tente novamente.',
        variant: 'flat',
      })
    }
  }, [isError])

  return { ...query, queryKey }
}
