export type WithoutEntityBaseProperties<T> = Omit<
  T,
  'id' | 'createdAt' | 'updatedAt'
>
