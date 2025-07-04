import type { IBaseEntity } from '@/helpers/base-entity'

export interface IProduct extends IBaseEntity {
  title: string
  description: string
  thumbnail: File | null
}
