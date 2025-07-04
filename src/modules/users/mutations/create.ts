import { useMutation } from '@tanstack/react-query'

import { api } from '@/service/api'
import { addToast } from '@heroui/react'

export interface CreateUser {
  user: ICreateUser
}

async function create({ user }: CreateUser) {
  const { data } = await api.post('/users', {
    ...user,
  })

  return data
}

export function useCreateUser() {
  return useMutation({
    mutationFn: create,
    mutationKey: ['create-user'],
    onSuccess: () => {
      addToast({
        title: 'Conta criada com sucesso',
      })
    },
    onError: () => {
      addToast({
        title: 'Opss, algo deu errado!',
        description: 'Erro ao registrar usuario.'
      })
    },
  })
}
