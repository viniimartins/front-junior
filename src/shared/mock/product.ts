import type { Paginated } from '@/helpers/paginated'
import type { IProduct } from '@/modules/products/query/products/types'

const mock: IProduct = {
  id: crypto.randomUUID(),
  title: 'Teste',
  description: 'Teste',
  thumbnail: null,
  updatedAt: new Date(),
  createdAt: new Date(),
}

const content = Array.from({ length: 8 }, (_, index) => ({
  ...mock,
  id: mock.id + index,
}))

export const ProductMock: Paginated.Response<IProduct> = {
  data: content,
  meta: {
    page: 1,
    pageSize: 8,
    total: 20,
    totalPages: 3,
  },
}
