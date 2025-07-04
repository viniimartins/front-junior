import type { Paginated } from '@/helpers/paginated'
import type { IProduct } from '@/modules/products/model'

const mock: IProduct = {
  id: crypto.randomUUID(),
  title: 'Teste',
  description: 'Teste',
  thumbnail: {
    id: crypto.randomUUID(),
    key: 'abc123',
    mineType: 'image/jpeg',
    originName: 'stock.jpg',
    size: 102400,
    url: '/stock.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
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
