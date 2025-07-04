import type { IBaseEntity } from '@/helpers/base-entity'

export interface IThumbnail extends IBaseEntity {
  key: string
  mineType: string
  originName: string
  size: number
  url: string
}

export interface IProduct extends IBaseEntity {
  title: string
  description: string
  thumbnail: IThumbnail
}
