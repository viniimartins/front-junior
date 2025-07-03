export namespace Paginated {
  export type Params = {
    page: number
    pageSize: number
  }

  export type Response<T> = {
    data: T[]
    meta: {
      page: number
      pageSize: number
      total: number
      totalPages: number
    }
  }
}
