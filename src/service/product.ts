import { getServerSession } from 'next-auth'

import type { ApiResponse } from '@/helpers/response'
import { authOptions } from '@/lib/nextauth'
import type { IProduct } from '@/modules/products/model'

import { apiServer } from './apiServer'

interface Params {
  id: IProduct['id']
}

export async function getProduct({ id }: Params) {
  const session = await getServerSession(authOptions)

  const response = await apiServer<ApiResponse<IProduct>>(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${session?.user.token}`,
    },
  })

  return response?.data
}
